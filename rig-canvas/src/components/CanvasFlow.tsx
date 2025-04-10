import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Panel,
  MarkerType,
  Connection,
  Edge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  PenTool, 
  Minus, 
  LineChart, 
  Zap, 
  ArrowRight, 
  ArrowLeft, 
  ArrowLeftRight, 
  Link,
  Unlink,
  Type
} from 'lucide-react';

import '../styles/canvasFlow.css';
import NoteNode from './NoteNode';
import ThemeToggle from './ThemeToggle';

// Node types definition
interface NodeTypes {
  [key: string]: React.ComponentType<any>;
}

const nodeTypes: NodeTypes = {
  note: NoteNode,
};

// ID generator
let id = 0;
const getId = () => `node_${id++}`;

// CanvasFlow component props
interface CanvasFlowProps {
  onNodeSelect?: (node: Node) => void;
  readOnly?: boolean;
  canvasId?: string;
  onFileDrop?: (file: any) => void;
  children?: React.ReactNode;
  toolbarContent?: React.ReactNode;
}

/**
 * CanvasFlow Component
 * 
 * The main canvas component that handles nodes and edges management
 */
const CanvasFlow: React.FC<CanvasFlowProps> = ({ 
  onNodeSelect,
  readOnly = false,
  canvasId = 'default-canvas',
  onFileDrop
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Context menus
  const [contextMenu, setContextMenu] = useState<any>(null);
  const [edgeContextMenu, setEdgeContextMenu] = useState<any>(null);
  
  // Listen for the new specialized preset resize events
  useEffect(() => {
    const handleNodeResizePreset = (event: CustomEvent) => {
      const detail = event.detail;
      if (!detail || !detail.id) return;
      
      const { id, width, height } = detail;
      
      if (reactFlowInstance) {
        // Get the exact node we want to resize
        const node = reactFlowInstance.getNode(id);
        if (!node) return;
        
        // Create a complete copy of the node - important for React Flow's internal tracking
        const updatedNode = {...node};
        
        // Update only the style properties to maintain position
        updatedNode.style = {
          ...updatedNode.style,
          width: width,
          height: height
        };

        // Use React Flow's setNodes to properly update the node
        reactFlowInstance.setNodes((nodes: Node[]) => 
          nodes.map((n: Node) => n.id === id ? updatedNode : n)
        );
        
        // Update internals on the next frame to ensure edge connections are maintained
        setTimeout(() => {
          // Find any connected edge and re-render it
          if (reactFlowInstance) {
            const edges = reactFlowInstance.getEdges();
            const connectedEdges = edges.filter(
              (edge: Edge) => edge.source === id || edge.target === id
            );
            
            if (connectedEdges.length > 0) {
              // Force react-flow to recalculate edge paths
              reactFlowInstance.setEdges([...edges]);
            }
          }
        }, 0);
      }
      
      console.log(`CanvasFlow: Applied preset size to node ${id}: ${width}x${height}`);
    };
    
    // Listen for the specialized resize event
    document.addEventListener('node-resize-preset', handleNodeResizePreset as EventListener);
    
    return () => {
      document.removeEventListener('node-resize-preset', handleNodeResizePreset as EventListener);
    };
  }, [reactFlowInstance]);
  
  // Keep the original resize handler for the built-in node resizer
  useEffect(() => {
    const handleNodeResize = (event: CustomEvent) => {
      const detail = event.detail;
      if (!detail || !detail.id) return;
      
      const { id, width, height } = detail;
      
      // Update dimensions but not position
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              style: {
                ...node.style,
                width,
                height
              }
            };
          }
          return node;
        })
      );
    };
    
    document.addEventListener('node-resize', handleNodeResize as EventListener);
    
    return () => {
      document.removeEventListener('node-resize', handleNodeResize as EventListener);
    };
  }, [setNodes]);

  // Handle node text changes
  const onNodeTextChange = useCallback((nodeId: string, text: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            text,
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Handle connections
  const onConnect = useCallback(
    (params: Connection) => {
      // Apply default styling for new connections
      const newEdge = {
        ...params,
        type: 'default',
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: 'var(--edge-color)', strokeWidth: 1.5 }
      };
      return setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Create a new node at the specified position or center of the viewport
  const createNewNode = useCallback(
    (position?: { x: number, y: number }) => {
      if (reactFlowInstance) {
        // If position is not provided, use the center of the viewport
        const nodePosition = position || {
          x: window.innerWidth / 2 - 125,
          y: window.innerHeight / 2 - 75
        };
        
        const newNodeId = getId();
        const newNode: Node = {
          id: newNodeId,
          position: nodePosition,
          type: 'note',
          data: { 
            label: `Note ${id}`, 
            text: '',
            onChange: (text: string) => onNodeTextChange(newNodeId, text)
          },
          style: {
            width: 250,
            height: 150,
          }
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes, onNodeTextChange]
  );

  // Pane context menu handler
  const onPaneContextMenu = useCallback(
    (event: MouseEvent | React.MouseEvent<Element, MouseEvent>) => {
      // Prevent default context menu from appearing
      event.preventDefault();
      
      if (reactFlowInstance) {
        // Check if it's a React MouseEvent
        const clientX = 'clientX' in event ? event.clientX : 0;
        const clientY = 'clientY' in event ? event.clientY : 0;
        
        const position = reactFlowInstance.screenToFlowPosition({
          x: clientX,
          y: clientY
        });
        
        setContextMenu({
          position,
          x: clientX,
          y: clientY,
        });
        
        // Close any open edge context menu
        setEdgeContextMenu(null);
      }
    },
    [reactFlowInstance]
  );
  
  // Edge context menu handler
  const onEdgeContextMenu = useCallback(
    (event: MouseEvent | React.MouseEvent<Element, MouseEvent>, edge: Edge) => {
      // Prevent default context menu from appearing
      event.preventDefault();
      
      // Check if it's a React MouseEvent
      const clientX = 'clientX' in event ? event.clientX : 0;
      const clientY = 'clientY' in event ? event.clientY : 0;
      
      setEdgeContextMenu({
        edge,
        x: clientX,
        y: clientY,
      });
      
      // Close any open pane context menu
      setContextMenu(null);
    },
    []
  );

  // Update edge properties
  const updateEdge = useCallback(
    (edgeId: string, newData: any) => {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === edgeId) {
            return { ...edge, ...newData };
          }
          return edge;
        })
      );
    },
    [setEdges]
  );

  // Handle edge disconnection
  const disconnectEdge = useCallback(
    (edgeId: string) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    },
    [setEdges]
  );

  // Hide context menus when clicking anywhere
  const onPaneClick = useCallback((event: MouseEvent | React.MouseEvent<Element, MouseEvent>) => {
    setContextMenu(null);
    setEdgeContextMenu(null);
  }, []);

  // Handle file drop on canvas
  const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (onFileDrop && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      // Create a FileReader to read the file contents
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          // Create a file data object with basic information
          const fileData = {
            id: `file-${Date.now()}`,
            name: file.name,
            content: e.target.result,
            lastModified: file.lastModified,
            size: file.size,
            type: file.type
          };
          
          // Call the onFileDrop callback with the file data
          onFileDrop(fileData);
          
          // Optionally create a node with the file information
          const nodePosition = reactFlowInstance ? 
            reactFlowInstance.screenToFlowPosition({
              x: event.clientX,
              y: event.clientY
            }) : 
            { x: event.clientX, y: event.clientY };
          
          createNewNode(nodePosition);
        }
      };
      
      // Read file as text or as URL if it's an image
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
  }, [onFileDrop, reactFlowInstance, createNewNode]);

  return (
    <div 
      className="canvas-flow-wrapper" 
      ref={reactFlowWrapper}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        attributionPosition="bottom-right"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1.5} 
          color="var(--canvas-dots-color)" 
          bgColor="var(--background)" 
        />
        <Controls />
        <MiniMap />
        
        {/* Top controls */}
        <Panel position="top-right" style={{ right: '5%' }} className="top-controls">
          {/* Help icon */}
          <button 
            className="help-icon" 
            title="Show canvas guide"
            onClick={() => {
              // Show the modal overlay
              const helpModal = document.getElementById('help-modal-overlay');
              if (helpModal) {
                helpModal.classList.add('visible');
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
          
          <button className="add-node-button" onClick={() => createNewNode()}>
            + Add Note
          </button>
          
          <ThemeToggle />
        </Panel>
        
        {/* Help modal (hidden by default) */}
        <div id="help-modal-overlay" className="help-modal-overlay">
          <div className="help-modal">
            <div className="help-modal-header">
              <h2>Canvas Notes Guide</h2>
              <button 
                className="close-modal-button"
                onClick={() => {
                  const helpModal = document.getElementById('help-modal-overlay');
                  if (helpModal) {
                    helpModal.classList.remove('visible');
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="help-modal-content">
              <h3>Creating Nodes</h3>
              <p>Right-click on the canvas or click the "+ Add Note" button to create a new note.</p>
              
              <h3>Connecting Nodes</h3>
              <p>Connect notes by dragging from one handle to another. Handles appear when you hover over a node.</p>
              
              <h3>Customizing Connections</h3>
              <p>Right-click on any edge to change its style, color, or add markers.</p>
              
              <h3>Resizing Nodes</h3>
              <p>Click the resize icon in the node header to choose from preset sizes.</p>
              
              <h3>Editing Notes</h3>
              <p>Click on a note's content area to start editing text.</p>
              
              <h3>Other Tips</h3>
              <ul>
                <li>Use the mouse wheel to zoom in and out</li>
                <li>Click and drag the canvas to pan around</li>
                <li>Use different edge colors to organize your ideas</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Pane context menu */}
        {contextMenu && (
          <div 
            className="context-menu"
            style={{
              position: 'absolute',
              left: contextMenu.x + 'px',
              top: contextMenu.y + 'px',
              zIndex: 1000,
            }}
          >
            <div 
              className="context-menu-option"
              onClick={() => {
                createNewNode(contextMenu.position);
                setContextMenu(null);
              }}
            >
              Add Note
            </div>
          </div>
        )}
        
        {/* Edge context menu - Tabbed Interface */}
        {edgeContextMenu && (
          <div 
            className="context-menu edge-context-tabbed"
            style={{
              position: 'absolute',
              left: edgeContextMenu.x + 'px',
              top: edgeContextMenu.y + 'px',
              zIndex: 1000,
            }}
          >
            <div className="context-menu-header">
              Edge Options
              <button 
                className="context-menu-close"
                onClick={() => setEdgeContextMenu(null)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            
            <div className="edge-context-tabs">
              <button 
                className="edge-tab-button active" 
                onClick={(e) => {
                  document.querySelectorAll('.edge-tab-button').forEach(el => el.classList.remove('active'));
                  e.currentTarget.classList.add('active');
                  document.querySelectorAll('.edge-tab-content').forEach(el => el.classList.add('hidden'));
                  const typeTab = document.getElementById('tab-type');
                  if (typeTab) typeTab.classList.remove('hidden');
                }}
              >
                Type
              </button>
              <button 
                className="edge-tab-button" 
                onClick={(e) => {
                  document.querySelectorAll('.edge-tab-button').forEach(el => el.classList.remove('active'));
                  e.currentTarget.classList.add('active');
                  document.querySelectorAll('.edge-tab-content').forEach(el => el.classList.add('hidden'));
                  const directionTab = document.getElementById('tab-direction');
                  if (directionTab) directionTab.classList.remove('hidden');
                }}
              >
                Direction
              </button>
              <button 
                className="edge-tab-button" 
                onClick={(e) => {
                  document.querySelectorAll('.edge-tab-button').forEach(el => el.classList.remove('active'));
                  e.currentTarget.classList.add('active');
                  document.querySelectorAll('.edge-tab-content').forEach(el => el.classList.add('hidden'));
                  const colorTab = document.getElementById('tab-color');
                  if (colorTab) colorTab.classList.remove('hidden');
                }}
              >
                Color
              </button>
              <button 
                className="edge-tab-button" 
                onClick={(e) => {
                  document.querySelectorAll('.edge-tab-button').forEach(el => el.classList.remove('active'));
                  e.currentTarget.classList.add('active');
                  document.querySelectorAll('.edge-tab-content').forEach(el => el.classList.add('hidden'));
                  const actionsTab = document.getElementById('tab-actions');
                  if (actionsTab) actionsTab.classList.remove('hidden');
                }}
              >
                Actions
              </button>
            </div>
            
            <div className="edge-tab-content" id="tab-type">
              <div className="context-menu-option-grid">
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { type: 'default' });
                    setEdgeContextMenu(null);
                  }}
                >
                  <PenTool className="context-menu-grid-icon" size={20} />
                  <span>Bezier</span>
                </button>
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { type: 'straight' });
                    setEdgeContextMenu(null);
                  }}
                >
                  <Minus className="context-menu-grid-icon" size={20} />
                  <span>Straight</span>
                </button>
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { type: 'step' });
                    setEdgeContextMenu(null);
                  }}
                >
                  <LineChart className="context-menu-grid-icon" size={20} />
                  <span>Step</span>
                </button>
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { type: 'smoothstep' });
                    setEdgeContextMenu(null);
                  }}
                >
                  <LineChart className="context-menu-grid-icon" size={20} />
                  <span>Smooth</span>
                </button>
              </div>
              
              <hr className="edge-tab-divider" />
              
              <div className="context-menu-option-grid">
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      data: { animated: false }
                    });
                    setEdgeContextMenu(null);
                  }}
                >
                  <Minus className="context-menu-grid-icon" size={20} />
                  <span>Solid</span>
                </button>
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      data: { animated: true }
                    });
                    setEdgeContextMenu(null);
                  }}
                >
                  <Zap className="context-menu-grid-icon" size={20} />
                  <span>Dashed</span>
                </button>
              </div>
            </div>
            
            <div className="edge-tab-content hidden" id="tab-direction">
              <div className="context-menu-option-grid">
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      markerEnd: { type: MarkerType.Arrow },
                      markerStart: undefined,
                      data: { direction: 'forward' }
                    });
                    setEdgeContextMenu(null);
                  }}
                >
                  <ArrowRight className="context-menu-grid-icon" size={20} />
                  <span>Forward</span>
                </button>
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      markerStart: { type: MarkerType.Arrow },
                      markerEnd: undefined,
                      data: { direction: 'backward' }
                    });
                    setEdgeContextMenu(null);
                  }}
                >
                  <ArrowLeft className="context-menu-grid-icon" size={20} />
                  <span>Backward</span>
                </button>
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      markerEnd: { type: MarkerType.Arrow },
                      markerStart: { type: MarkerType.Arrow },
                      data: { direction: 'bidirectional' }
                    });
                    setEdgeContextMenu(null);
                  }}
                >
                  <ArrowLeftRight className="context-menu-grid-icon" size={20} />
                  <span>Both</span>
                </button>
                <button 
                  className="context-menu-grid-option"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      markerStart: undefined,
                      markerEnd: undefined,
                      data: { direction: 'none' }
                    });
                    setEdgeContextMenu(null);
                  }}
                >
                  <Link className="context-menu-grid-icon" size={20} />
                  <span>None</span>
                </button>
              </div>
            </div>
            
            <div className="edge-tab-content hidden" id="tab-color">
              <div className="context-menu-color-grid">
                <button 
                  className="context-menu-color-grid-option"
                  style={{ backgroundColor: "var(--edge-color)" }}
                  title="Default"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      style: { stroke: "var(--edge-color)" }
                    });
                    setEdgeContextMenu(null);
                  }}
                ></button>
                <button 
                  className="context-menu-color-grid-option"
                  style={{ backgroundColor: "var(--destructive)" }}
                  title="Red"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      style: { stroke: "var(--destructive)" }
                    });
                    setEdgeContextMenu(null);
                  }}
                ></button>
                <button 
                  className="context-menu-color-grid-option"
                  style={{ backgroundColor: "#3498db" }}
                  title="Blue"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      style: { stroke: "#3498db" }
                    });
                    setEdgeContextMenu(null);
                  }}
                ></button>
                <button 
                  className="context-menu-color-grid-option"
                  style={{ backgroundColor: "#2ecc71" }}
                  title="Green"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      style: { stroke: "#2ecc71" }
                    });
                    setEdgeContextMenu(null);
                  }}
                ></button>
                <button 
                  className="context-menu-color-grid-option"
                  style={{ backgroundColor: "#f1c40f" }}
                  title="Yellow"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      style: { stroke: "#f1c40f" }
                    });
                    setEdgeContextMenu(null);
                  }}
                ></button>
                <button 
                  className="context-menu-color-grid-option"
                  style={{ backgroundColor: "#9b59b6" }}
                  title="Purple"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      style: { stroke: "#9b59b6" }
                    });
                    setEdgeContextMenu(null);
                  }}
                ></button>
                <button 
                  className="context-menu-color-grid-option"
                  style={{ backgroundColor: "#e67e22" }}
                  title="Orange"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      style: { stroke: "#e67e22" }
                    });
                    setEdgeContextMenu(null);
                  }}
                ></button>
                <button 
                  className="context-menu-color-grid-option"
                  style={{ backgroundColor: "#1abc9c" }}
                  title="Teal"
                  onClick={() => {
                    updateEdge(edgeContextMenu.edge.id, { 
                      style: { stroke: "#1abc9c" }
                    });
                    setEdgeContextMenu(null);
                  }}
                ></button>
              </div>
            </div>
            
            <div className="edge-tab-content hidden" id="tab-actions">
              <div className="edge-tab-actions-container">
                <button 
                  className="context-menu-option-danger"
                  onClick={() => {
                    disconnectEdge(edgeContextMenu.edge.id);
                    setEdgeContextMenu(null);
                  }}
                >
                  <Unlink className="context-menu-icon" size={16} />
                  <span>Disconnect Edge</span>
                </button>
                
                <button 
                  className="context-menu-option"
                  onClick={() => {
                    setEdgeContextMenu(null);
                  }}
                >
                  <Type className="context-menu-icon" size={16} />
                  <span>Add Label</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </ReactFlow>
    </div>
  );
};

/**
 * ReactFlowProvider wrapper component
 */
const CanvasFlowWithProvider: React.FC<CanvasFlowProps> = (props) => {
  return (
    <div className="app">
      <CanvasFlow {...props} />
    </div>
  );
};

export default CanvasFlowWithProvider;
