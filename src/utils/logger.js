/**
 * Simple logger utility for the application
 */

// Check if we're in a Netlify environment
const isNetlify = typeof process !== 'undefined' && process.env.NETLIFY === 'true';

// Simple logger implementation
export const logger = {
  error: (message, data = {}) => {
    console.error(`[ERROR] ${message}`, data);
    
    // If running on Netlify, we could send logs to a Netlify function
    if (isNetlify && typeof window !== 'undefined') {
      try {
        fetch('/.netlify/functions/log', {
          method: 'POST',
          body: JSON.stringify({ message, level: 'error', data }),
        }).catch(err => console.error('Failed to send log to Netlify function', err));
      } catch (e) {
        // Silently fail if fetch fails
      }
    }
  },
  
  warn: (message, data = {}) => {
    console.warn(`[WARN] ${message}`, data);
  },
  
  info: (message, data = {}) => {
    console.info(`[INFO] ${message}`, data);
  },
  
  debug: (message, data = {}) => {
    console.debug(`[DEBUG] ${message}`, data);
  }
};

// Default export
export default logger;