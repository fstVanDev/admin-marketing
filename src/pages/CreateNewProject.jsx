import React, { useContext, useState } from 'react'
import { TranscactionContext } from "../context/TransactionContext"
import { useStateContext } from "../context/ContextProvider";
import { postData } from '../db/ReqisterRequest';
import axios from 'axios';
import { columnSelectionComplete } from '@syncfusion/ej2-react-grids';
const qs = require('qs')


// const Input = ({ placeholder, name, type, value, handleChange }) => (
//    <input
//       placeholder={placeholder}
//       type={type}
//       step="0.0001"
//       value={value}
//       className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
//    />
// );

const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;


const CreateNewProject = () => {
   // const { currentColor, currentMode } = useStateContext();
   // const { connectWallet, currentAccount, walletDisconnect, isRegistered } = useContext(TranscactionContext)
   // const { inputValue, setInputValue } = useState('')
   // const { email, setEmail } = useState('');


   // let handleSubmit = async (event) => {
   //    event.preventDefault();
   //    console.log(email)
   //    console.log(event)

   //    try {
   //       var data = qs.stringify({
   //          'wallet_address': currentAccount,
   //          'email': email
   //       });
   //       console.log(data)


   //       var config = {
   //          method: 'post',
   //          baseURL: 'https://wallettreatment.herokuapp.com/send',
   //          headers: {
   //             'Content-Type': 'application/x-www-form-urlencoded'
   //          },
   //          data: data
   //       };

   //       axios(config)
   //          .then(response => {
   //             console.log(response)
   //             console.log('Отправка')
   //          })
   //          .catch(error => {
   //             console.log(error)
   //          })
   //    } catch (err) {
   //       console.log(err);
   //    }
   // };
   // return (
   //    <div>
   //       {isRegistered.length > 0 ? (<p>Create new project</p>) : (
   //          <form className='w-[400px] mx-auto mt-9 rounded border-amber-50' onSubmit={handleSubmit}>

   //             <label className="text-white">Current Account</label >

   //             <Input placeholder="Current Account" type="text" value={currentAccount} disabled="true" />

   //             <br />
   //             <br />
   //             <label className="text-white">Enter your email</label>
   //             <Input placeholder="Email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
   //             <br />
   //             <br />

   //             <br />
   //             <br />
   //             <button
   //                type="submit"
   //                className='flex flex-row justify-center items-center my-5 m-auto p-3 rounded-full cursor-pointer border-amber-50 bg-cyan-800 bg:hover '
   //             >
   //                <p className="text-white text-base font-semibold">
   //                   Submit
   //                </p>
   //             </button>
   //          </form >


   //       )}
   //    </div>
   // )
   const [email, setEmail] = useState("");
   const [currentWallet, setCurrentWallet] = useState("");

   const { connectWallet, currentAccount, walletDisconnect, isRegistered } = useContext(TranscactionContext)


   let handleSubmit = async (event) => {
      event.preventDefault();
      // console.log(email)
      // console.log(event)

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
               console.log(response)
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
      <>
         {isRegistered.length > 0 ? (<p>Create new project</p>) : (
            <form className='w-[400px] mx-auto mt-9 rounded border-amber-50' onSubmit={handleSubmit}>
               <input
                  type="text"
                  value={currentAccount}
                  placeholder="Name"
                  onChange={(e) => setCurrentWallet(e.target.value)}
               />
               <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
               />

               <button className='flex flex-row justify-center items-center my-5 m-auto p-3 rounded-full cursor-pointer border-amber-50 bg-cyan-800 bg:hover' type="submit">Create</button>
            </form>
         )
         }
      </>
   );
}

export default CreateNewProject

