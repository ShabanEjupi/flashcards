import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import './assets/styles/main.css';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);