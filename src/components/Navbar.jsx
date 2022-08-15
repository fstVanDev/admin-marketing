import React, { useEffect, useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { TranscactionContext } from "../context/TransactionProvidert"
import RegisterModal from "./RegisterModal";
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../context/ContextProvider";

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
      screenSize,
   } = useStateContext();

   // const { currentAccount, connectWallet, walletDisconnect } = useContext(TranscactionContext)


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

   const handleActiveMenu = () => setActiveMenu(!activeMenu);

   return (
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
         <NavButton
            title="Menu"
            customFunc={handleActiveMenu}
            color={currentColor}
            icon={<AiOutlineMenu />}
         />
         <div className="flex">
            {/* <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        /> */}
            <NavButton
               title="Chat"
               dotColor="#03C9D7"
               customFunc={() => handleClick("chat")}
               color={currentColor}
               icon={<BsChatLeft />}
            />
            <NavButton
               title="Notification"
               dotColor="rgb(254, 201, 15)"
               customFunc={() => handleClick("notification")}
               color={currentColor}
               icon={<RiNotification3Line />}
            />

            <RegisterModal />

            {/* {!currentAccount ? (<button
               type="button"
               onClick={connectWallet}
               className='flex flex-row justify-center items-center mt-0 mx-auto my-0bg-primary p-3 rounded-full cursor-pointer hover:bg-secondary bg-red-700'
            >
               <p className="text-white text-base font-semibold">
                  Connect Wallet

               </p>
            </button>) : (
               <button
                  type="button"
                  onClick={walletDisconnect}
                  className='flex flex-row justify-center items-center mt-0 mx-auto my-0 bg-primary p-3 rounded-full cursor-pointer hover:bg-secondary bg-red-700'
               >
                  <p className="text-white text-base font-semibold">
                     Disconnect Wallet
                  </p>
               </button>
            )

            } */}

            <TooltipComponent content="Profile" position="BottomCenter">
               <div
                  className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
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
            {isClicked.userProfile && <UserProfile />}
         </div>
      </div>
   );
};

export default Navbar;
