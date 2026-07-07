import React from 'react';
import { createRoot } from 'react-dom/client';
// NOTE: @platform/ui-components has been removed — this example is self-contained.
// carbon.scss and styles.scss were provided by that monorepo package; their
// equivalent styles are now loaded directly from the local src/ files below.
import '@carbon-labs/mdx-components/scss/index.scss';
import './global.scss';
import './styles.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
