/* eslint-disable no-lone-blocks */
import React, { useContext } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { useStateContext } from "../context/ContextProvider";
import { TranscactionContext } from "../context/TransactionProvidert";
import { StateContext } from '../context/StateProvider'
import { NavLink } from "react-router-dom";

import avatar from "../data/avatar.jpg";

const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;


const UserProfile = () => {
   const { currentColor } = useStateContext();
   const { userAccount } = useContext(StateContext)
   const { connectWallet, disconnectWallet } = useContext(TranscactionContext)

   const data = window.localStorage.getItem('allProjectsData')
   const userProjectsData = JSON.parse(data)


   return (
      <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
         <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
            <Button
               icon={<MdOutlineCancel />}
               color="rgb(153, 171, 180)"
               bgHoverColor="light-gray"
               size="2xl"
               borderRadius="50%"
            />
         </div>
         <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            <img
               className="rounded-full h-24 w-24"
               src={avatar}
               alt="user-profile"
            />
            <div>
               <div className="font-semibold text-xl dark:text-gray-200">
                  {userAccount ?
                     <p className="text-white font-light text-sm">
                        {shortenAddress(userAccount)}
                     </p>
                     :
                     <p className="text-white font-light text-sm">
                        Address
                     </p>
                  }
               </div>
            </div>
         </div>
         <div>
            {userAccount ? (
               <>
                  {userProjectsData ? (
                     <>
                        {userProjectsData.map((item) => (
                           <div
                              key={item.project_id}
                              className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
                           >
                              <button
                                 type="button"
                                 className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                              >
                                 <p> {item.project_name}</p>
                              </button>
                           </div>))}
                     </>
                  ) : (
                     null
                  )}
               </>
            ) : (
               <p>To see your projects please connect wallet</p>
            )}



         </div>
         <div className="mt-5">
            <button
               className={userAccount ? ("hover:drop-shadow-xl hover:bg-red-700 h-9 w-full text-lg text-white rounded-lg bg-red-500") : ("hover:drop-shadow-xl hover:bg-green-700 w-full text-lg h-9 rounded-lg bg-green-500 text-white")}
               onClick={userAccount ? disconnectWallet : connectWallet}
            >
               {userAccount ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
         </div>
      </div >
   );
};

export default UserProfile;



