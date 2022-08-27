import React, { useEffect, useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { TranscactionContext } from "../context/TransactionProvidert"
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../context/ContextProvider";
import { StateContext } from "../context/StateProvider";
import { justWatch } from "../context/RequestProvider";

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
      handleClick,
      isClicked,
      setScreenSize,
      screenSize, initialState, setIsClicked
   } = useStateContext();

   const { connectWallet, disconnectWallet } = useContext(TranscactionContext)
   const { userAccount, currentUserProject, generalData, setGeneralData, isMonarch, setIsMonarch, isCurrent, setIsCurrent,
      isShapshot, setIsSnapshot } = useContext(StateContext)

   const handleActiveMenu = () => setActiveMenu(!activeMenu);

   function toogleMon() {
      setIsMonarch(true)
      setIsSnapshot(false)
      setIsCurrent(false)
   }


   function toggleData() {
      setIsMonarch(false)
      setIsSnapshot(true)
      setIsCurrent(false)
   }

   function toggleCurrent() {
      setIsMonarch(false)
      setIsSnapshot(false)
      setIsCurrent(true)
   }

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



   return (
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
         <NavButton
            title="Menu"
            customFunc={handleActiveMenu}
            color={currentColor}
            icon={<AiOutlineMenu />}
         />
         <div className="flex">
            {generalData ? (
               <div className=" border-1 border-gray-200 dark:border-gray-700 mr-4 my-auto rounded-lg text-white">
                  <ul className="flex flex-wrap -mb-px text-lg text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">

                     <button className="mr-2 inline-block p-3 border-b-2 rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" onClick={toggleCurrent}>Current</button>

                     <button className="mr-2 inline-block p-3 border-b-2 rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" onClick={toogleMon}>Moonarch</button>


                     <button className="mr-2 inline-block p-3 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false" onClick={toggleData}>Snapshot</button>

                  </ul>
               </div>
            ) : (null)}



            <div className="my-auto mx-[12px]">
               <button
                  className={userAccount ? ("hover:drop-shadow-xl hover:bg-red-700 h-9 w-[180px] text-lg text-white rounded-lg bg-red-500") : ("hover:drop-shadow-xl hover:bg-green-700 w-full text-lg h-9 w-[180px] rounded-lg bg-green-500 text-white")}
                  onClick={userAccount ? disconnectWallet : connectWallet}
               >
                  {userAccount ? 'Disconnect Wallet' : 'Connect Wallet'}
               </button>
            </div>

            <TooltipComponent content="Profile" position="BottomCenter">
               <div
                  className="flex items-center gap-2 cursor-pointer my-4 p-1 hover:bg-light-gray rounded-lg"
                  onClick={() => handleClick("userProfile")}
               >
                  <img
                     className="rounded-full w-8 h-8"
                     src={avatar}
                     alt="user-profile"
                  />
                  <MdKeyboardArrowDown className="text-gray-400 text-14" />
               </div>
            </TooltipComponent>

            {isClicked.cart && <Cart />}
            {isClicked.chat && <Chat />}
            {isClicked.notification && <Notification />}
            {isClicked.userProfile &&
               <UserProfile />
            }

         </div>
      </div >
   );
};

export default React.memo(Navbar);
