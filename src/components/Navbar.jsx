import React, { useEffect, useContext, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { TranscactionContext } from "../context/TransactionProvidert"
import avatar from "../data/avatar.jpg";
import { useStateContext } from "../context/ContextProvider";
import { StateContext } from "../context/StateProvider";
import UserProfile from './userComponents/UserProfile'
import CreateNewProject from "./userComponents/CreateNewProject";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
   <TooltipComponent content={title} position="BottomCenter">
      <button
         type="button"
         onClick={() => customFunc()}
         style={{ color }}
         className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
         <span
            style={{ background: dotColor }}
            className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
         />
         {icon}
      </button>
   </TooltipComponent>
);

const Navbar = () => {
   const {
      currentColor,
      activeMenu,
      setActiveMenu,
      setScreenSize,
      screenSize
   } = useStateContext();

   const { connectWallet, disconnectWallet } = useContext(TranscactionContext)
   const { userAccount, setIsOpen, isOpen, setViewCreate, viewCreate } = useContext(StateContext)

   const handleActiveMenu = () => setActiveMenu(!activeMenu);


   useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   useEffect(() => {
      if (screenSize <= 900) {
         setActiveMenu(false);
      } else {
         setActiveMenu(true);
      }
   }, [screenSize]);

   const ref1 = useRef()
   function useOutsideAlerter1(ref) {
      useEffect(() => {
         /**
          * Alert if clicked on outside of element
          */
         function handleClickOutside(event) {
            if (ref1.current && !ref1.current.contains(event.target)) {
               setViewCreate(false)
            }
         }
         // Bind the event listener
         document.addEventListener("mousedown", handleClickOutside);
         return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref1]);
   }

   function OutsideAlerter1(props) {
      const wrapperRef = useRef(null);
      useOutsideAlerter1(wrapperRef);

      return <div ref1={wrapperRef} className='z-100000'>{props.children}</div>;
   }

   useEffect(() => {
      const checkIfClickedOutside = e => {
         if (viewCreate && ref1.current && !ref1.current.contains(e.target)) {
            setViewCreate(!viewCreate)
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [viewCreate])


   const ref = useRef()
   function useOutsideAlerter(ref) {
      useEffect(() => {
         /**
          * Alert if clicked on outside of element
          */
         function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               setIsOpen(false)
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
         if (isOpen && ref.current && !ref.current.contains(e.target)) {
            setIsOpen(!isOpen)
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [isOpen])


   return (
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
         <NavButton
            title="Menu"
            customFunc={handleActiveMenu}
            color={currentColor}
            icon={<AiOutlineMenu />}
         />

         <div className="flex w-max-content">
            <div className="my-auto mx-[12px]">
               <button
                  className={userAccount ? ("hover:drop-shadow-xl hover:bg-red-700 h-9 w-[180px] text-lg text-white rounded-lg bg-red-500") : ("hover:drop-shadow-xl hover:bg-green-700 w-full text-lg h-9 w-[180px] rounded-lg bg-green-500 text-white")}
                  onClick={userAccount ? disconnectWallet : connectWallet}
               >
                  {userAccount ? 'Disconnect Wallet' : 'Connect Wallet'}
               </button>
            </div>
            <div
               className="flex items-center gap-2 cursor-pointer my-4 p-1 hover:bg-light-gray rounded-lg"
               onClick={() => setIsOpen(true)}
            >
               <img
                  className="rounded-full w-8 h-8"
                  src={avatar}
                  alt="user-profile"
               />
               <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
            <OutsideAlerter>
               <UserProfile />
            </OutsideAlerter>
            {viewCreate === true ? (<OutsideAlerter><CreateNewProject /></OutsideAlerter>) : (null)}

         </div>
      </div>
   );
};

export default React.memo(Navbar);
