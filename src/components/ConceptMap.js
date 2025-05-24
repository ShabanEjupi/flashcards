import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  addEdge,
  removeElements
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
  // Connections
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e2-6', source: '2', target: '6' },
];

const ConceptMap = () => {
  const [elements, setElements] = React.useState(initialElements);
  
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };
  
  const onConnect = (params) => {
    setElements((els) => addEdge(params, els));
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
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