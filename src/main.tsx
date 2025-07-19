import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize EmailJS if needed
import emailjs from '@emailjs/browser';
emailjs.init('8mOLujPLrD-ZTCtkE'); // Public key for general use

// Create a function to preload critical assets
const preloadCriticalAssets = () => {
  // Preload logo
  const logoPreload = document.createElement('link');
  logoPreload.rel = 'preload';
  logoPreload.as = 'image';
  logoPreload.href = '/logo.png';
  document.head.appendChild(logoPreload);
  
  // Preload critical fonts if needed
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.as = 'font';
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontPreload.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreload);
};

// Preload critical assets
preloadCriticalAssets();

// Create root and render app
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}