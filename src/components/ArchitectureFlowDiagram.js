import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../css/architecture-flow-diagram.css';

// Define custom edge styles
const edgeStyles = {
  solid: {
    stroke: 'rgba(255, 255, 255, 0.7)',
    strokeWidth: 1.5,
    strokeDasharray: 'none',
  },
  dashed: {
    stroke: 'rgba(255, 255, 255, 0.7)',
    strokeWidth: 1.5,
    strokeDasharray: '5,5',
  },
  highlighted: {
    stroke: '#FBBC05', // Yellow
    strokeWidth: 2,
    strokeDasharray: 'none',
  },
  orange: {
    stroke: '#EA4335', // Red/Orange
    strokeWidth: 1.5,
    strokeDasharray: '5,5',
  },
  funds: {
    stroke: '#4CAF50', // Green
    strokeWidth: 2,
    strokeDasharray: 'none',
  },
};

// Define custom node styles
const nodeStyles = {
  validator: {
    background: '#4285F4', // Blue
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    width: 180,
    height: 60,
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  miner: {
    background: '#34A853', // Green
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    width: 180,
    height: 60,
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  minerDetails: {
    background: '#34A853', // Green
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '15px',
    width: 220,
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '14px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  marketplace: {
    background: '#FBBC05', // Yellow
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    width: 180,
    height: 60,
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  client: {
    background: '#333333',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '15px',
    width: 240,
    height: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  clientContent: {
    width: '100%',
    textAlign: 'center',
    fontSize: '15px',
    fontFamily: 'monospace',
    lineHeight: '1.5',
  },
  bittensor: {
    background: '#4285F4', // Blue
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    width: 220,
    height: 60,
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  bridge: {
    background: '#9C27B0', // Purple
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '15px',
    width: 220,
    height: 120,
    textAlign: 'center',
    fontSize: '14px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  rewards: {
    background: '#333333',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '15px',
    width: 400,
    height: 180,
    textAlign: 'left',
    fontSize: '14px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  note: {
    background: 'rgba(30, 30, 30, 0.7)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    padding: '8px',
    fontSize: '12px',
    fontFamily: 'monospace',
    width: 'auto',
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  dashboard: {
    background: '#9C27B0', // Purple
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    width: 180,
    height: 60,
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  ipfs: {
    background: '#4285F4', // Blue
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    width: 180,
    height: 60,
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  worker: {
    background: '#4285F4', // Blue
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    width: 180,
    height: 60,
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'monospace',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
};

// Initial nodes configuration
const initialNodes = [
  // Client Buying
  {
    id: 'client',
    type: 'default',
    position: { x: 600, y: 50 }, // Top center
    data: { 
      label: (
        <div style={nodeStyles.clientContent}>
          <strong>CLIENT</strong><br/>
          Purchases resources:<br/>
          • Storage<br/>
          • Compute<br/><br/>
          Payment methods:<br/>
          FIAT / Alpha / TAO
        </div>
      ) 
    },
    style: nodeStyles.client,
  },
  // Bittensor Blockchain
  {
    id: 'bittensor',
    type: 'default',
    position: { x: 20, y: 320 }, // Moved even further left
    data: { label: <div><strong>Bittensor Blockchain</strong></div> },
    style: nodeStyles.bittensor,
  },
  // Bridge
  {
    id: 'bridge',
    type: 'default',
    position: { x: 20, y: 550 }, // Aligned with Bittensor horizontally
    data: { 
      label: (
        <div>
          <strong>BRIDGE</strong><br/>
          Bidirectional transfer of Alpha<br/>
          between Bittensor and Hippius
        </div>
      ) 
    },
    style: nodeStyles.bridge,
  },
  // Bridge Note
  {
    id: 'bridge-note',
    type: 'default',
    position: { x: 20, y: 730 }, // Aligned with Bridge horizontally
    data: { 
      label: (
        <div>
          <strong>Process:</strong><br/>
          1. Client purchases with FIAT/TAO<br/>
          2. System acquires Alpha on Bittensor<br/>
          3. Alpha is bridged to Hippius chain<br/>
          4. Alpha is locked as credit is minted
        </div>
      ) 
    },
    style: nodeStyles.note,
  },
  // Web Dashboard
  {
    id: 'dashboard',
    type: 'default',
    position: { x: 600, y: 320 }, // Center, below client
    data: { label: <div><strong>Web Dashboard</strong></div> },
    style: nodeStyles.dashboard,
  },
  // Dashboard Note
  {
    id: 'dashboard-note',
    type: 'default',
    position: { x: 350, y: 420 }, // Between dashboard and bridge
    data: { 
      label: (
        <div>
          <strong>UI Interaction:</strong><br/>
          Dashboard provides interface<br/>
          for bridging Alpha between chains
        </div>
      ) 
    },
    style: nodeStyles.note,
  },
  // Marketplace Pallet
  {
    id: 'marketplace',
    type: 'default',
    position: { x: 600, y: 450 }, // Below Web Dashboard
    data: { label: <div><strong>Marketplace Pallet</strong></div> },
    style: nodeStyles.marketplace,
  },
  // Hippius Blockchain
  {
    id: 'hippius-blockchain',
    type: 'default',
    position: { x: 600, y: 580 }, // Below Marketplace
    data: { label: <div><strong>Hippius Blockchain</strong></div> },
    style: nodeStyles.bittensor, // Reusing the blockchain style
  },
  // Validator Node
  {
    id: 'validator',
    type: 'default',
    position: { x: 350, y: 700 }, // More space below Hippius blockchain and further left
    data: { label: <div><strong>Validator Node</strong></div> },
    style: nodeStyles.validator,
  },
  // Miner Node
  {
    id: 'miner',
    type: 'default',
    position: { x: 850, y: 700 }, // More space below Hippius blockchain and further right
    data: { label: <div><strong>Miner Node</strong></div> },
    style: nodeStyles.miner,
  },
  // Hippius Full Node
  {
    id: 'hippius-node',
    type: 'default',
    position: { x: 300, y: 820 }, // More space below validator and further left
    data: { label: <div><strong>Hippius Full Node</strong></div> },
    style: nodeStyles.ipfs,
  },
  // Subtensor Full Node
  {
    id: 'subtensor-node',
    type: 'default',
    position: { x: 600, y: 820 }, // More space below validator
    data: { label: <div><strong>Subtensor Full Node</strong></div> },
    style: nodeStyles.ipfs,
  },
  // Offchain Worker
  {
    id: 'worker',
    type: 'default',
    position: { x: 550, y: 940 }, // More space below nodes
    data: { label: <div><strong>Offchain Worker</strong></div> },
    style: nodeStyles.worker,
  },
  // S3 Storage Miner
  {
    id: 's3-miner',
    type: 'default',
    position: { x: 200, y: 1080 }, // More horizontal and vertical spacing, further left
    data: { 
      label: (
        <div>
          <strong>S3 STORAGE MINER</strong><br/>
          • Blockchain + Offchain Worker<br/>
          • Volume service and auth
        </div>
      ) 
    },
    style: nodeStyles.minerDetails,
  },
  // IPFS Storage Miner
  {
    id: 'ipfs-miner',
    type: 'default',
    position: { x: 600, y: 1080 }, // More vertical spacing
    data: { 
      label: (
        <div>
          <strong>IPFS STORAGE MINER</strong><br/>
          • Blockchain + Offchain Worker<br/>
          • IPFS service
        </div>
      ) 
    },
    style: nodeStyles.minerDetails,
  },
  // Compute Miner
  {
    id: 'compute-miner',
    type: 'default',
    position: { x: 1000, y: 1080 }, // More horizontal and vertical spacing, further right
    data: { 
      label: (
        <div>
          <strong>COMPUTE MINER</strong><br/>
          • Blockchain + Offchain Worker<br/>
          • VM Agent, k8s, libvirt
        </div>
      ) 
    },
    style: nodeStyles.minerDetails,
  },
  // Rewards
  {
    id: 'rewards',
    type: 'default',
    position: { x: 600, y: 1250 }, // More space below miners
    data: { 
      label: (
        <div>
          <strong>REWARD DISTRIBUTION</strong><br/>
          • 10% Treasury<br/>
          • 30% Validators & Stakers<br/>
          • 60% Miners<br/><br/>
          All rewards in Alpha can be bridged back to Bittensor
        </div>
      ) 
    },
    style: nodeStyles.rewards,
  },
];

// Initial edges configuration
const initialEdges = [
  // Client to Dashboard
  {
    id: 'client-to-dashboard',
    source: 'client',
    target: 'dashboard',
    animated: true,
    type: 'default',
    style: edgeStyles.funds,
    label: 'FIAT/TAO',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Dashboard to Marketplace
  {
    id: 'dashboard-to-marketplace',
    source: 'dashboard',
    target: 'marketplace',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    label: 'mints credit',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Bittensor to Bridge
  {
    id: 'bittensor-to-bridge',
    source: 'bittensor',
    target: 'bridge',
    animated: true,
    type: 'default',
    style: edgeStyles.funds,
    label: 'Alpha',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Bridge to Hippius Blockchain
  {
    id: 'bridge-to-hippius',
    source: 'bridge',
    target: 'hippius-blockchain',
    animated: true,
    type: 'default',
    style: edgeStyles.funds,
    label: 'Alpha (locked)',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Dashboard to Bridge (UI interaction)
  {
    id: 'dashboard-to-bridge',
    source: 'dashboard',
    target: 'bridge',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    label: 'UI for bridging',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Marketplace to Hippius Blockchain
  {
    id: 'marketplace-to-hippius',
    source: 'marketplace',
    target: 'hippius-blockchain',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Hippius Blockchain to Validator
  {
    id: 'hippius-to-validator',
    source: 'hippius-blockchain',
    target: 'validator',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Hippius Blockchain to Miner
  {
    id: 'hippius-to-miner',
    source: 'hippius-blockchain',
    target: 'miner',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Validator to Bittensor (weights)
  {
    id: 'validator-to-bittensor',
    source: 'validator',
    target: 'bittensor',
    animated: false,
    type: 'default',
    style: edgeStyles.orange,
    label: 'weights',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Validator to Hippius Node
  {
    id: 'validator-to-hippius',
    source: 'validator',
    target: 'hippius-node',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Validator to Subtensor Node
  {
    id: 'validator-to-subtensor',
    source: 'validator',
    target: 'subtensor-node',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Miner to S3 Storage Miner
  {
    id: 'miner-to-s3',
    source: 'miner',
    target: 's3-miner',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Miner to IPFS Storage Miner
  {
    id: 'miner-to-ipfs',
    source: 'miner',
    target: 'ipfs-miner',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Miner to Compute Miner
  {
    id: 'miner-to-compute',
    source: 'miner',
    target: 'compute-miner',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Hippius Node to Worker
  {
    id: 'hippius-to-worker',
    source: 'hippius-node',
    target: 'worker',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Worker to S3 Miner
  {
    id: 'worker-to-s3',
    source: 'worker',
    target: 's3-miner',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Worker to IPFS Miner
  {
    id: 'worker-to-ipfs',
    source: 'worker',
    target: 'ipfs-miner',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Worker to Compute Miner
  {
    id: 'worker-to-compute',
    source: 'worker',
    target: 'compute-miner',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // S3 Miner to Rewards
  {
    id: 's3-to-rewards',
    source: 's3-miner',
    target: 'rewards',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // IPFS Miner to Rewards
  {
    id: 'ipfs-to-rewards',
    source: 'ipfs-miner',
    target: 'rewards',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Compute Miner to Rewards
  {
    id: 'compute-to-rewards',
    source: 'compute-miner',
    target: 'rewards',
    animated: false,
    type: 'default',
    style: edgeStyles.dashed,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Rewards to Bridge (bidirectional Alpha flow)
  {
    id: 'rewards-to-bridge',
    source: 'rewards',
    target: 'bridge',
    animated: true,
    type: 'default',
    style: edgeStyles.funds,
    label: 'Alpha (bidirectional)',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
];

export default function ArchitectureFlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      // Determine if this is a funds-related connection
      const isFundsConnection = 
        (params.source === 'client' && params.target === 'dashboard') ||
        (params.source === 'bittensor' && params.target === 'bridge') ||
        (params.source === 'bridge' && params.target === 'hippius-blockchain') ||
        (params.source === 'rewards' && params.target === 'bridge');
      
      // Determine if this is a blockchain-related connection
      const isBlockchainConnection =
        (params.source === 'marketplace' && params.target === 'hippius-blockchain') ||
        (params.source === 'hippius-blockchain' && params.target === 'validator') ||
        (params.source === 'hippius-blockchain' && params.target === 'miner');
      
      // Determine if this is a miner-related connection
      const isMinerConnection =
        (params.source === 'miner' && params.target === 's3-miner') ||
        (params.source === 'miner' && params.target === 'ipfs-miner') ||
        (params.source === 'miner' && params.target === 'compute-miner');
      
      // Determine if this is a UI-related connection
      const isUIConnection =
        (params.source === 'dashboard' && params.target === 'bridge');
      
      setEdges((eds) => addEdge({ 
        ...params, 
        animated: isFundsConnection, 
        type: 'default',
        style: isFundsConnection ? edgeStyles.funds : 
              isBlockchainConnection ? edgeStyles.highlighted : 
              isMinerConnection ? edgeStyles.highlighted :
              isUIConnection ? edgeStyles.dashed :
              edgeStyles.dashed,
        label: isUIConnection ? 'UI for bridging' : undefined
      }, eds));
    },
    [setEdges]
  );

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        className="architecture-flow-diagram"
        style={{ width: '100%', height: '1500px' }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView={false}
        defaultViewport={{ x: 120, y: 0, zoom: 0.55 }}
        attributionPosition="bottom-right"
        minZoom={0.1}
        maxZoom={4}
        defaultEdgeOptions={{
          style: edgeStyles.dashed,
          animated: false,
          type: 'default',
          labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
          labelStyle: { fill: '#ffffff' },
        }}
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            return '#fff';
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;
            return '#fff';
          }}
          nodeBorderRadius={2}
          className="flow-minimap"
        />
        <Controls className="flow-controls" />
        <Background color="#000000" gap={16} className="flow-background" />
      </ReactFlow>
    </div>
  );
}