import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/styles.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider position="top-right" zIndex={2077}>
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
