import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import { router } from './app/router';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './app/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const browserRouter = createBrowserRouter(router)


root.render(
  <Provider store={store}>
    <RouterProvider router={browserRouter} /> 
  </Provider>
);