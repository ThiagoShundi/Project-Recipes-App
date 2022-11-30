import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppProvider from './context/AppProvider';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>,
  );

serviceWorker.unregister();
