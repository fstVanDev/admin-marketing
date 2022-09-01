import React, { createContext } from 'react'

export const LocalContext = createContext()



export const LocalProvider = ({ children }) => {

   // set info about all user projects 
   const setUserProjectsDataToLocalStore = (response) => {
      window.localStorage.setItem('allProjectsData', JSON.stringify(response.data[1].project_info))
      // console.log(window.localStorage.getItem('allProjectsData'), 'allProjectsData save in local storage')
   }


   // set info about current user project
   const setUserCurrentProjectDataToLocalStore = (response) => {
      window.localStorage.setItem('currentProjectData', JSON.stringify(response.data))
      // console.log(window.localStorage.getItem('currentProjectData'), 'currentProjectData saved in local storage')
   }


   // when user click disconnect wallet, clear local storage 
   const clearLocalStorage = () => {
      window.localStorage.clear()
      // console.log('local storage is cleaned')
   }


   return (
      <LocalContext.Provider value={{
         setUserProjectsDataToLocalStore,
         setUserCurrentProjectDataToLocalStore,
         clearLocalStorage,
      }}>
         {children}
      </LocalContext.Provider>
   )
}

