import React, { useContext } from 'react'
import { registerNewUser } from '../context/RequestProvider'
import { StateContext } from '../context/StateProvider'
import { useStateContext } from "../context/ContextProvider";



const RegisterUser = () => {

   const { userAccount, setUserEmail, userEmail, setCurrentWallet, setIsUserRegistered } = useContext(StateContext)
   const { setIsClicked, initialState } = useStateContext();

   let registerUser = async (event) => {
      event.preventDefault();

      registerNewUser(userAccount, userEmail, setIsUserRegistered)
   } 

   
 
   return (
      <>
         <div className="flex justify-end">
            <button className="rounded-lg w-[34px] h-[34px] border-1 text-white hover:bg-main-dark-bg" onClick={() => setIsClicked(initialState)}>
               X
            </button>
         </div>
         <form className='w-[320px] mx-auto mt-9 rounded border-amber-50' onSubmit={registerUser}>
            <input
               className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
               type="text"
               value={userAccount}
               placeholder="Name"
               onChange={(e) => setCurrentWallet(e.target.value)}
            />
            <input
               className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
               type="text"
               value={userEmail}
               placeholder="Email"
               onChange={(e) => setUserEmail(e.target.value)}
            />

            <button
               className='text-xl mt-5 text-white rounded-lg p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray'
               type="submit"
            >
               Create
            </button>
         </form>
      </>
   )
}


export default RegisterUser