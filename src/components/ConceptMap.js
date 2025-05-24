import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
} from 'react-flow-renderer';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Marketingu' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Marketingu Mix' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Produkti' },
    position: { x: 0, y: 200 },
  },
  {
    id: '4',
    data: { label: 'Çmimi' },
    position: { x: 100, y: 200 },
  },
  {
    id: '5',
    data: { label: 'Promovimi' },
    position: { x: 200, y: 200 },
  },
  {
    id: '6',
    data: { label: 'Distribuimi' },
    position: { x: 300, y: 200 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e2-6', source: '2', target: '6' },
];

const ConceptMap = () => {
  const [nodes, setNodes] = useState(initialElements);
  const [edges, setEdges] = useState(initialEdges);
  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ height: 500, width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        deleteKeyCode={46}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default ConceptMap;