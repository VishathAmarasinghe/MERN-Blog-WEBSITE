import React from 'react';
import ReactDOM from 'react-dom/client';
import App2 from './app2';
import { Context, ContextProvider } from './context/Context';
import Intro from './pages/intropage/intro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <ContextProvider>
      <App2/>
     
    </ContextProvider>

  </React.StrictMode>
);


