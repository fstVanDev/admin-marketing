import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './context/ContextProvider';
import { TransactionProvider } from './context/TransactionContext'


ReactDOM.render(
   <TransactionProvider>
      <React.StrictMode>
         <ContextProvider>
            <App />
         </ContextProvider>
      </React.StrictMode>
   </TransactionProvider>,
   document.getElementById('root'),
);
