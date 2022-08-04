import React, { useContext, useState } from 'react'
import { TranscactionContext } from "../context/TransactionContext"
import { useStateContext } from "../context/ContextProvider";
import CreateNewProject from './CreateNewProject';
import axios from 'axios';
const qs = require('qs')


const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;


const RegisterNewUser = () => {

   const [email, setEmail] = useState("");
   const [currentWallet, setCurrentWallet] = useState("");

   const { connectWallet, currentAccount, walletDisconnect, isRegistered } = useContext(TranscactionContext)


   let handleSubmit = async (event) => {
      event.preventDefault();

      try {
         var data = qs.stringify({
            'wallet_address': currentAccount,
            'email': email
         });
         console.log(data)


         var config = {
            method: 'post',
            baseURL: 'https://wallettreatment.herokuapp.com/send',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
         };

         axios(config)
            .then(response => {
               console.log(response, 'responseeeeee')
               console.log('Отправка')
            })
            .catch(error => {
               console.log(error)
            })
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div>
         {currentAccount === '' ? (
            <p>Please connect your wallet</p>
         ) : (
            <div>
               {isRegistered === 201 ?
                  (<CreateNewProject />) : (
                     <form className='w-[400px] mx-auto mt-9 rounded border-amber-50' onSubmit={handleSubmit}>
                        <input
                           className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
                           type="text"
                           value={currentAccount}
                           placeholder="Name"
                           onChange={(e) => setCurrentWallet(e.target.value)}
                        />
                        <input
                           className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
                           type="text"
                           value={email}
                           placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)}
                        />

                        <button className='flex flex-row justify-center items-center my-5 m-auto p-3 rounded-full cursor-pointer border-amber-50 bg-cyan-800 bg:hover' type="submit">Create</button>
                     </form>)
               }
            </div>
         )
         }
      </div>
   );
}

export default RegisterNewUser

