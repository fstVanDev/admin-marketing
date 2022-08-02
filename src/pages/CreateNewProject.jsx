import React, { useContext } from 'react'
import { TranscactionContext } from "../context/TransactionContext"
import { useStateContext } from "../context/ContextProvider";

const Input = ({ placeholder, name, type, value, handleChange }) => (
   <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
   />
);

const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;


const CreateNewProject = () => {
   const { currentColor, currentMode } = useStateContext();
   const { connectWallet, currentAccount, walletDisconnect } = useContext(TranscactionContext)

   return (
      <div>
         {
            currentAccount ? (
               <form className='w-80 mx-auto mt-9 rounded border-amber-50'>

                  <label className="text-white">Current Account</label >
                  <label
                     className=" text-white">
                     {currentAccount}
                  </label>

                  <br />
                  <br />
                  <label className="text-white">Enter your name</label >
                  <Input placeholder="Name" name="" type="text" handleChange={''} />
                  <label className="text-white">Enter your email</label>
                  <Input placeholder="Email" name="" type="text" handleChange={''} />
                  <br />
                  <br />
                  {/* Dropdown */}

                  <div class="inline-block relative w-64">
                     <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option>Choose</option>
                        <option>DApp</option>
                        <option>Exchange</option>
                     </select>
                  </div>
                  <br />
                  <br />
                  <button
                     type="button"
                     onClick={''}
                     className='flex flex-row justify-center items-center my-5 m-auto p-3 rounded-full cursor-pointer border-amber-50 bg-cyan-800 bg:hover '
                  >
                     <p className="text-white text-base font-semibold">
                        Submit
                     </p>
                  </button>

               </form >


            ) : (
               <p className='text-center w-80 mx-auto mt-9 text-white text-xl'>Please Connect Wallet</p>
            )}
      </div>
   )
}

export default CreateNewProject

