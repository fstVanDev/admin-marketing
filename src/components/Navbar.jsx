import React, { useEffect, useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { TranscactionContext } from "../context/TransactionProvidert"
import avatar from "../data/avatar.jpg";
import { Cart, Chat, MainUserProfile } from ".";
import { useStateContext } from "../context/ContextProvider";
import { StateContext } from "../context/StateProvider";

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
      screenSize
   } = useStateContext();

   const { connectWallet, disconnectWallet } = useContext(TranscactionContext)
   const { userAccount } = useContext(StateContext)

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
         </div>

         {isClicked.cart && <Cart />}
         {isClicked.chat && <Chat />}
         {isClicked.userProfile && <MainUserProfile />}

      </div>
   );
};

export default React.memo(Navbar);
