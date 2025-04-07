import * as Y from 'yjs';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import WebSocket from 'ws';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as encoding from 'lib0/encoding';
import * as decoding from 'lib0/decoding';
import * as syncProtocol from 'y-protocols/sync';
import * as awarenessProtocol from 'y-protocols/awareness';
import * as authProtocol from 'y-protocols/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 1234;
const DOCUMENTS_DIR = path.join(__dirname, 'documents');

// Ensure documents directory exists
if (!fs.existsSync(DOCUMENTS_DIR)) {
  fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

// Message types
const messageSync = 0;
const messageAwareness = 1;
const messageAuth = 2;
const messageQueryAwareness = 3;

// Map of all active docs
const docs = new Map();

// Get or create a Y.Doc instance for a given document name
const getYDoc = (docName) => {
  if (!docs.has(docName)) {
    const doc = new Y.Doc();
    docs.set(docName, doc);
    
    // Load document from file if it exists
    const filePath = path.join(DOCUMENTS_DIR, `${docName}.bin`);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath);
        Y.applyUpdate(doc, content);
        console.log(`Loaded document ${docName} from file`);
      } catch (err) {
        console.error(`Error loading document ${docName}:`, err);
      }
    }
  }
  return docs.get(docName);
};

// Save a document to file
const saveYDoc = (docName, doc) => {
  const filePath = path.join(DOCUMENTS_DIR, `${docName}.bin`);
  try {
    const content = Y.encodeStateAsUpdate(doc);
    fs.writeFileSync(filePath, content);
    console.log(`Saved document ${docName} to file`);
  } catch (err) {
    console.error(`Error saving document ${docName}:`, err);
  }
};

// Map of document name to set of connected clients
const wsClients = new Map();

// Map of document name to awareness instance
const awarenessStates = new Map();

// Get or create an awareness instance for a given document
const getAwareness = (docName) => {
  if (!awarenessStates.has(docName)) {
    const doc = getYDoc(docName);
    const awareness = new awarenessProtocol.Awareness(doc);
    
    // Clean up awareness state when clients disconnect
    awareness.on('update', ({ added, updated, removed }) => {
      const changedClients = added.concat(updated).concat(removed);
      const clients = wsClients.get(docName) || new Set();
      
      // Broadcast awareness update to all clients
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, messageAwareness);
      encoding.writeVarUint8Array(
        encoder,
        awarenessProtocol.encodeAwarenessUpdate(awareness, changedClients)
      );
      
      const message = encoding.toUint8Array(encoder);
      clients.forEach((client) => {
        send(client, message);
      });
    });
    
    awarenessStates.set(docName, awareness);
  }
  return awarenessStates.get(docName);
};

// Simple token validation (replace with your auth logic)
const validateToken = (token, docName) => {
  // For simple auth, you could store valid tokens in a file or database
  // This is a placeholder - implement your actual validation logic
  return token && token.length > 8;
};

// Send a message to a client
const send = (client, message) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(message);
  }
};

// Handle a message from a client
const handleMessage = (docName, client, message) => {
  const doc = getYDoc(docName);
  const awareness = getAwareness(docName);
  
  const decoder = decoding.createDecoder(message);
  const encoder = encoding.createEncoder();
  const messageType = decoding.readVarUint(decoder);
  
  switch (messageType) {
    case messageSync:
      encoding.writeVarUint(encoder, messageSync);
      syncProtocol.readSyncMessage(decoder, encoder, doc, null);
      
      // If the encoder has content, send it back to the client
      if (encoding.length(encoder) > 1) {
        send(client, encoding.toUint8Array(encoder));
      }
      break;
    
    case messageAwareness:
      awarenessProtocol.applyAwarenessUpdate(
        awareness,
        decoding.readVarUint8Array(decoder),
        null
      );
      break;
    
    case messageQueryAwareness:
      const awarenessEncoder = encoding.createEncoder();
      encoding.writeVarUint(awarenessEncoder, messageAwareness);
      encoding.writeVarUint8Array(
        awarenessEncoder,
        awarenessProtocol.encodeAwarenessUpdate(
          awareness,
          Array.from(awareness.getStates().keys())
        )
      );
      send(client, encoding.toUint8Array(awarenessEncoder));
      break;
    
    case messageAuth:
      // Auth message handling (if needed)
      break;
  }
  
  // Save the document after each update
  saveYDoc(docName, doc);
};

// Create HTTP & WebSocket servers
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server for Rig Canvas collaboration');
});

const wss = new WebSocketServer({ noServer: true });

// Handle upgrades
server.on('upgrade', (request, socket, head) => {
  try {
    const url = new URL(request.url, `http://localhost:${PORT}`);
    console.log(`WebSocket upgrade request received: ${request.url}`);
    
    // Parse URL parameters
    const docName = url.pathname.slice(1) || url.searchParams.get('document');
    const token = url.searchParams.get('token');
    
    console.log(`Document ID: ${docName}, Token: ${token}`);
    
    // Simple authentication
    if (!validateToken(token, docName)) {
      console.log(`Authentication failed for document: ${docName}`);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    
    wss.handleUpgrade(request, socket, head, ws => {
      console.log(`WebSocket connection established for document: ${docName}`);
      setupWSConnection(ws, request, docName);
    });
  } catch (err) {
    console.error('Error handling WebSocket upgrade:', err);
    socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
    socket.destroy();
  }
});

// Set up a WebSocket connection
const setupWSConnection = (ws, req, docName) => {
  // Initialize client tracking for this document
  if (!wsClients.has(docName)) {
    wsClients.set(docName, new Set());
  }
  const clients = wsClients.get(docName);
  clients.add(ws);
  
  // Get the document and awareness instances
  const doc = getYDoc(docName);
  const awareness = getAwareness(docName);
  
  // Set up message handler
  ws.on('message', (message) => {
    handleMessage(docName, ws, new Uint8Array(message));
  });
  
  // Set up close handler
  ws.on('close', () => {
    // Remove client from tracking
    const clients = wsClients.get(docName);
    if (clients) {
      clients.delete(ws);
      if (clients.size === 0) {
        wsClients.delete(docName);
      }
    }
    
    // Clean up awareness state
    awarenessProtocol.removeAwarenessStates(
      awareness,
      [ws.clientID],
      'connection closed'
    );
  });
  
  // Send initial sync step 1
  const encoder = encoding.createEncoder();
  encoding.writeVarUint(encoder, messageSync);
  syncProtocol.writeSyncStep1(encoder, doc);
  send(ws, encoding.toUint8Array(encoder));
  
  // Store client ID for awareness cleanup
  ws.clientID = Math.floor(Math.random() * 1000000);
  
  console.log(`Client connected to document ${docName}`);
};

server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
