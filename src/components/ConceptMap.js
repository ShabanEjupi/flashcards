import React, { useState, useCallback, useEffect } from 'react';
import { logger } from '../utils/logger';

// Use ReactFlow dynamically to avoid SSR issues
const ReactFlow = React.lazy(() => import('reactflow').then(module => ({ 
  default: module.default,
  Background: module.Background,
  Controls: module.Controls,
  MiniMap: module.MiniMap 
})));

// Nyjët themelore
const marketingBasics = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Marketingu' },
    position: { x: 250, y: 0 },
  },
  // Marketing Mix - 4P
  {
    id: '2',
    data: { label: 'Marketingu Mix (4P)' },
    position: { x: 250, y: 80 },
  },
  {
    id: '3',
    data: { label: 'Produkti' },
    position: { x: 100, y: 180 },
  },
  {
    id: '4',
    data: { label: 'Çmimi' },
    position: { x: 200, y: 180 },
  },
  {
    id: '5',
    data: { label: 'Promovimi' },
    position: { x: 300, y: 180 },
  },
  {
    id: '6',
    data: { label: 'Distribuimi' },
    position: { x: 400, y: 180 },
  },
];

// Nyjet për segmentimin
const segmentationNodes = [
  {
    id: '7',
    data: { label: 'Segmentimi i Tregut' },
    position: { x: 0, y: 80 },
  },
  {
    id: '8',
    data: { label: 'Variablat Demografike' },
    position: { x: -150, y: 160 },
  },
  {
    id: '9',
    data: { label: 'Variablat Gjeografike' },
    position: { x: -50, y: 160 },
  },
  {
    id: '10',
    data: { label: 'Variablat Psikologjike' },
    position: { x: 50, y: 160 },
  },
  {
    id: '11',
    data: { label: 'Variablat Bihevioristike' },
    position: { x: 150, y: 160 },
  },
];

// Nyjet për strategjitë
const strategyNodes = [
  {
    id: '12',
    data: { label: 'Strategjitë e Marketingut' },
    position: { x: 500, y: 80 },
  },
  {
    id: '13',
    data: { label: 'Marketing i Padiferencuar' },
    position: { x: 450, y: 160 },
  },
  {
    id: '14',
    data: { label: 'Marketing i Diferencuar' },
    position: { x: 550, y: 160 },
  },
  {
    id: '15',
    data: { label: 'Marketing i Koncentruar' },
    position: { x: 650, y: 160 },
  },
];

// Matricat dhe modelet
const matrixNodes = [
  {
    id: '16',
    data: { label: 'Matrica e Ansoffit' },
    position: { x: 250, y: 280 },
  },
  {
    id: '17',
    data: { label: 'Pushtimi i Tregut (PE→TE)' },
    position: { x: 150, y: 350 },
  },
  {
    id: '18',
    data: { label: 'Zhvillimi i Tregut (PE→TR)' },
    position: { x: 300, y: 350 },
  },
  {
    id: '19',
    data: { label: 'Zhvillimi i Produktit (PR→TE)' },
    position: { x: 150, y: 420 },
  },
  {
    id: '20',
    data: { label: 'Diversifikimi (PR→TR)' },
    position: { x: 300, y: 420 },
  },
];

// Nyjet për konceptet e avancuara
const advancedNodes = [
  {
    id: '21',
    data: { label: 'Koncepti i Marketingut Holistik' },
    position: { x: 500, y: 280 },
  },
  {
    id: '22',
    data: { label: 'Marketingu i Marrëdhënieve' },
    position: { x: 400, y: 350 },
  },
  {
    id: '23',
    data: { label: 'Marketingu i Integruar' },
    position: { x: 550, y: 350 },
  },
  {
    id: '24',
    data: { label: 'Marketingu i Brendshëm' },
    position: { x: 400, y: 420 },
  },
  {
    id: '25',
    data: { label: 'Marketingu Përgjegjës Social' },
    position: { x: 550, y: 420 },
  },
];

// Kombino të gjitha nyjet
const initialElements = [
  ...marketingBasics,
  ...segmentationNodes,
  ...strategyNodes,
  ...matrixNodes,
  ...advancedNodes
];

// Lidhje bazike të marketingut
const basicEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e2-6', source: '2', target: '6' },
];

// Lidhje të segmentimit
const segmentationEdges = [
  { id: 'e1-7', source: '1', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e7-9', source: '7', target: '9' },
  { id: 'e7-10', source: '7', target: '10' },
  { id: 'e7-11', source: '7', target: '11' },
];

// Lidhje të strategjive
const strategyEdges = [
  { id: 'e1-12', source: '1', target: '12' },
  { id: 'e12-13', source: '12', target: '13' },
  { id: 'e12-14', source: '12', target: '14' },
  { id: 'e12-15', source: '12', target: '15' },
];

// Lidhje të matricave
const matrixEdges = [
  { id: 'e1-16', source: '1', target: '16' },
  { id: 'e16-17', source: '16', target: '17' },
  { id: 'e16-18', source: '16', target: '18' },
  { id: 'e16-19', source: '16', target: '19' },
  { id: 'e16-20', source: '16', target: '20' },
];

// Lidhje të koncepteve të avancuara
const advancedEdges = [
  { id: 'e1-21', source: '1', target: '21' },
  { id: 'e21-22', source: '21', target: '22' },
  { id: 'e21-23', source: '21', target: '23' },
  { id: 'e21-24', source: '21', target: '24' },
  { id: 'e21-25', source: '21', target: '25' },
];

// Kombino të gjitha lidhjet
const initialEdges = [
  ...basicEdges,
  ...segmentationEdges,
  ...strategyEdges,
  ...matrixEdges,
  ...advancedEdges
];

const ConceptMap = () => {
  const [nodes, setNodes] = useState(initialElements);
  const [edges, setEdges] = useState(initialEdges);
  
  // Add error handling for ReactFlow loading
  const [loadError, setLoadError] = useState(null);
  
  useEffect(() => {
    try {
      // Any initialization code
    } catch (error) {
      logger.error('ConceptMap initialization failed', { error: error.message });
      setLoadError(error.message);
    }
  }, []);
  
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

  if (loadError) {
    return <div className="error-message">Could not load concept map: {loadError}</div>;
  }
  
  return (
    <div style={{ height: 650, width: '100%' }}>
      <div className="concept-map-instructions">
        <p>Tërhiq konceptet për t'i riorganizuar.</p>
      </div>
      <React.Suspense 
        fallback={<div>Loading concept map...</div>}
        onError={(error) => {
          logger.error('ReactFlow failed to load', { error: error.message });
          return <div>Failed to load concept map.</div>;
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          deleteKeyCode={46}
          snapToGrid={true}
          snapGrid={[15, 15]}
          defaultZoom={0.6}
          minZoom={0.2}
          maxZoom={1.5}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </React.Suspense>
    </div>
  );
};

export default ConceptMap;