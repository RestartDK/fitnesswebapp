import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
