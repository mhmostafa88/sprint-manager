import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StoriesListContextProvider from './context/StoriesListContext';

ReactDOM.render(
  <React.StrictMode>
  <StoriesListContextProvider>
    <App />
    </StoriesListContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


