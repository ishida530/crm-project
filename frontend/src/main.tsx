import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import QueryClientProvider from './providers/QueryClientProvider';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import App from './App';
import ReactRouterProvider from './providers/RouterProvider';
import { AuthProvider } from './features/auth/AuthProvier';


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function (registration) {
    console.log('Service Worker zarejestrowany pomyślnie: ', registration);
  }).catch(function (error) {
    console.error('Rejestracja Service Workera nie powiodła się: ', error);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider>
      <ThemeProvider>
        <AuthProvider>


          <ReactRouterProvider>

            <App />
          </ReactRouterProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
