import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MatrixVisualization = ({ matrix, vectors }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Apply matrix transformation to vectors
      const transformedVectors = vectors.map(v => [
        matrix[0][0] * v[0] + matrix[0][1] * v[1],
        matrix[1][0] * v[0] + matrix[1][1] * v[1]
      ]);
      
      // Create scatter plot
      const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Original Vectors',
              data: vectors.map(v => ({ x: v[0], y: v[1] })),
              backgroundColor: 'blue',
              pointRadius: 5
            },
            {
              label: 'Transformed Vectors',
              data: transformedVectors.map(v => ({ x: v[0], y: v[1] })),
              backgroundColor: 'red',
              pointRadius: 5
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'center',
              min: -5,
              max: 5
            },
            y: {
              type: 'linear',
              position: 'center',
              min: -5,
              max: 5
            }
          }
        }
      });
      
      return () => chart.destroy();
    }
  }, [matrix, vectors]);
  
  return (
    <div className="math-visualization">
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default MatrixVisualization;