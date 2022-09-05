import React, { useEffect, useContext, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Sidebar, ThemeSettings } from './components';
import { CurrentProject, Orders, Employees, Stacked, Pyramid, Customers, Line, Area, Bar, Pie, Financial, Home } from './pages';
import './App.css';
import CreateNewProject from './components/userComponents/CreateNewProject';
import { StateContext } from './context/StateProvider';
import { TranscactionContext } from './context/TransactionProvidert.jsx'

import { useStateContext } from './context/ContextProvider';

const App = () => {
   const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
   const { userAccount, viewCreate, setViewCreate } = useContext(StateContext)
   const { connectWallet, disconnectWallet } = useContext(TranscactionContext)

   let userProjectsData = ''
   const data = window.localStorage.getItem('allProjectsData')
   if (data) {
      userProjectsData = JSON.parse(data)
   }

   const handleAccountChange = (...args) => {
      const accounts = args[0];
      if (accounts.length === 0) {
         console.log("Please connect to metamask");

      } else if (accounts[0] !== userAccount) {

         disconnectWallet()
         connectWallet()
      } else if (accounts[0] === userAccount) {

         if (window.localStorage.getItem('currentProject') !== null && window.localStorage.getItem('currentProject') !== 'undefined') {
            connectWallet()
            console.log(userAccount)
         }
      }
   };


   const ref = useRef()
   function useOutsideAlerter(ref) {
      useEffect(() => {
         /**
          * Alert if clicked on outside of element
          */
         function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               setViewCreate(false)
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

      return <div ref={wrapperRef} className='z-100000'>{props.children}</div>;
   }

   useEffect(() => {
      const checkIfClickedOutside = e => {
         if (viewCreate && ref.current && !ref.current.contains(e.target)) {
            setViewCreate(!viewCreate)
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [viewCreate])


   useEffect(() => {
      window.ethereum?.on("accountsChanged", handleAccountChange);
      return () => {
         window.ethereum?.removeListener("accountsChanged", handleAccountChange);

      };
   });

   useEffect(() => {
      const currentThemeColor = localStorage.getItem('colorMode');
      const currentThemeMode = localStorage.getItem('themeMode');
      if (currentThemeColor && currentThemeMode) {
         setCurrentColor(currentThemeColor);
         setCurrentMode(currentThemeMode);
      }
   }, []);

   return (

      <div className={'dark'}>




         <BrowserRouter>

            <div className="flex relative dark:bg-main-dark-bg z-0" >
               {viewCreate === true ? (<OutsideAlerter><CreateNewProject /></OutsideAlerter>) : (null)}

               <div className="fixed right-4 bottom-4" style={{ zIndex: '900' }}>
                  <TooltipComponent
                     content="Settings"
                     position="Top"
                  >
                     <button
                        type="button"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                     >
                        <FiSettings />
                     </button>

                  </TooltipComponent>
               </div>
               {activeMenu ? (
                  <div className="w-0 dark:bg-secondary-dark-bg">
                     <Sidebar />
                  </div>
               ) : (
                  <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                     <Sidebar />
                  </div>
               )}


               <div
                  className={
                     activeMenu
                        ? 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                        : 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  }
               >
                  <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full " >
                     <Navbar />

                  </div>



                  {/* <div> */}
                     {themeSettings && (<ThemeSettings />)}

                     <Routes>
                        {/* Current Project  */}
                        {userProjectsData ? (
                           <>
                              {(userProjectsData).map((item) => (
                                 <Route
                                    key={item.project_name}
                                    path={`${((item.project_name).toLowerCase()).replace(/\s/g, '')}`}
                                    element={(<CurrentProject />)}
                                 />
                              ))}
                           </>
                        ) : (
                           null
                        )}


                        {/* dashboard  */}
                        <Route path="/" element={(<Home />)} />
                        <Route path="/Home" element={(<Home />)} />
                        <Route path="/Projects" element={(<CurrentProject />)} />

                        {/* pages  */}
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/customers" element={<Customers />} />

                        {/* charts  */}
                        <Route path="/line" element={<Line />} />
                        <Route path="/area" element={<Area />} />
                        <Route path="/bar" element={<Bar />} />
                        <Route path="/pie" element={<Pie />} />
                        <Route path="/financial" element={<Financial />} />
                        <Route path="/pyramid" element={<Pyramid />} />
                        <Route path="/stacked" element={<Stacked />} />
                     </Routes>
                  {/* </div> */}
               </div>
            </div>
         </BrowserRouter>
      </div>
   );
};

export default App;
