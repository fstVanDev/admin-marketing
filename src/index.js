import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { ContextProvider } from './context/ContextProvider';
import { TransactionProvider } from './context/TransactionProvidert'
import { StateProvider } from './context/StateProvider'
import { LocalProvider } from './context/LocalProvider'


ReactDOM.render(
   <StateProvider>
      <LocalProvider>

         <TransactionProvider>
            <React.StrictMode>
               <ContextProvider>
                  <App />
               </ContextProvider>
            </React.StrictMode>
         </TransactionProvider>
      </LocalProvider>

   </StateProvider >,
   document.getElementById('root'),
);
