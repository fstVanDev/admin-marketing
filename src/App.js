import React, { useEffect, useState, useRef, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { getCurrentProject, getDataSnapshot } from './context/RequestProvider'

import { Navbar, Sidebar, ThemeSettings } from './components';
import { CurrentProject, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Home, Moonarch, DataSnapshot } from './pages';
import './App.css';

import { StateContext } from './context/StateProvider';
import { LocalContext } from './context/LocalProvider';
import { TranscactionContext } from './context/TransactionProvidert.jsx'

import { useStateContext } from './context/ContextProvider';

const App = () => {
   const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, initialState, setIsClicked } = useStateContext();
   const { userAccount, setUserAccount } = useContext(StateContext)
   const { clearLocalStorage } = useContext(LocalContext)
   const { connectWallet, disconnectWallet } = useContext(TranscactionContext)

   let userProjectsData = ''
   const data = window.localStorage.getItem('allProjectsData')
   if (data) {
      userProjectsData = JSON.parse(data)
   }


   useEffect(() => {
      const currentThemeColor = localStorage.getItem('colorMode');
      const currentThemeMode = localStorage.getItem('themeMode');
      if (currentThemeColor && currentThemeMode) {
         setCurrentColor(currentThemeColor);
         setCurrentMode(currentThemeMode);
      }
   }, []);

   const ref = useRef()
   const [isMenuOpen, setIsMenuOpen] = useState(false)


   useEffect(() => {

      const checkIfClickedOutside = e => {
         // If the menu is open and the clicked target is not within the menu,
         // then close the menu
         if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
            setIsMenuOpen(false)
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [isMenuOpen])

   const handleAccountChange = (...args) => {
      // you can console to see the args
      const accounts = args[0];
      // if no accounts that means we are not connected
      if (accounts.length === 0) {
         console.log("Please connect to metamask");
         // our old data is not current connected account
         // currentAccount account that you already fetched and assume you stored it in useState
      } else if (accounts[0] !== userAccount) {
         // if account changed you should update the currentAccount so you return the updated the data
         // assuming you have [currentAccount,setCurrentAccount]=useState
         // however you are tracking the state currentAccount, you have to update it. in case of redux you have to dispatch update action etc
         // clearLocalStorage()
         disconnectWallet()
         connectWallet()
      } else if (accounts[0] === userAccount) {

         if (window.localStorage.getItem('currentProject') !== null && window.localStorage.getItem('currentProject') !== 'undefined') {
            connectWallet()
            console.log(userAccount)
         }
      }
   };


   useEffect(() => {
      window.ethereum?.on("accountsChanged", handleAccountChange);
      return () => {
         window.ethereum?.removeListener("accountsChanged", handleAccountChange);

      };
   });

   return (

      <div className={currentMode === 'Dark' ? 'dark' : ''}>
         <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg" >
               <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
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
                  <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                     <Sidebar />
                  </div>
               ) : (
                     <div  className="w-0 dark:bg-secondary-dark-bg">
                     <Sidebar />
                  </div>
               )}
               <div
                  className={
                     activeMenu
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                  }
               >
                  <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full " >
                     <Navbar />
                  </div>
                  <div>
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

                        {/* apps  */}
                        <Route path="/kanban" element={<Kanban />} />
                        <Route path="/editor" element={<Editor />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/color-picker" element={<ColorPicker />} />

                        {/* charts  */}
                        <Route path="/line" element={<Line />} />
                        <Route path="/area" element={<Area />} />
                        <Route path="/bar" element={<Bar />} />
                        <Route path="/pie" element={<Pie />} />
                        <Route path="/financial" element={<Financial />} />
                        <Route path="/color-mapping" element={<ColorMapping />} />
                        <Route path="/pyramid" element={<Pyramid />} />
                        <Route path="/stacked" element={<Stacked />} />
                     </Routes>
                  </div>
               </div>
            </div>
         </BrowserRouter>
      </div>
   );
};

export default App;
