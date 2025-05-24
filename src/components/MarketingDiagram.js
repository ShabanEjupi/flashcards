import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';

const MarketingDiagram = ({ type, data, title }) => {
  // Rendering different chart types based on the concept
  switch(type) {
    case 'pie':
      return <Pie data={data} options={{responsive: true, title: {text: title, display: true}}} />;
    case 'bar':
      return <Bar data={data} options={{responsive: true, title: {text: title, display: true}}} />;
    case 'line':
      return <Line data={data} options={{responsive: true, title: {text: title, display: true}}} />;
    default:
      return null;
  }
};

export default MarketingDiagram;