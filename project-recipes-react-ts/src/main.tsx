import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MainGlobalProvider from './context/MainGlobalProvider';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <MainGlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainGlobalProvider>,
  );
