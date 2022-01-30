import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalContextProvider from './context/GlobalContext';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <GlobalContextProvider>
    <App />
    </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


