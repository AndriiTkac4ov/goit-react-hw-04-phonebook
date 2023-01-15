import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from 'components/App/App';
import AppByHooks from 'components/App/AppByHooks';
import './index.css';
import { theme } from './constants/theme';
import { ThemeProvider } from 'styled-components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <App /> */}
      <AppByHooks />
    </ThemeProvider>
  </React.StrictMode>
);
