import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { logger } from '../utils/logger';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const MarketingDiagram = ({ type, data, title }) => {
  const [renderError, setRenderError] = useState(null);
  
  useEffect(() => {
    try {
      // Chart.js registration or initialization if needed
      ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);
    } catch (error) {
      logger.error('Chart initialization failed', { error: error.message, chartType: type });
      setRenderError(error.message);
    }
  }, [type]);
  
  if (renderError) {
    return <div className="chart-error">Could not render chart: {renderError}</div>;
  }
  
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title
      }
    },
    onError: (err) => {
      logger.error('Chart rendering error', { error: err.message });
    }
  };

  try {
    // Rendering different chart types based on the concept
    switch(type) {
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      default:
        return null;
    }
  } catch (error) {
    logger.error('Failed to render chart', { error: error.message, chartType: type });
    return <div>Could not display chart.</div>;
  }
};

export default MarketingDiagram;