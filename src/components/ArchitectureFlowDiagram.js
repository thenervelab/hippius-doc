import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../css/architecture-flow-diagram.css';

// Define custom edge styles
const edgeStyles = {
  default: {
    stroke: '#555',
    strokeWidth: 2,
  },
  highlight: {
    stroke: '#FF5722',
    strokeWidth: 3,
  },
};

// Define custom node styles
const nodeStyles = {
  validator: {
    background: '#4285F4',
    color: 'white',
    border: '1px solid #2A56C6',
    borderRadius: '5px',
    padding: '10px',
    width: 180,
  },
  miner: {
    background: '#34A853',
    color: 'white',
    border: '1px solid #137333',
    borderRadius: '5px',
    padding: '10px',
    width: 180,
  },
  relay: {
    background: '#C026D3',
    color: 'white',
    border: '1px solid #9C1AB1',
    borderRadius: '5px',
    padding: '10px',
    width: 220,
  },
  dashboard: {
    background: '#9333EA',
    color: 'white',
    border: '1px solid #7928CA',
    borderRadius: '5px',
    padding: '10px',
    width: 180,
  },
  ipfs: {
    background: '#4285F4',
    color: 'white',
    border: '1px solid #2A56C6',
    borderRadius: '5px',
    padding: '10px',
    width: 180,
  },
  storage: {
    background: '#34A853',
    color: 'white',
    border: '1px solid #137333',
    borderRadius: '5px',
    padding: '10px',
    width: 180,
  },
  offchain: {
    background: '#4285F4',
    color: 'white',
    border: '1px solid #2A56C6',
    borderRadius: '5px',
    padding: '10px',
    width: 180,
  },
  marketplace: {
    background: '#1E1E1E',
    color: 'white',
    border: '1px solid #000000',
    borderRadius: '5px',
    padding: '10px',
    width: 220,
  },
  client: {
    background: '#1E1E1E',
    color: 'white',
    border: '1px solid #000000',
    borderRadius: '5px',
    padding: '10px',
    width: 220,
    height: 150,
  },
  bittensor: {
    background: '#1E1E1E',
    color: 'white',
    border: '1px solid #000000',
    borderRadius: '5px',
    padding: '10px',
    width: 300,
  },
};

// Initial nodes configuration
const initialNodes = [
  {
    id: 'client',
    type: 'default',
    position: { x: 400, y: -350 },
    data: { 
      label: (
        <div>
          <strong>CLIENT BUYING:</strong>
          <div>- Storage</div>
          <div>- Compute</div>
          <div style={{ marginTop: '10px' }}>Paying in FIAT / Alpha / TAO</div>
          <div>from the Dashboard</div>
        </div>
      ) 
    },
    style: nodeStyles.client,
  },
  {
    id: 'web-dashboard',
    type: 'default',
    position: { x: 400, y: -150 },
    data: { label: 'Web Dashboard' },
    style: nodeStyles.dashboard,
  },
  {
    id: 'marketplace',
    type: 'default',
    position: { x: 400, y: -250 },
    data: { label: 'Marketplace Pallet' },
    style: nodeStyles.marketplace,
  },
  {
    id: 'relay-node',
    type: 'default',
    position: { x: 400, y: -50 },
    data: { label: 'Relay Node (RPC + IPFS Gateway)' },
    style: nodeStyles.relay,
  },
  {
    id: 'validator-node',
    type: 'default',
    position: { x: 200, y: 100 },
    data: { label: 'Validator Node' },
    style: nodeStyles.validator,
  },
  {
    id: 'miner-node',
    type: 'default',
    position: { x: 600, y: 100 },
    data: { label: 'Miner Node' },
    style: nodeStyles.miner,
  },
  {
    id: 'hippius-full-node',
    type: 'default',
    position: { x: 100, y: 250 },
    data: { label: 'Hippius Full Node' },
    style: nodeStyles.validator,
  },
  {
    id: 'subtensor-full-node',
    type: 'default',
    position: { x: 300, y: 250 },
    data: { label: 'Subtensor Full Node' },
    style: nodeStyles.validator,
  },
  {
    id: 'ipfs-node',
    type: 'default',
    position: { x: 500, y: 250 },
    data: { label: 'IPFS Node' },
    style: nodeStyles.ipfs,
  },
  {
    id: 'ipfs-storage',
    type: 'default',
    position: { x: 700, y: 250 },
    data: { label: 'IPFS Storage' },
    style: nodeStyles.storage,
  },
  {
    id: 'offchain-worker',
    type: 'default',
    position: { x: 200, y: 400 },
    data: { 
      label: (
        <div>
          <div>Offchain Worker</div>
        </div>
      ) 
    },
    style: nodeStyles.offchain,
  },
  {
    id: 's3-miner',
    type: 'default',
    position: { x: 100, y: 550 },
    data: { 
      label: (
        <div>
          <div>S3 STORAGE MINER</div>
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            - Blockchain + OFFCHAIN WORKER
            <br />- Volume service and auth
          </div>
        </div>
      ) 
    },
    style: { ...nodeStyles.validator, width: 220 },
  },
  {
    id: 'ipfs-miner',
    type: 'default',
    position: { x: 400, y: 550 },
    data: { 
      label: (
        <div>
          <div>IPFS STORAGE MINER</div>
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            - Blockchain + OFFCHAIN WORKER
            <br />- IPFS service
          </div>
        </div>
      ) 
    },
    style: { ...nodeStyles.ipfs, width: 220 },
  },
  {
    id: 'compute-miner',
    type: 'default',
    position: { x: 700, y: 550 },
    data: { 
      label: (
        <div>
          <div>COMPUTE MINER</div>
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            - Blockchain + OFFCHAIN WORKER
            <br />- VM Agent
            <br />- k8s
            <br />- libvirt
          </div>
        </div>
      ) 
    },
    style: { ...nodeStyles.miner, width: 220 },
  },
  {
    id: 'bittensor',
    type: 'default',
    position: { x: -100, y: 50 },
    data: { 
      label: (
        <div>
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Bittensor Blockchain</div>
        </div>
      ) 
    },
    style: nodeStyles.bittensor,
  },
  {
    id: 'rewards',
    type: 'default',
    position: { x: 400, y: 700 },
    data: { 
      label: (
        <div style={{ fontSize: '12px' }}>
          <strong>REWARD DISTRIBUTION:</strong>
          <div>- 10% for treasury</div>
          <div>- 30% for validators + stakers</div>
          <div>- 60% for miners</div>
          <div style={{ marginTop: '5px' }}>All rewards in Alpha, can be bridged to Bittensor</div>
        </div>
      ) 
    },
    style: { ...nodeStyles.marketplace, width: 300, height: 120 },
  },
];

// Initial edges configuration
const initialEdges = [
  { 
    id: 'client-to-web', 
    source: 'client', 
    target: 'web-dashboard', 
    label: 'Purchase', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'web-to-marketplace', 
    source: 'web-dashboard', 
    target: 'marketplace', 
    label: 'Request', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'marketplace-to-relay', 
    source: 'marketplace', 
    target: 'relay-node', 
    label: 'Submit', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'relay-to-validator', 
    source: 'relay-node', 
    target: 'validator-node', 
    label: 'RPC', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'relay-to-miner', 
    source: 'relay-node', 
    target: 'miner-node', 
    label: 'RPC', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'validator-to-hippius', 
    source: 'validator-node', 
    target: 'hippius-full-node', 
    label: 'Structural', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'validator-to-subtensor', 
    source: 'validator-node', 
    target: 'subtensor-full-node', 
    label: 'Structural', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'miner-to-ipfs-node', 
    source: 'miner-node', 
    target: 'ipfs-node', 
    label: 'Structural', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'miner-to-ipfs-storage', 
    source: 'miner-node', 
    target: 'ipfs-storage', 
    label: 'Storage', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'hippius-to-offchain', 
    source: 'hippius-full-node', 
    target: 'offchain-worker', 
    label: 'Spawn', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'relay-to-ipfs-node', 
    source: 'relay-node', 
    target: 'ipfs-node', 
    label: 'Monitor', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'validator-to-bittensor', 
    source: 'validator-node', 
    target: 'bittensor', 
    label: 'Submit weights', 
    animated: true, 
    type: 'smoothstep', 
    markerEnd: { type: MarkerType.ArrowClosed },
    style: edgeStyles.default,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
  { 
    id: 'offchain-to-s3', 
    source: 'offchain-worker', 
    target: 's3-miner', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
  },
  { 
    id: 'offchain-to-ipfs', 
    source: 'offchain-worker', 
    target: 'ipfs-miner', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
  },
  { 
    id: 'offchain-to-compute', 
    source: 'offchain-worker', 
    target: 'compute-miner', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
  },
  { 
    id: 's3-to-rewards', 
    source: 's3-miner', 
    target: 'rewards', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
  },
  { 
    id: 'ipfs-to-rewards', 
    source: 'ipfs-miner', 
    target: 'rewards', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
  },
  { 
    id: 'compute-to-rewards', 
    source: 'compute-miner', 
    target: 'rewards', 
    animated: true, 
    type: 'smoothstep',
    style: edgeStyles.default,
  },
  { 
    id: 'rewards-to-bittensor', 
    source: 'rewards', 
    target: 'bittensor', 
    label: 'Bridge', 
    animated: true, 
    type: 'smoothstep', 
    style: edgeStyles.highlight,
    labelStyle: { fontSize: '12px', fontWeight: 'bold' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
  },
];

export default function ArchitectureFlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      type: 'smoothstep',
      style: edgeStyles.default,
      labelStyle: { fontSize: '12px', fontWeight: 'bold' },
      labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
    }, eds)),
    [setEdges]
  );

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  return (
    <div className="architecture-flow-diagram">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        attributionPosition="bottom-right"
        minZoom={0.2}
        maxZoom={4}
        defaultEdgeOptions={{
          style: { strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
      >
        <Controls />
        <MiniMap 
          nodeStrokeColor={(n) => {
            return '#fff';
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;
            return '#eee';
          }}
        />
        <Background color="#aaa" gap={16} />
        <Panel position="top-left" className="architecture-legend">
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Hippius Architecture</h3>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Interactive diagram - drag to pan, scroll to zoom
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
} 