import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getBezierPath,
  getStraightPath,
  getEdgeCenter,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../css/architecture-flow-diagram.css';

// Custom edge with step routing (90° angles)
const StepEdge = ({ id, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, data, markerEnd }) => {
  // Calculate the path
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  });

  // For a step edge, we need to create a path with right angles
  const xDiff = targetX - sourceX;
  const yDiff = targetY - sourceY;
  
  // Determine if we should route horizontally first or vertically first
  // For vertical connections (nodes in a column), go straight down/up
  if (Math.abs(xDiff) < 50) {
    // Almost vertical alignment - go straight
    return (
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
        markerEnd={markerEnd}
      />
    );
  }
  
  // For horizontal connections with small vertical difference, go straight across
  if (Math.abs(yDiff) < 50) {
    return (
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
        markerEnd={markerEnd}
      />
    );
  }
  
  // For connections between nodes at different levels, use step routing
  // Calculate midpoints to avoid crossing through nodes
  const midX = sourceX + xDiff / 2;
  const midY = sourceY + yDiff / 2;
  
  // Create a path with right angles based on the positions
  let path;
  
  // If source is above target, go down then across
  if (sourceY < targetY) {
    if (sourcePosition === 'bottom' && targetPosition === 'top') {
      // Vertical alignment - go straight down
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    } else if (sourcePosition === 'right' && targetPosition === 'left') {
      // Horizontal alignment - go right then down then left
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    } else if (sourcePosition === 'left' && targetPosition === 'right') {
      // Horizontal alignment - go left then down then right
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    } else {
      // Default - go down then across
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    }
  } else {
    // If source is below target, go across then up
    if (sourcePosition === 'top' && targetPosition === 'bottom') {
      // Vertical alignment - go straight up
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    } else {
      // Default - go across then up
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    }
  }

  return (
    <path
      id={id}
      style={style}
      className="react-flow__edge-path"
      d={path}
      markerEnd={markerEnd}
    />
  );
};

// Custom edge for Alpha flows with animated dashed lines
const AlphaFlowEdge = ({ id, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, data, markerEnd }) => {
  // For a step edge, we need to create a path with right angles
  const xDiff = targetX - sourceX;
  const yDiff = targetY - sourceY;
  
  // Calculate midpoints to avoid crossing through nodes
  const midX = sourceX + xDiff / 2;
  const midY = sourceY + yDiff / 2;
  
  // Create a path with right angles based on the positions
  let path;
  
  // If source is above target, go down then across
  if (sourceY < targetY) {
    if (sourcePosition === 'bottom' && targetPosition === 'top') {
      // Vertical alignment - go straight down
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    } else if (sourcePosition === 'right' && targetPosition === 'left') {
      // Horizontal alignment - go right then down then left
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    } else if (sourcePosition === 'left' && targetPosition === 'right') {
      // Horizontal alignment - go left then down then right
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    } else {
      // Default - go down then across
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    }
  } else {
    // If source is below target, go across then up
    if (sourcePosition === 'top' && targetPosition === 'bottom') {
      // Vertical alignment - go straight up
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    } else {
      // Default - go across then up
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    }
  }

  return (
    <>
      <path
        id={id}
        className="alpha-flow-path"
        d={path}
        markerEnd={markerEnd}
      />
      {/* Add a label if needed */}
      {data?.label && (
        <text
          x={midX}
          y={midY - 10}
          textAnchor="middle"
          style={{ fill: '#fff', fontSize: '12px' }}
          className="react-flow__edge-text"
        >
          {data.label}
        </text>
      )}
    </>
  );
};

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
  validator: {
    stroke: '#4285F4', // Blue
    strokeWidth: 2,
    strokeDasharray: 'none',
  },
  miner: {
    stroke: '#34A853', // Green
    strokeWidth: 2,
    strokeDasharray: 'none',
  },
  ranking: {
    stroke: '#FBBC05', // Yellow
    strokeWidth: 2.5,
    strokeDasharray: 'none',
  },
  worker: {
    stroke: '#4285F4', // Blue
    strokeWidth: 1.5,
    strokeDasharray: '5,5',
  },
  client: {
    stroke: '#EA4335', // Red/Orange
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
    position: { x: 605, y: 50 }, // Top center, perfect vertical alignment
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
    style: {
      ...nodeStyles.client,
      width: 250, // Ensure consistent width
      textAlign: 'center',
    },
  },
  // Bittensor Blockchain
  {
    id: 'bittensor',
    type: 'default',
    position: { x: -50, y: 320 }, // Moved much further left
    data: { label: <div><strong>Bittensor Blockchain</strong></div> },
    style: nodeStyles.bittensor,
  },
  // Bridge
  {
    id: 'bridge',
    type: 'default',
    position: { x: -50, y: 550 }, // Aligned with Bittensor horizontally
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
    position: { x: -50, y: 800 }, // Moved further down to avoid overlap with Hippius Full Node
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
    position: { x: 605, y: 250 }, // Increased vertical spacing
    data: { label: <div><strong>Web Dashboard</strong></div> },
    style: {
      ...nodeStyles.dashboard,
      width: 180, // Ensure consistent width
      textAlign: 'center',
    },
  },
  // Dashboard Note
  {
    id: 'dashboard-note',
    type: 'default',
    position: { x: 350, y: 350 }, // Adjusted position
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
    position: { x: 605, y: 400 }, // Increased vertical spacing
    data: { label: <div><strong>Marketplace Pallet</strong></div> },
    style: {
      ...nodeStyles.marketplace,
      width: 180, // Ensure consistent width
      textAlign: 'center',
    },
  },
  // Hippius Blockchain
  {
    id: 'hippius-blockchain',
    type: 'default',
    position: { x: 605, y: 550 }, // Increased vertical spacing
    data: { label: <div><strong>Hippius Blockchain</strong></div> },
    style: {
      ...nodeStyles.bittensor, // Reusing the blockchain style
      width: 180, // Ensure consistent width
      textAlign: 'center',
    },
  },
  // Validator Node
  {
    id: 'validator',
    type: 'default',
    position: { x: 400, y: 700 }, // Left of Hippius blockchain
    data: { label: <div><strong>Validator Node</strong></div> },
    style: nodeStyles.validator,
  },
  // Miner Node
  {
    id: 'miner',
    type: 'default',
    position: { x: 1100, y: 700 }, // Adjusted to align with new layout
    data: { label: <div><strong>Miner Node</strong></div> },
    style: {
      ...nodeStyles.miner,
      width: 180, // Ensure consistent width
      textAlign: 'center',
    },
  },
  // Hippius Full Node
  {
    id: 'hippius-node',
    type: 'default',
    position: { x: 605, y: 850 }, // Increased vertical spacing
    data: { label: <div><strong>Hippius Full Node</strong></div> },
    style: {
      ...nodeStyles.ipfs,
      width: 180, // Ensure consistent width
      textAlign: 'center',
    },
  },
  // Subtensor Full Node
  {
    id: 'subtensor-node',
    type: 'default',
    position: { x: 350, y: 850 }, // Aligned with Hippius Full Node
    data: { label: <div><strong>Subtensor Full Node</strong></div> },
    style: nodeStyles.ipfs,
  },
  // Offchain Worker
  {
    id: 'worker',
    type: 'default',
    position: { x: 605, y: 1000 }, // Increased vertical spacing
    data: { label: <div><strong>Offchain Worker</strong></div> },
    style: {
      ...nodeStyles.worker,
      width: 180, // Ensure consistent width
      textAlign: 'center',
    },
  },
  // S3 Storage Miner
  {
    id: 's3-miner',
    type: 'default',
    position: { x: 600, y: 1300 }, // Increased vertical spacing
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
    position: { x: 1600, y: 1300 }, // Increased vertical spacing
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
    position: { x: 1100, y: 1300 }, // Increased vertical spacing
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
  // Ranking Pallet
  {
    id: 'ranking-pallet',
    type: 'default',
    position: { x: 1500, y: 1000 }, // Aligned horizontally with Offchain Worker
    data: { 
      label: (
        <div style={{ textAlign: 'center', padding: '10px 0', lineHeight: '1.4' }}>
          <strong>RANKING PALLET</strong><br/>
          • Validators weight miners<br/>
          • Points based on work & criteria<br/>
          • Distributes rewards by rank
        </div>
      ) 
    },
    style: {
      ...nodeStyles.marketplace, // Using marketplace style as base
      background: '#FBBC05', // Yellow like marketplace
      width: 320, // Further increased width to fit text
      height: 180, // Adjusted height for balanced spacing
      fontSize: '16px', // Ensure text is readable
      padding: '20px', // Increased padding
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  // Rewards
  {
    id: 'rewards',
    type: 'default',
    position: { x: 1100, y: 1700 }, // Increased vertical spacing
    data: { 
      label: (
        <div>
          <strong>REWARD DISTRIBUTION</strong><br/>
          • 10% Treasury<br/>
          • 30% Validators & Stakers<br/>
          • 60% Miners (via Ranking Pallet)<br/><br/>
          All rewards in Alpha can be bridged back to Bittensor
        </div>
      ) 
    },
    style: {
      ...nodeStyles.rewards,
      width: 300, // Make it wider to fit the text
    },
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
    type: 'alphaFlow',
    style: edgeStyles.funds,
    data: { label: 'FIAT/Alpha/TAO' },
    sourcePosition: 'bottom',
    targetPosition: 'top',
  },
  // Dashboard to Marketplace
  {
    id: 'dashboard-to-marketplace',
    source: 'dashboard',
    target: 'marketplace',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    label: 'mints credit',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    sourcePosition: 'bottom',
    targetPosition: 'top',
  },
  // Bittensor to Bridge
  {
    id: 'bittensor-to-bridge',
    source: 'bittensor',
    target: 'bridge',
    animated: true,
    type: 'alphaFlow',
    style: edgeStyles.funds,
    data: { label: 'Alpha' },
    sourcePosition: 'bottom',
    targetPosition: 'top',
  },
  // Bridge to Hippius Blockchain
  {
    id: 'bridge-to-hippius',
    source: 'bridge',
    target: 'hippius-blockchain',
    animated: true,
    type: 'alphaFlow',
    style: edgeStyles.funds,
    data: { label: 'Alpha (locked)' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  // Dashboard to Bridge (UI interaction)
  {
    id: 'dashboard-to-bridge',
    source: 'dashboard',
    target: 'bridge',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    label: 'UI for bridging',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    sourcePosition: 'left',
    targetPosition: 'right',
  },
  // Marketplace to Hippius Blockchain
  {
    id: 'marketplace-to-hippius',
    source: 'marketplace',
    target: 'hippius-blockchain',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    sourcePosition: 'bottom',
    targetPosition: 'top',
  },
  // Hippius Blockchain to Validator
  {
    id: 'hippius-to-validator',
    source: 'hippius-blockchain',
    target: 'validator',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    sourcePosition: 'left',
    targetPosition: 'right',
  },
  // Hippius Blockchain to Miner
  {
    id: 'hippius-to-miner',
    source: 'hippius-blockchain',
    target: 'miner',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  // Hippius Blockchain to Hippius Full Node
  {
    id: 'hippius-blockchain-to-hippius-node',
    source: 'hippius-blockchain',
    target: 'hippius-node',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    sourcePosition: 'bottom',
    targetPosition: 'top',
  },
  // Validator to Bittensor (weights)
  {
    id: 'validator-to-bittensor',
    source: 'validator',
    target: 'bittensor',
    animated: true,
    type: 'step',
    style: edgeStyles.validator,
    label: 'weights',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Validator to Hippius Node
  {
    id: 'validator-to-hippius',
    source: 'validator',
    target: 'hippius-node',
    animated: true,
    type: 'step',
    style: edgeStyles.validator,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    sourcePosition: 'bottom',
    targetPosition: 'top',
  },
  // Validator to Subtensor Node
  {
    id: 'validator-to-subtensor',
    source: 'validator',
    target: 'subtensor-node',
    animated: true,
    type: 'step',
    style: edgeStyles.validator,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Validator to Ranking Pallet
  {
    id: 'validator-to-ranking',
    source: 'validator',
    target: 'ranking-pallet',
    animated: true,
    type: 'step',
    style: edgeStyles.validator,
    label: 'weights',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Miner to S3 Storage Miner
  {
    id: 'miner-to-s3',
    source: 'miner',
    target: 's3-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.miner,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Miner to IPFS Storage Miner
  {
    id: 'miner-to-ipfs',
    source: 'miner',
    target: 'ipfs-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.miner,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Miner to Compute Miner
  {
    id: 'miner-to-compute',
    source: 'miner',
    target: 'compute-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.miner,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Miner to Ranking Pallet
  {
    id: 'miner-to-ranking',
    source: 'miner',
    target: 'ranking-pallet',
    animated: true,
    type: 'step',
    style: edgeStyles.miner,
    label: 'registers',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Marketplace to Ranking Pallet
  {
    id: 'marketplace-to-ranking',
    source: 'marketplace',
    target: 'ranking-pallet',
    animated: false,
    type: 'step',
    style: edgeStyles.funds,
    label: '60% of revenue',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    animated: true,
  },
  // Ranking Pallet to S3 Miner
  {
    id: 'ranking-to-s3',
    source: 'ranking-pallet',
    target: 's3-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.ranking,
    label: '60% of S3 revenue',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    labelShowBg: true,
    labelBgPadding: [8, 4],
  },
  // Ranking Pallet to IPFS Miner
  {
    id: 'ranking-to-ipfs',
    source: 'ranking-pallet',
    target: 'ipfs-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.ranking,
    label: '60% of IPFS revenue',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    labelShowBg: true,
    labelBgPadding: [8, 4],
  },
  // Ranking Pallet to Compute Miner
  {
    id: 'ranking-to-compute',
    source: 'ranking-pallet',
    target: 'compute-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.ranking,
    label: '60% of Compute revenue',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    labelShowBg: true,
    labelBgPadding: [8, 4],
  },
  // Ranking Pallet to Rewards
  {
    id: 'ranking-to-rewards',
    source: 'ranking-pallet',
    target: 'rewards',
    animated: true,
    type: 'step',
    style: edgeStyles.ranking,
    label: 'distributes 60%',
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Hippius Node to Worker
  {
    id: 'hippius-to-worker',
    source: 'hippius-node',
    target: 'worker',
    animated: true,
    type: 'step',
    style: edgeStyles.validator,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
    sourcePosition: 'bottom',
    targetPosition: 'top',
  },
  // Worker to S3 Miner
  {
    id: 'worker-to-s3',
    source: 'worker',
    target: 's3-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.worker,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Worker to IPFS Miner
  {
    id: 'worker-to-ipfs',
    source: 'worker',
    target: 'ipfs-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.worker,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Worker to Compute Miner
  {
    id: 'worker-to-compute',
    source: 'worker',
    target: 'compute-miner',
    animated: true,
    type: 'step',
    style: edgeStyles.worker,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // S3 Miner to Rewards
  {
    id: 's3-to-rewards',
    source: 's3-miner',
    target: 'rewards',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // IPFS Miner to Rewards
  {
    id: 'ipfs-to-rewards',
    source: 'ipfs-miner',
    target: 'rewards',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Compute Miner to Rewards
  {
    id: 'compute-to-rewards',
    source: 'compute-miner',
    target: 'rewards',
    animated: false,
    type: 'step',
    style: edgeStyles.solid,
    labelBgStyle: { fill: 'rgba(30, 30, 30, 0.7)' },
    labelStyle: { fill: '#ffffff' },
  },
  // Rewards to Bridge (bidirectional Alpha flow)
  {
    id: 'rewards-to-bridge',
    source: 'rewards',
    target: 'bridge',
    animated: true,
    type: 'alphaFlow',
    style: edgeStyles.funds,
    data: { label: 'Alpha (bidirectional)' },
  },
];

export default function ArchitectureFlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Define the edge types
  const edgeTypes = {
    step: StepEdge,
    alphaFlow: AlphaFlowEdge,
  };

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
        type: isFundsConnection ? 'alphaFlow' : 'step',
        style: isFundsConnection ? edgeStyles.funds : 
              isBlockchainConnection ? edgeStyles.highlighted : 
              isMinerConnection ? edgeStyles.highlighted :
              isUIConnection ? edgeStyles.dashed :
              edgeStyles.dashed,
        data: isUIConnection ? { label: 'UI for bridging' } : undefined
      }, eds));
    },
    [setEdges]
  );

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  return (
    <div style={{ width: '100%', height: '750px' }}>
      <ReactFlow
        className="architecture-flow-diagram"
        style={{ width: '100%', height: '750px' }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        edgeTypes={edgeTypes}
        fitView={true}
        fitViewOptions={{ padding: 0.1 }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.4 }}
        attributionPosition="bottom-right"
        minZoom={0.1}
        maxZoom={4}
        defaultEdgeOptions={{
          style: edgeStyles.dashed,
          animated: false,
          type: 'step',
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
          style={{ 
            width: 120, 
            height: 80,
            bottom: 10,
            right: 10,
            background: 'rgba(20, 20, 20, 0.8)'
          }}
        />
        <Controls className="flow-controls" />
        <Background color="#000000" gap={16} className="flow-background" />
      </ReactFlow>
    </div>
  );
}