import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ProviderContext from './context/ProviderContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProviderContext>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ProviderContext>,
);
