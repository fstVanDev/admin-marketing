import React, { useContext, useState, useEffect, useRef } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { StateContext } from "../../context/StateProvider";
import RegisterNewUser from "./RegisterNewUser";
import CreateNewProject from "./CreateNewProject";
import { NavLink } from "react-router-dom";
import { getCurrentProject, getDataSnapshot, getCurrentDate } from "../../context/RequestProvider";



const MainUserProfile = () => {
   const { setIsClicked, initialState } = useStateContext();
   const {
      userAccount, isUserRegistered,
      currentUserProject, setCurrentUserProject, setDataSnapshot, setGeneralData
   } = useContext(StateContext)

   const [isOpen, setIsOpen] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false)

   const ref = useRef()

   const data = window.localStorage.getItem('allProjectsData')
   const userProjectsData = JSON.parse(data)

   const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

   function toggleModal() {
      setIsOpen(!isOpen);
   }

   const clickOnProject = async (value) => {
      console.log(currentUserProject)
      await getCurrentProject(value, setGeneralData, setCurrentUserProject)

      await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 0), getCurrentDate(new Date(), 1))
   }

   const bindValueToClick = (value) => {
      return function () { clickOnProject(value) };
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
      <div className='nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-[440px]'>
         {isOpen ? (
            <>
               {userAccount && isUserRegistered ? (
                  // create new user project
                  <CreateNewProject />
               ) : (
                  // register new user 
                  <RegisterNewUser />
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
                  <div className="font-semibold text-lg dark:text-gray-200">
                     <p>Account address: {userAccount ? shortenAddress(userAccount) : 'Wallet address'} </p>
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
      </div>
   )
}

export default MainUserProfile