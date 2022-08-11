import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './context/ContextProvider';
import { TransactionProvider } from './context/TransactionContext'
import { StateProvider } from './context/StateProvider'


ReactDOM.render(
   <StateProvider>
      <TransactionProvider>
         <React.StrictMode>
            <ContextProvider>
               <App />
            </ContextProvider>
         </React.StrictMode>
      </TransactionProvider>
   </StateProvider>,
   document.getElementById('root'),
);
