import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';
import { useEffect, useState, useRef } from 'react';
import { useCanvasStore } from '../store/canvasStore';
import { Node, Edge } from '../types';
import { nanoid } from 'nanoid';

// Configuration
const WEBSOCKET_SERVER = 'ws://localhost:1234';
// Enable debug logging for y-websocket
(window as any).localStorage.setItem('debug', 'y-websocket*');

interface UserPresence {
  id: string;
  name: string;
  color: string;
}

interface UserCursor extends UserPresence {
  x: number;
  y: number;
}

interface YjsCanvasOptions {
  documentId: string;
  token: string;
  username: string;
}

export const useYjsCanvas = ({ documentId, token, username }: YjsCanvasOptions) => {
  const { nodes, edges, setNodes, setEdges, addNode, updateNode, removeNode, addEdge, updateEdge, removeEdge } = useCanvasStore();
  
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUsers, setActiveUsers] = useState<UserPresence[]>([]);
  const [userCursors, setUserCursors] = useState<UserCursor[]>([]);
  
  // Refs to hold Yjs objects
  const docRef = useRef<Y.Doc | null>(null);
  const wsProviderRef = useRef<WebsocketProvider | null>(null);
  const indexeddbProviderRef = useRef<IndexeddbPersistence | null>(null);
  const nodesMapRef = useRef<Y.Map<any> | null>(null);
  const edgesMapRef = useRef<Y.Map<any> | null>(null);
  
  // Initialize Yjs document and providers
  useEffect(() => {
    // Skip initialization if already initialized
    if (docRef.current) return;
    
    const initialize = async () => {
      try {
        setIsLoading(true);
        
        // Create Yjs document
        const doc = new Y.Doc();
        docRef.current = doc;
        
        // Set up IndexedDB persistence
        const indexeddbProvider = new IndexeddbPersistence(`rig-canvas-${documentId}`, doc);
        indexeddbProviderRef.current = indexeddbProvider;
        
        // Wait for IndexedDB to load
        await new Promise<void>((resolve) => {
          indexeddbProvider.on('synced', () => {
            resolve();
          });
        });
        
        // Set up WebSocket connection
        console.log(`Connecting to WebSocket server with document ID: ${documentId}`);
        console.log(`WebSocket URL: ${WEBSOCKET_SERVER}`);
        
        const wsProvider = new WebsocketProvider(
          WEBSOCKET_SERVER,
          documentId,
          doc,
          { 
            params: { 
              token
              // The document ID is already passed as the second parameter to WebsocketProvider
              // No need to include it in params
            },
            WebSocketPolyfill: WebSocket
          }
        );
        
        // Log connection events
        wsProvider.on('status', ({ status }: { status: string }) => {
          console.log(`WebSocket connection status: ${status}`);
          setIsConnected(status === 'connected');
        });
        
        // Log connection errors
        wsProvider.on('connection-error', (event: any) => {
          console.error('WebSocket connection error:', event);
        });
        
        wsProviderRef.current = wsProvider;
        
        // Set up awareness (for user presence)
        wsProvider.awareness.setLocalStateField('user', {
          name: username,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color
          id: nanoid()
        });
        
        // Get shared data structures
        const nodesMap = doc.getMap('nodes');
        const edgesMap = doc.getMap('edges');
        nodesMapRef.current = nodesMap;
        edgesMapRef.current = edgesMap;
        
        // Get current state
        const currentNodes = useCanvasStore.getState().nodes;
        const currentEdges = useCanvasStore.getState().edges;
        
        // Initialize from Yjs data if available, otherwise use local state
        if (nodesMap.size === 0 && edgesMap.size === 0 && (currentNodes.length > 0 || currentEdges.length > 0)) {
          // Initialize Yjs with local data
          currentNodes.forEach(node => {
            nodesMap.set(node.id, node);
          });
          
          currentEdges.forEach(edge => {
            edgesMap.set(edge.id, edge);
          });
        } else {
          // Initialize local state from Yjs
          const yNodes: Node[] = [];
          const yEdges: Edge[] = [];
          
          nodesMap.forEach((value, key) => {
            yNodes.push(value as Node);
          });
          
          edgesMap.forEach((value, key) => {
            yEdges.push(value as Edge);
          });
          
          setNodes(yNodes);
          setEdges(yEdges);
        }
        
        // Set up observers for nodes and edges
        nodesMap.observe(event => {
          const yNodes: Node[] = [];
          nodesMap.forEach((value, key) => {
            yNodes.push(value as Node);
          });
          setNodes(yNodes);
        });
        
        edgesMap.observe(event => {
          const yEdges: Edge[] = [];
          edgesMap.forEach((value, key) => {
            yEdges.push(value as Edge);
          });
          setEdges(yEdges);
        });
        
        // Set up awareness observer for user presence
        wsProvider.awareness.on('change', () => {
          const states = wsProvider.awareness.getStates() as Map<number, { user: { name: string, color: string, id: string }, cursor?: { x: number, y: number } }>;
          const users: UserPresence[] = [];
          const cursors: UserCursor[] = [];
          
          states.forEach((state) => {
            if (state.user) {
              users.push({
                id: state.user.id,
                name: state.user.name,
                color: state.user.color
              });
              
              const localState = wsProvider.awareness.getLocalState();
              const localUserId = localState?.user?.id;
              
              if (state.cursor && localUserId && state.user.id !== localUserId) {
                cursors.push({
                  id: state.user.id,
                  name: state.user.name,
                  color: state.user.color,
                  x: state.cursor.x,
                  y: state.cursor.y
                });
              }
            }
          });
          
          setActiveUsers(users);
          setUserCursors(cursors);
        });
        
        setError(null);
      } catch (err) {
        console.error('Failed to initialize Yjs:', err);
        setError('Failed to initialize collaboration');
      } finally {
        setIsLoading(false);
      }
    };
    
    initialize();
    
    // Cleanup
    return () => {
      wsProviderRef.current?.destroy();
      indexeddbProviderRef.current?.destroy();
      docRef.current?.destroy();
    };
  }, [documentId, token, username, setNodes, setEdges]);
  
  // Add mouse tracking
  useEffect(() => {
    if (!wsProviderRef.current) return;
    
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const { clientX, clientY } = mouseEvent;
      const target = mouseEvent.target as HTMLElement;
      const canvas = target.closest('.react-flow') as HTMLElement;
      
      if (canvas) {
        const { left, top } = canvas.getBoundingClientRect();
        
        if (wsProviderRef.current) {
          wsProviderRef.current.awareness.setLocalStateField('cursor', {
            x: clientX - left,
            y: clientY - top
          });
        }
      }
    };
    
    const handleMouseLeave = () => {
      if (wsProviderRef.current) {
        wsProviderRef.current.awareness.setLocalStateField('cursor', null);
      }
    };
    
    // Wait for the canvas to be available
    const checkForCanvas = setInterval(() => {
      const canvasElement = document.querySelector('.react-flow');
      if (canvasElement) {
        clearInterval(checkForCanvas);
        canvasElement.addEventListener('mousemove', handleMouseMove as EventListener);
        canvasElement.addEventListener('mouseleave', handleMouseLeave as EventListener);
      }
    }, 500);
    
    return () => {
      clearInterval(checkForCanvas);
      const canvasElement = document.querySelector('.react-flow');
      if (canvasElement) {
        canvasElement.removeEventListener('mousemove', handleMouseMove as EventListener);
        canvasElement.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      }
    };
  }, [wsProviderRef.current]);
  
  // Override store methods to update Yjs - only run once when loaded
  useEffect(() => {
    if (!nodesMapRef.current || !edgesMapRef.current || isLoading) return;
    
    // Use a ref to track if we've already overridden the methods
    const hasOverriddenRef = useRef(false);
    if (hasOverriddenRef.current) return;
    hasOverriddenRef.current = true;
    
    const originalAddNode = addNode;
    const originalUpdateNode = updateNode;
    const originalRemoveNode = removeNode;
    const originalAddEdge = addEdge;
    const originalUpdateEdge = updateEdge;
    const originalRemoveEdge = removeEdge;
    
    // Override addNode
    const newAddNode = (node: Node) => {
      originalAddNode(node);
      nodesMapRef.current?.set(node.id, node);
    };
    
    // Override updateNode
    const newUpdateNode = (id: string, data: Partial<Node>) => {
      originalUpdateNode(id, data);
      const currentNode = nodesMapRef.current?.get(id);
      if (currentNode) {
        nodesMapRef.current?.set(id, { ...currentNode, ...data });
      }
    };
    
    // Override removeNode
    const newRemoveNode = (id: string) => {
      originalRemoveNode(id);
      nodesMapRef.current?.delete(id);
      
      // Also remove connected edges
      const currentEdges = useCanvasStore.getState().edges;
      currentEdges.forEach(edge => {
        if (edge.source === id || edge.target === id) {
          edgesMapRef.current?.delete(edge.id);
        }
      });
    };
    
    // Override addEdge
    const newAddEdge = (edge: Edge) => {
      originalAddEdge(edge);
      edgesMapRef.current?.set(edge.id, edge);
    };
    
    // Override updateEdge
    const newUpdateEdge = (id: string, data: Partial<Edge>) => {
      originalUpdateEdge(id, data);
      const currentEdge = edgesMapRef.current?.get(id);
      if (currentEdge) {
        edgesMapRef.current?.set(id, { ...currentEdge, ...data });
      }
    };
    
    // Override removeEdge
    const newRemoveEdge = (id: string) => {
      originalRemoveEdge(id);
      edgesMapRef.current?.delete(id);
    };
    
    // Replace store methods
    useCanvasStore.setState({
      addNode: newAddNode,
      updateNode: newUpdateNode,
      removeNode: newRemoveNode,
      addEdge: newAddEdge,
      updateEdge: newUpdateEdge,
      removeEdge: newRemoveEdge
    });
    
    // Restore original methods on cleanup
    return () => {
      useCanvasStore.setState({
        addNode: originalAddNode,
        updateNode: originalUpdateNode,
        removeNode: originalRemoveNode,
        addEdge: originalAddEdge,
        updateEdge: originalUpdateEdge,
        removeEdge: originalRemoveEdge
      });
    };
  }, [isLoading]);
  
  return {
    isConnected,
    isLoading,
    error,
    activeUsers,
    userCursors
  };
};
