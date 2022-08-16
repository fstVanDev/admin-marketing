/* eslint-disable no-lone-blocks */
import React, { useContext, useState, Fragment } from "react";
import "./styles.css";
import { registerNewUser, registerNewProject } from "../context/RequestProvider";
import { Menu, Transition } from '@headlessui/react'
import { useStateContext } from "../context/ContextProvider";
import { StateContext } from '../context/StateProvider'
import avatar from "../data/avatar.jpg";

const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;


const UserProfile = () => {

   const { currentColor, setIsClicked, initialState } = useStateContext();

   const { userAccount, isUserRegistered, setIsUserRegistered,
      userEmail, setUserEmail,
      currentWallet, setCurrentWallet,
      projectName, setProjectName,
      tokenContract, setTokenContract,
      projectUrl, setProjectUrl,
      projectType, setProjectType,
   } = useContext(StateContext)

   const data = window.localStorage.getItem('allProjectsData')
   const userProjectsData = JSON.parse(data)

   const [isOpen, setIsOpen] = useState(false);

   function toggleModal() {
      setIsOpen(!isOpen);
   }

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
   }

   let registerUser = async (event) => {
      event.preventDefault();

      registerNewUser(userAccount, userEmail, setIsUserRegistered)
   }

   let createProject = async (event) => {
      event.preventDefault()

      registerNewProject(projectName, tokenContract, projectUrl, projectType, userAccount)
   }

   return (
      <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
         {isOpen ? (
            <>
               {userAccount && isUserRegistered ? (
                  <>
                     <div className="flex justify-end">
                        <button className="rounded-lg w-[34px] h-[34px] border-1 text-white hover:bg-main-dark-bg" onClick={() => setIsClicked(initialState)}>
                           X
                        </button>
                     </div>
                     <p className='font-semibold text-lg dark:text-gray-200'>Create Project</p>

                     <form className='w-[320px] mx-auto mt-5 rounded border-amber-50' onSubmit={createProject}>
                        <input
                           className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
                           type="text"
                           value={projectName}
                           placeholder="Project name"
                           onChange={(e) => setProjectName(e.target.value)}
                        />
                        <input
                           className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
                           type="text"
                           value={tokenContract}
                           placeholder="Contract"
                           onChange={(e) => setTokenContract(e.target.value)}
                        />
                        <input
                           className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
                           type="text"
                           value={projectUrl}
                           placeholder="Project URL"
                           onChange={(e) => setProjectUrl(e.target.value)}
                        />

                        {/* DropDown */}

                        <Menu as="div" className="relative inline-block text-left">
                           <div>
                              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                 {projectType ? projectType : 'Type of project'}
                              </Menu.Button>
                           </div>

                           <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                           >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                 <div className="py-1">
                                    <Menu.Item>
                                       {({ active }) => (
                                          <option
                                             value='DApp'
                                             className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                             )}
                                             onClick={(e) => setProjectType(e.target.value)}
                                          >
                                             DApp
                                          </option>
                                       )}
                                    </Menu.Item>
                                    <Menu.Item>
                                       {({ active }) => (
                                          <option
                                             value='Exchange'
                                             className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                             )}
                                             onClick={(e) => setProjectType(e.target.value)}

                                          >
                                             Exchange
                                          </option>
                                       )}
                                    </Menu.Item>
                                    <Menu.Item>
                                       {({ active }) => (
                                          <option
                                             value='Gaming'
                                             className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                             )}
                                             onClick={(e) => setProjectType(e.target.value)}

                                          >
                                             Gaming
                                          </option>
                                       )}
                                    </Menu.Item>
                                 </div>
                              </Menu.Items>
                           </Transition>
                        </Menu>
                        <button
                           className='text-xl text-white rounded-lg mt-5 p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray'
                           type="submit"
                        >
                           Create
                        </button>

                     </form>
                  </>
               ) : (
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
               )}

            </>
         ) : (
            <>
               <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
                  <button className="rounded-lg w-[34px] h-[34px] border-1 text-white hover:bg-main-dark-bg" onClick={() => setIsClicked(initialState)}>
                     X
                  </button>
               </div>
               <div className="flex gap-5 items-center mt-6 border-color pb-6">
                  <img
                     className="rounded-full h-24 w-24"
                     src={avatar}
                     alt="user-profile"
                  />
                  <div>
                     <div className="font-semibold text-lg dark:text-gray-200">
                        <p>Account address: </p>
                        {userAccount ?
                           <p className="text-white font-light text-base">
                              {shortenAddress(userAccount)}
                           </p>
                           :
                           <p className="text-white font-light text-base">
                              Address
                           </p>
                        }
                     </div>
                  </div>
               </div>

               {userAccount ? (
                  <>
                     {isUserRegistered ? (
                        <>
                           <div className="flex gap-5 border-b-1 border-color rounded-lg border-1 p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
                              <button
                                 type="button"
                                 className="text-xl text-white rounded-lg p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray"
                                 onClick={() => toggleModal()}
                              >
                                 <p> Create new project </p>
                              </button>
                           </div>

                           {userProjectsData ? (
                              <>
                                 {userProjectsData.map((item) => (
                                    <div
                                       key={item.project_id}
                                       className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
                                    >
                                       <button
                                          type="button"
                                          className=" text-xl text-white rounded-lg p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray"
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
                        <div className="column border-b-1 border-color rounded-lg border-1 p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
                           <p className="text-white mb-[10px] font-light text-base">No registered users with that address</p>
                           <button
                              type="button"
                              className=" text-xl text-white rounded-lg p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray"
                              onClick={() => toggleModal()}
                           >
                              <p>Sign up</p>
                           </button>
                        </div>
                     )}
                  </>
               ) : (
                  <p className="text-base dark:text-gray-200">To see your projects please connect wallet</p>
               )}

            </>
         )}
      </div >
   );
}



export default UserProfile;



