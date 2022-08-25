import React, { useEffect, useContext, useRef } from "react";
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
   const { userAccount, currentUserProject, generalData, setGeneralData } = useContext(StateContext)

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
            /> */}

            {/* <div className="flex items-center justify-center ">
               <div className="w-16 h-16 border-b-4 border-yellow-900 rounded-full animate-spin"></div>
            </div> */}

            {/* <button className="text-white w-[90px] h-[44px] border-white" onClick={() => justWatch(currentUserProject, setGeneralData)}>
               Just Watch
            </button> */}


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
            {isClicked.userProfile &&
               // <OutsideAlerter>
               <UserProfile />
               // </OutsideAlerter>
            }

         </div>
      </div>
   );
};

export default React.memo(Navbar);
