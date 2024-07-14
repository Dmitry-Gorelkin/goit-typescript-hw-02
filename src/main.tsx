import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme.js';
import { GlobalStyle } from './style/GlobalStyle.js';
import { Toaster } from 'react-hot-toast';
import { App } from './components/App.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
