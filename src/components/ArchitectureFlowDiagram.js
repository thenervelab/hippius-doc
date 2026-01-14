import React, { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "../css/architecture-flow-diagram.css";

// Custom edge with step routing (90° angles)
const StepEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const xDiff = targetX - sourceX;
  const yDiff = targetY - sourceY;

  if (Math.abs(xDiff) < 50) {
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

  const midX = sourceX + xDiff / 2;
  const midY = sourceY + yDiff / 2;

  let path;
  if (sourceY < targetY) {
    if (sourcePosition === "bottom" && targetPosition === "top") {
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    } else if (sourcePosition === "right" && targetPosition === "left") {
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    } else if (sourcePosition === "left" && targetPosition === "right") {
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    } else {
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    }
  } else {
    if (sourcePosition === "top" && targetPosition === "bottom") {
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    } else {
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
const AlphaFlowEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const xDiff = targetX - sourceX;
  const yDiff = targetY - sourceY;

  const midX = sourceX + xDiff / 2;
  const midY = sourceY + yDiff / 2;

  let path;
  if (sourceY < targetY) {
    if (sourcePosition === "bottom" && targetPosition === "top") {
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    } else if (sourcePosition === "right" && targetPosition === "left") {
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    } else if (sourcePosition === "left" && targetPosition === "right") {
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    } else {
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    }
  } else {
    if (sourcePosition === "top" && targetPosition === "bottom") {
      path = `M${sourceX},${sourceY} V${midY} H${targetX} V${targetY}`;
    } else {
      path = `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
    }
  }

  return (
    <>
      <path
        id={`${id}-glow`}
        d={path}
        stroke="rgba(76, 175, 80, 0.3)"
        strokeWidth="6"
        fill="none"
        filter="url(#glow)"
      />
      <path
        id={id}
        className="alpha-flow-path"
        d={path}
        markerEnd={markerEnd}
        style={style}
      />
      {data?.label && (
        <text
          x={midX}
          y={midY - 10}
          textAnchor="middle"
          style={{
            fill: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            textShadow: "0 0 4px rgba(0,0,0,0.8)",
            fontFamily: "monospace",
          }}
          className="react-flow__edge-text"
        >
          {data.label}
        </text>
      )}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </>
  );
};

// Define custom edge styles with enhanced visibility
const edgeStyles = {
  solid: {
    stroke: "#ffffff",
    strokeWidth: 2,
    strokeDasharray: "none",
    filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))",
  },
  dashed: {
    stroke: "#ffffff",
    strokeWidth: 2,
    strokeDasharray: "5,5",
    filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))",
  },
  highlighted: {
    stroke: "#FBBC05",
    strokeWidth: 3,
    strokeDasharray: "none",
    filter: "drop-shadow(0 0 5px rgba(251, 188, 5, 0.7))",
  },
  orange: {
    stroke: "#EA4335",
    strokeWidth: 3,
    strokeDasharray: "5,5",
    filter: "drop-shadow(0 0 4px rgba(234, 67, 53, 0.6))",
  },
  funds: {
    stroke: "#4CAF50",
    strokeWidth: 3,
    strokeDasharray: "none",
    filter: "drop-shadow(0 0 5px rgba(76, 175, 80, 0.7))",
  },
  validator: {
    stroke: "#4285F4",
    strokeWidth: 3,
    strokeDasharray: "none",
    filter: "drop-shadow(0 0 5px rgba(66, 133, 244, 0.7))",
  },
  miner: {
    stroke: "#34A853",
    strokeWidth: 3,
    strokeDasharray: "none",
    filter: "drop-shadow(0 0 4px rgba(52, 168, 83, 0.7))",
  },
  ranking: {
    stroke: "#FBBC05",
    strokeWidth: 3,
    strokeDasharray: "none",
    filter: "drop-shadow(0 0 4px rgba(251, 188, 5, 0.7))",
  },
  worker: {
    stroke: "#4285F4",
    strokeWidth: 2,
    strokeDasharray: "5,5",
    filter: "drop-shadow(0 0 4px rgba(66, 133, 244, 0.7))",
  },
  client: {
    stroke: "#EA4335",
    strokeWidth: 3,
    strokeDasharray: "none",
    filter: "drop-shadow(0 0 4px rgba(234, 67, 53, 0.7))",
  },
};

// Node style helper function with improved readability
const getNodeStyle = (type) => {
  const baseStyle = {
    padding: "16px",
    borderRadius: "8px",
    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    fontWeight: 600,
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
    fontSize: "16px",
    fontFamily: "monospace",
    color: "#ffffff",
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  };

  switch (type) {
    case "client":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #424242 0%, #303030 100%)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        width: 250,
        height: 180,
      };
    case "dashboard":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)",
        borderColor: "#42A5F5",
        width: 200,
        height: 60,
      };
    case "marketplace":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #7E57C2 0%, #5E35B1 100%)",
        borderColor: "#9575CD",
        width: 200,
        height: 60,
      };
    case "blockchain":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #FFA000 0%, #FF6F00 100%)",
        borderColor: "#FFB74D",
        width: 220,
        height: 60,
      };
    case "validator":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #43A047 0%, #2E7D32 100%)",
        borderColor: "#66BB6A",
        width: 200,
        height: 60,
      };
    case "miner":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
        borderColor: "#EF5350",
        width: 200,
        height: 60,
      };
    case "worker":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #4285F4 0%, #1565C0 100%)",
        borderColor: "#42A5F5",
        width: 200,
        height: 60,
      };
    case "note":
      return {
        ...baseStyle,
        background: "rgba(30, 30, 30, 0.8)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        width: 300,
        fontSize: "14px",
        padding: "15px",
      };
    case "minerDetails":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
        borderColor: "#EF5350",
        width: 250,
        height: 120,
      };
    case "rewards":
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
        borderColor: "#66BB6A",
        width: 350,
        height: 200,
      };
    default:
      return {
        ...baseStyle,
        background: "linear-gradient(135deg, #424242 0%, #303030 100%)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        width: 200,
        height: 60,
      };
  }
};

// Initial nodes configuration with increased spacing and centered layout
const initialNodes = [
  // Client Buying
  {
    id: "client",
    type: "default",
    position: { x: 300, y: 50 },
    data: {
      label: (
        <div style={{ textAlign: "center", lineHeight: "1.5" }}>
          <strong>CLIENT</strong>
          <br />
          Purchases resources:
          <br />
          • Storage
          <br />
          • Compute
          <br />
          <br />
          Payment methods:
          <br />
          FIAT / Alpha / TAO
        </div>
      ),
    },
    style: getNodeStyle("client"),
  },
  // Bittensor Blockchain
  {
    id: "bittensor",
    type: "default",
    position: { x: 500, y: 350 },
    data: {
      label: (
        <div>
          <strong>Bittensor Blockchain</strong>
        </div>
      ),
    },
    style: getNodeStyle("blockchain"),
  },
  // Bridge
  {
    id: "bridge",
    type: "default",
    position: { x: 500, y: 500 },
    data: {
      label: (
        <div style={{ textAlign: "center", lineHeight: "1.5" }}>
          <strong>BRIDGE</strong>
          <br />
          Bidirectional transfer of Alpha
          <br />
          between Bittensor and Hippius
        </div>
      ),
    },
    style: getNodeStyle("blockchain"),
  },
  // Bridge Note
  {
    id: "bridge-note",
    type: "default",
    position: { x: 500, y: 650 },
    data: {
      label: (
        <div style={{ lineHeight: "1.5" }}>
          <strong>Process:</strong>
          <br />
          1. Client purchases with FIAT/TAO
          <br />
          2. System acquires Alpha on Bittensor
          <br />
          3. Alpha is bridged to Hippius chain
          <br />
          4. Alpha is locked as credit is minted
        </div>
      ),
    },
    style: getNodeStyle("note"),
  },
  // Web Dashboard
  {
    id: "dashboard",
    type: "default",
    position: { x: 850, y: 150 },
    data: {
      label: (
        <div>
          <strong>Web Dashboard</strong>
        </div>
      ),
    },
    style: getNodeStyle("dashboard"),
  },
  // Dashboard Note
  {
    id: "dashboard-note",
    type: "default",
    position: { x: 850, y: 250 },
    data: {
      label: (
        <div style={{ lineHeight: "1.5" }}>
          <strong>UI Interaction:</strong>
          <br />
          Dashboard provides interface
          <br />
          for bridging Alpha between chains
        </div>
      ),
    },
    style: getNodeStyle("note"),
  },
  // Marketplace Pallet
  {
    id: "marketplace",
    type: "default",
    position: { x: 1150, y: 900 },
    data: {
      label: (
        <div>
          <strong>Marketplace Pallet</strong>
        </div>
      ),
    },
    style: getNodeStyle("marketplace"),
  },
  // Hippius Blockchain
  {
    id: "hippius-blockchain",
    type: "default",
    position: { x: 1150, y: 500 },
    data: {
      label: (
        <div>
          <strong>Hippius Blockchain</strong>
        </div>
      ),
    },
    style: getNodeStyle("blockchain"),
  },
  // Validator Node
  {
    id: "validator",
    type: "default",
    position: { x: 950, y: 650 },
    data: {
      label: (
        <div>
          <strong>Validator Node</strong>
        </div>
      ),
    },
    style: getNodeStyle("validator"),
  },
  // Miner Node
  {
    id: "miner",
    type: "default",
    position: { x: 1350, y: 650 },
    data: {
      label: (
        <div>
          <strong>Miner Node</strong>
        </div>
      ),
    },
    style: getNodeStyle("miner"),
  },
  // Hippius Full Node
  {
    id: "hippius-node",
    type: "default",
    position: { x: 1150, y: 750 },
    data: {
      label: (
        <div>
          <strong>Hippius Full Node</strong>
        </div>
      ),
    },
    style: getNodeStyle("blockchain"),
  },
  // Subtensor Full Node
  {
    id: "subtensor-node",
    type: "default",
    position: { x: 750, y: 750 },
    data: {
      label: (
        <div>
          <strong>Subtensor Full Node</strong>
        </div>
      ),
    },
    style: getNodeStyle("blockchain"),
  },
  // Offchain Worker
  {
    id: "worker",
    type: "default",
    position: { x: 1150, y: 1000 },
    data: {
      label: (
        <div>
          <strong>Offchain Worker</strong>
        </div>
      ),
    },
    style: getNodeStyle("worker"),
  },
  // S3 Storage Miner
  {
    id: "s3-miner",
    type: "default",
    position: { x: 850, y: 1200 },
    data: {
      label: (
        <div
          style={{
            textAlign: "center",
            lineHeight: "1.8",
            fontSize: "16px",
            padding: "10px 5px",
          }}
        >
          <strong
            style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}
          >
            S3 STORAGE MINER
          </strong>
          • Blockchain +<br />
          Offchain Worker
          <br />
          • Volume service and
          <br />
          auth
        </div>
      ),
    },
    style: { ...getNodeStyle("minerDetails"), width: 250, height: 220 },
  },
  // Arion Storage Miner
  {
    id: "arion-miner",
    type: "default",
    position: { x: 1450, y: 1200 },
    data: {
      label: (
        <div
          style={{
            textAlign: "center",
            lineHeight: "1.8",
            fontSize: "16px",
            padding: "10px 5px",
          }}
        >
          <strong
            style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}
          >
            ARION STORAGE MINER
          </strong>
          • Blockchain +<br />
          Offchain Worker
          <br />
          • CRUSH placement
          <br />
          • Reed-Solomon (10+20)
          <br />• Grid Streaming (QUIC)
        </div>
      ),
    },
    style: { ...getNodeStyle("minerDetails"), width: 290, height: 250 },
  },
  // Compute Miner
  {
    id: "compute-miner",
    type: "default",
    position: { x: 1150, y: 1200 },
    data: {
      label: (
        <div
          style={{
            textAlign: "center",
            lineHeight: "1.8",
            fontSize: "16px",
            padding: "10px 5px",
          }}
        >
          <strong
            style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}
          >
            COMPUTE MINER
          </strong>
          • Blockchain +<br />
          Offchain Worker
          <br />
          • VM Agent, k8s,
          <br />
          libvirt
        </div>
      ),
    },
    style: { ...getNodeStyle("minerDetails"), width: 250, height: 220 },
  },
  // Ranking Pallet
  {
    id: "ranking-pallet",
    type: "default",
    position: { x: 1600, y: 900 },
    data: {
      label: (
        <div
          style={{
            textAlign: "center",
            lineHeight: "2.0",
            fontSize: "18px",
            padding: "15px 10px",
          }}
        >
          <strong
            style={{ fontSize: "24px", display: "block", marginBottom: "10px" }}
          >
            RANKING PALLET
          </strong>
          • Validators weight miners
          <br />
          • Points based on work &<br />
          criteria
          <br />
          • Distributes rewards by
          <br />
          rank
        </div>
      ),
    },
    style: {
      ...getNodeStyle("validator"),
      width: 450,
      height: 250,
      padding: "0",
    },
  },
  // Rewards
  {
    id: "rewards",
    type: "default",
    position: { x: 1150, y: 1500 },
    data: {
      label: (
        <div
          style={{
            textAlign: "center",
            lineHeight: "1.8",
            fontSize: "18px",
            padding: "15px 10px",
          }}
        >
          <strong
            style={{ fontSize: "24px", display: "block", marginBottom: "15px" }}
          >
            REWARD DISTRIBUTION
          </strong>
          • 10% Treasury
          <br />
          • 30% Validators & Stakers
          <br />
          • 60% Miners (via Ranking
          <br />
          &nbsp;&nbsp;Pallet)
          <br />
          <br />
          <div
            style={{
              marginTop: "10px",
              marginBottom: "30px",
              paddingBottom: "15px",
            }}
          >
            All rewards in Alpha can be
            <br />
            bridged back to Bittensor
          </div>
        </div>
      ),
    },
    style: { ...getNodeStyle("rewards"), width: 400, height: 340 },
  },
];

// Initial edges configuration
const initialEdges = [
  {
    id: "client-to-dashboard",
    source: "client",
    target: "dashboard",
    animated: true,
    type: "alphaFlow",
    style: edgeStyles.funds,
    data: { label: "FIAT/Alpha/TAO" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "dashboard-to-marketplace",
    source: "dashboard",
    target: "marketplace",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    label: "mints credit",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "bittensor-to-bridge",
    source: "bittensor",
    target: "bridge",
    animated: true,
    type: "alphaFlow",
    style: edgeStyles.funds,
    data: { label: "Alpha" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "bridge-to-hippius",
    source: "bridge",
    target: "hippius-blockchain",
    animated: true,
    type: "alphaFlow",
    style: edgeStyles.funds,
    data: { label: "Alpha (locked)" },
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "dashboard-to-bridge",
    source: "dashboard",
    target: "bridge",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    label: "UI for bridging",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "left",
    targetPosition: "right",
  },
  {
    id: "marketplace-to-hippius",
    source: "marketplace",
    target: "hippius-blockchain",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "hippius-to-validator",
    source: "hippius-blockchain",
    target: "validator",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "left",
    targetPosition: "right",
  },
  {
    id: "hippius-to-miner",
    source: "hippius-blockchain",
    target: "miner",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "hippius-blockchain-to-hippius-node",
    source: "hippius-blockchain",
    target: "hippius-node",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "validator-to-bittensor",
    source: "validator",
    target: "bittensor",
    animated: true,
    type: "step",
    style: edgeStyles.validator,
    label: "weights",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "left",
    targetPosition: "right",
  },
  {
    id: "validator-to-hippius",
    source: "validator",
    target: "hippius-node",
    animated: true,
    type: "step",
    style: edgeStyles.validator,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "validator-to-subtensor",
    source: "validator",
    target: "subtensor-node",
    animated: true,
    type: "step",
    style: edgeStyles.validator,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "validator-to-ranking",
    source: "validator",
    target: "ranking-pallet",
    animated: true,
    type: "step",
    style: edgeStyles.validator,
    label: "weights",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "miner-to-s3",
    source: "miner",
    target: "s3-miner",
    animated: true,
    type: "step",
    style: edgeStyles.miner,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "miner-to-arion",
    source: "miner",
    target: "arion-miner",
    animated: true,
    type: "step",
    style: edgeStyles.miner,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "miner-to-compute",
    source: "miner",
    target: "compute-miner",
    animated: true,
    type: "step",
    style: edgeStyles.miner,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "miner-to-ranking",
    source: "miner",
    target: "ranking-pallet",
    animated: true,
    type: "step",
    style: edgeStyles.miner,
    label: "registers",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "marketplace-to-ranking",
    source: "marketplace",
    target: "ranking-pallet",
    animated: true,
    type: "step",
    style: edgeStyles.funds,
    label: "60% of revenue",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "ranking-to-s3",
    source: "ranking-pallet",
    target: "s3-miner",
    animated: true,
    type: "step",
    style: edgeStyles.ranking,
    label: "60% of S3 revenue",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "ranking-to-arion",
    source: "ranking-pallet",
    target: "arion-miner",
    animated: true,
    type: "step",
    style: edgeStyles.ranking,
    label: "60% of Arion revenue",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "ranking-to-compute",
    source: "ranking-pallet",
    target: "compute-miner",
    animated: true,
    type: "step",
    style: edgeStyles.ranking,
    label: "60% of Compute revenue",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "ranking-to-rewards",
    source: "ranking-pallet",
    target: "rewards",
    animated: true,
    type: "step",
    style: edgeStyles.ranking,
    label: "distributes 60%",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "hippius-to-worker",
    source: "hippius-node",
    target: "worker",
    animated: true,
    type: "step",
    style: edgeStyles.validator,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "worker-to-s3",
    source: "worker",
    target: "s3-miner",
    animated: true,
    type: "step",
    style: edgeStyles.worker,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "worker-to-arion",
    source: "worker",
    target: "arion-miner",
    animated: true,
    type: "step",
    style: edgeStyles.worker,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "worker-to-compute",
    source: "worker",
    target: "compute-miner",
    animated: true,
    type: "step",
    style: edgeStyles.worker,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "s3-to-rewards",
    source: "s3-miner",
    target: "rewards",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "arion-to-rewards",
    source: "arion-miner",
    target: "rewards",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "compute-to-rewards",
    source: "compute-miner",
    target: "rewards",
    animated: false,
    type: "step",
    style: edgeStyles.solid,
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
    labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
    sourcePosition: "bottom",
    targetPosition: "top",
  },
  {
    id: "rewards-to-bridge",
    source: "rewards",
    target: "bridge",
    animated: true,
    type: "step",
    style: edgeStyles.funds,
    data: { label: "Alpha (bidirectional)" },
    sourcePosition: "top",
    targetPosition: "bottom",
    label: "Alpha can be bridged back",
    labelBgStyle: { fill: "rgba(30, 30, 30, 0.8)" },
    labelStyle: {
      fill: "#ffffff",
      fontWeight: "bold",
      fontFamily: "monospace",
    },
  },
];

export default function ArchitectureFlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const edgeTypes = {
    step: StepEdge,
    alphaFlow: AlphaFlowEdge,
  };

  const svgDefinitions = (
    <svg>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="5"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#fff" />
        </marker>
      </defs>
    </svg>
  );

  const onConnect = useCallback(
    (params) => {
      const isFundsConnection =
        (params.source === "client" && params.target === "dashboard") ||
        (params.source === "bittensor" && params.target === "bridge") ||
        (params.source === "bridge" &&
          params.target === "hippius-blockchain") ||
        (params.source === "rewards" && params.target === "bridge");

      const isBlockchainConnection =
        (params.source === "marketplace" &&
          params.target === "hippius-blockchain") ||
        (params.source === "hippius-blockchain" &&
          params.target === "validator") ||
        (params.source === "hippius-blockchain" && params.target === "miner");

      const isMinerConnection =
        (params.source === "miner" && params.target === "s3-miner") ||
        (params.source === "miner" && params.target === "arion-miner") ||
        (params.source === "miner" && params.target === "compute-miner");

      const isUIConnection =
        params.source === "dashboard" && params.target === "bridge";

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: isFundsConnection,
            type: isFundsConnection ? "alphaFlow" : "step",
            style: isFundsConnection
              ? edgeStyles.funds
              : isBlockchainConnection
              ? edgeStyles.highlighted
              : isMinerConnection
              ? edgeStyles.highlighted
              : isUIConnection
              ? edgeStyles.dashed
              : edgeStyles.dashed,
            data: isUIConnection ? { label: "UI for bridging" } : undefined,
            markerEnd: {
              type: "arrowhead",
              color: isFundsConnection
                ? "#4CAF50"
                : isBlockchainConnection
                ? "#FBBC05"
                : isMinerConnection
                ? "#FBBC05"
                : "#ffffff",
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
    instance.fitView(); // Auto-fit the view on initialization
  }, []);

  return (
    <div
      className="architecture-flow-diagram"
      style={{
        width: "100%",
        height: "800px",
        overflow: "auto",
        backgroundColor: "#000000",
        position: "relative",
        padding: 0,
        margin: 0,
      }}
    >
      {svgDefinitions}
      <ReactFlow
        style={{
          width: "100%",
          height: "100%",
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        edgeTypes={edgeTypes}
        fitView={true} // Enable auto-fit to fill the container
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }} // Centered and adjusted zoom
        attributionPosition="bottom-right"
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          style: edgeStyles.dashed,
          animated: false,
          type: "step",
          labelBgStyle: { fill: "rgba(30, 30, 30, 0.7)" },
          labelStyle: { fill: "#ffffff", fontFamily: "monospace" },
          labelBgPadding: [8, 4],
        }}
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap
          nodeStrokeColor={(n) => n.style?.background || "#fff"}
          nodeColor={(n) => n.style?.background || "#fff"}
          nodeBorderRadius={4}
          style={{
            bottom: 10,
            right: 10,
            background: "rgba(0, 0, 0, 0.7)",
            border: "none",
          }}
        />
        <Controls
          position="bottom-left"
          style={{
            bottom: 10,
            left: 10,
            background: "rgba(0, 0, 0, 0.7)",
            border: "none",
          }}
        />
        <Background
          variant="dots"
          gap={20}
          size={1}
          color="#555555"
          style={{ backgroundColor: "#000000" }}
        />
      </ReactFlow>
    </div>
  );
}
