import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css'; // Boots up Tailwind configuration and canvas layout rules

// Grabs the standard target anchor node from your public/index.html file
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    "[GAME MODULE ERROR] Critical initialization failure: Failed to identify a valid target DOM element (#root) to anchor the WebGL Canvas engine wrapper framework."
  );
}

// Mount and initialize the unified application pipeline
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
