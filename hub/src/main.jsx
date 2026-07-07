import React from 'react';
import { createRoot } from 'react-dom/client';
import '@carbon-labs/mdx-components/scss/index.scss';
import './global.scss';
import './styles.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
