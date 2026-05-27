import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { OSProvider } from './context/OSContext';
import { EcommerceProvider } from './context/EcommerceContext';
// @ts-ignore
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OSProvider>
      <EcommerceProvider>
        <App />
      </EcommerceProvider>
    </OSProvider>
  </StrictMode>,
);
