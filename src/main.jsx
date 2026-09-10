import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SiteProvider } from './context/SiteContext';
import { ConsultProvider } from './context/ConsultContext';
import App from './App';
import './styles/index.css';
import './styles/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SiteProvider>
          <ConsultProvider>
            <App />
          </ConsultProvider>
        </SiteProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
