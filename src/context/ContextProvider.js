import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

const initialState = {
   chat: false,
   cart: false,
   userProfile: false,
   notification: false
}

export const ContextProvider = ({ children }) => {
   const [screenSize, setScreenSize] = useState(undefined)
   const [currentColor, setCurrentColor] = useState('#03c9d7')
   const [currentMode, setCurrentMode] = useState('Dark')
   const [themeSettings, setThemeSettings] = useState(false)
   const [activeMenu, setActiveMenu] = useState(false)
   const [isClicked, setIsClicked] = useState(initialState)

   const setMode = (e) => {
      setCurrentMode(e.target.value)
      localStorage.setItem('colorMode', e.target.value)
   }

   const setColor = (color) => {
      setCurrentColor(color)
      localStorage.setItem('colorMode', color)
   }

   const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true })

   return (
      <StateContext.Provider value={{
         currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setColor, setMode, themeSettings, setThemeSettings
      }}>
         {children}
      </StateContext.Provider>
   )
}

export const useStateContext = () => useContext(StateContext);
