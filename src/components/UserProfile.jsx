/* eslint-disable no-lone-blocks */
import React, { useContext, useState, useEffect, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import { StateContext } from '../context/StateProvider'
import RegisterUser from "./RegisterUser";
import CreateNewUserProject from "./CreateNewUserProject";
import avatar from "../data/avatar.jpg";
import { NavLink } from 'react-router-dom'
import { getCurrentProject, getDataSnapshot } from "../context/RequestProvider";

const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;


const UserProfile = () => {
   const ref = useRef()
   const { setIsClicked, initialState } = useStateContext();

   const { userAccount, isUserRegistered,
      currentUserProject, setCurrentUserProject, setDataSnapshot, setGeneralData
   } = useContext(StateContext)

   const data = window.localStorage.getItem('allProjectsData')
   const userProjectsData = JSON.parse(data)

   const [isOpen, setIsOpen] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false)

   function toggleModal() {
      setIsOpen(!isOpen);
   }

  


   const bindValueToClick = (value) => {
      return function () { onClicks(value) };
   }

   const onClicks = (value) => {
      setCurrentUserProject(value)

      getCurrentProject(value, setGeneralData, currentUserProject, setDataSnapshot)
      // justWatch(currentUserProject, setGeneralData)
      getDataSnapshot(value, setDataSnapshot)
   }

   function useOutsideAlerter(ref) {
      useEffect(() => {
         /**
          * Alert if clicked on outside of element
          */
         function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               setIsClicked(initialState)
            }
         }
         // Bind the event listener
         document.addEventListener("mousedown", handleClickOutside);
         return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref]);
   }

   function OutsideAlerter(props) {
      const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);

      return <div ref={wrapperRef}>{props.children}</div>;
   }


   useEffect(() => {
      const checkIfClickedOutside = e => {
         if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
            setIsMenuOpen(false)
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [isMenuOpen])

   return (
      <OutsideAlerter >
         <div className={"nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-[440px]"} >
            { isOpen ? (
               <>
                  {userAccount && isUserRegistered ? (
                     // create new user project
                     <CreateNewUserProject />
                  ) : (
                     // register new user 
                     <RegisterUser />
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
                     {/* <img
                        className="rounded-full h-24 w-24"
                        src={avatar}
                        alt="user-profile"
                     /> */}
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
                                    {userProjectsData.map((item, index) => (
                                       <NavLink
                                          to={`${((item.project_name).toLowerCase()).replace(/\s/g, '')}`}
                                          key={item.project_id}
                                          onClick={bindValueToClick(index)}
                                          className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
                                       >
                                          <button
                                             type="button"
                                             className=" text-xl text-white rounded-lg p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray"
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
      </OutsideAlerter>
   );
}



export default UserProfile;



