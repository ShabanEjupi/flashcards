import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const MatrixVisualization = ({ matrix, vectors, type = 'transformation' }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if exists
      if (chartInstance) {
        chartInstance.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      
      if (type === 'transformation') {
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
                label: 'Vektorët Origjinalë',
                data: vectors.map(v => ({ x: v[0], y: v[1] })),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                pointRadius: 6
              },
              {
                label: 'Vektorët e Transformuar',
                data: transformedVectors.map(v => ({ x: v[0], y: v[1] })),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                pointRadius: 6
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              x: {
                type: 'linear',
                position: 'center',
                min: -5,
                max: 5,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                  zeroLineColor: 'rgba(0, 0, 0, 0.25)'
                }
              },
              y: {
                type: 'linear',
                position: 'center',
                min: -5,
                max: 5,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                  zeroLineColor: 'rgba(0, 0, 0, 0.25)'
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `(${context.parsed.x.toFixed(2)}, ${context.parsed.y.toFixed(2)})`;
                  }
                }
              }
            }
          }
        });
        
        setChartInstance(chart);
      } else if (type === 'stochastic') {
        // Markov chain visualization
        const timeSteps = 5;
        const labels = [];
        const datasets = [];
        
        // Initialize with provided state vector
        let currentState = [...vectors[0]];
        const states = [currentState];
        
        // Generate future states
        for (let t = 1; t <= timeSteps; t++) {
          const nextState = [];
          for (let i = 0; i < currentState.length; i++) {
            let sum = 0;
            for (let j = 0; j < currentState.length; j++) {
              sum += matrix[i][j] * currentState[j];
            }
            nextState.push(sum);
          }
          states.push(nextState);
          currentState = nextState;
        }
        
        // Create labels
        for (let t = 0; t <= timeSteps; t++) {
          labels.push(`Koha ${t}`);
        }
        
        // Create datasets
        for (let i = 0; i < states[0].length; i++) {
          datasets.push({
            label: `Gjendja ${i+1}`,
            data: states.map(state => state[i]),
            borderColor: i === 0 ? 'rgba(255, 99, 132, 1)' : 
                         i === 1 ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            tension: 0.1
          });
        }
        
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: Math.max(...states.flat()) * 1.1
              }
            }
          }
        });
        
        setChartInstance(chart);
      } else if (type === 'leontief') {
        // Visualization for Leontief model
        const sectors = ['Sektori A', 'Sektori B', 'Sektori C'];
        const directRequirements = matrix;
        
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: sectors,
            datasets: sectors.map((sector, index) => ({
              label: `Kërkesat për ${sector}`,
              data: directRequirements.map(row => row[index]),
              backgroundColor: index === 0 ? 'rgba(255, 99, 132, 0.6)' : 
                              index === 1 ? 'rgba(54, 162, 235, 0.6)' : 'rgba(75, 192, 192, 0.6)',
            }))
          },
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: false,
              },
              y: {
                stacked: false,
                beginAtZero: true,
                max: 1
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
                  }
                }
              }
            }
          }
        });
        
        setChartInstance(chart);
      }
      
      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, [matrix, vectors, type]);
  
  return (
    <div className="math-visualization">
      <canvas ref={chartRef} width="600" height="400"></canvas>
    </div>
  );
};

export default MatrixVisualization;