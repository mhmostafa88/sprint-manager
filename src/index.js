import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StoriesListContextProvider from './context/StoriesListContext';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <StoriesListContextProvider>
    <App />
    </StoriesListContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


