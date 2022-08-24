import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { ContextProvider } from './context/ContextProvider';
import { TransactionProvider } from './context/TransactionProvidert'
import { StateProvider } from './context/StateProvider'
import { LocalProvider } from './context/LocalProvider'


ReactDOM.render(
   <React.StrictMode>
      <StateProvider>
         <LocalProvider>
            <TransactionProvider>
               <ContextProvider>
                  <App />
               </ContextProvider>
            </TransactionProvider>
         </LocalProvider>
      </StateProvider >
   </React.StrictMode>,
   document.getElementById('root'),
);
