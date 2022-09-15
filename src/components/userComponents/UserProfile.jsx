import React, { useContext, useState, useEffect, useRef } from "react";
import { StateContext } from "../../context/StateProvider";
import RegisterNewUser from "./RegisterNewUser";
import CreateNewProject from "./CreateNewProject";
import Modal from "../Modal";
import { NavLink } from "react-router-dom";
import { getCurrentProject, getDataSnapshot, getCurrentDate } from "../../context/RequestProvider";


const UserProfile = () => {
   const {
      userAccount, isUserRegistered,
      currentUserProject, setCurrentUserProject,
      setDataSnapshot, setGeneralData,
      isOpen, setViewCreate
   } = useContext(StateContext)



   const clickOnProject = async (value) => {
      console.log(currentUserProject)
      await getCurrentProject(value, 0, setGeneralData)

      await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 0), getCurrentDate(new Date(), 1))
   }

   const bindValueToClick = (value) => {
      return function () { clickOnProject(value) };
   }

   const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;

   const data = window.localStorage.getItem('allProjectsData')
   const userProjectsData = JSON.parse(data)

   return (
      <>
         {isOpen === true ? (
            <div className='nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-5 mt-1 rounded-lg w-[300px]'>
               <div className="flex gap-5 items-center mt-3 border-color pb-6">
                  <div className="font-semibold text-lg dark:text-gray-200">
                     <p> Address</p>
                     <p> {userAccount ? shortenAddress(userAccount) : 'Wallet address'} </p>
                  </div>
               </div>
               {userAccount ? (
                  <>
                     {isUserRegistered ? (
                        <>
                           <div className="flex gap-5 border-b-1 border-color rounded-lg border-1 p-1 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
                              <button
                                 type="button"
                                 className="text-base text-white rounded-lg p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray"
                                 onClick={() =>
                                    setViewCreate(true)
                                 }
                              >
                                 <p> Create new project </p>
                              </button>
                           </div>

                           {userProjectsData ? (
                              <>
                                 {userProjectsData.map((item, index) => (
                                    <NavLink
                                       to={`${((item.project_name).toLowerCase()).replace(/\s/g, '')}`}
                                       key={item.project_id}
                                       onClick={bindValueToClick(index)}
                                       className="flex gap-5 border-b-1 border-color p-2 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
                                    >
                                       <button
                                          type="button"
                                          className=" text-base text-white rounded-lg p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray"
                                       >
                                          <p> {item.project_name}</p>
                                       </button>
                                    </NavLink>))}
                              </>
                           ) : (
                              null
                           )}
                        </>
                     ) : (
                        <div className="column border-b-1 border-color rounded-lg border-1 p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
                           <p className="text-white mb-[10px] font-light text-base">No registered users with that address</p>
                           <button
                              type="button"
                              className=" text-xl text-white rounded-lg p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray"
                              onClick={''}
                           >
                              <p>Sign up</p>
                           </button>
                        </div>
                     )}
                  </>
               ) : (
                  <p className="text-base dark:text-gray-200">To see your projects please connect wallet</p>
               )}
            </div>
         ) : (null)}

      </>
   )
}

export default UserProfile