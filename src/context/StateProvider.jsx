import React, { useState } from 'react'


export const StateContext = React.createContext()

const StateProvider = ({ children }) => {

   // User data States
   const [userAccount, setUserAccount] = useState(null)
   const [useChainWallet, setUserChainWallet] = useState(null)
   const [isUserRegistered, setIsUserRegistered] = useState(null)

   // User project states 
   const [projectId, setProjectId] = useState(null) // user projectID
   const [projectsInfo, setProjectsInfo] = useState(null) // user projects info (0: {project_id: ..., project_name:...})

   return (
      <StateContext.Provider value={{
         userAccount, setUserAccount,
         useChainWallet, setUserChainWallet,
         isUserRegistered, setIsUserRegistered,
         projectId, setProjectId,
         projectsInfo, setProjectsInfo
      }}>
         {children}
      </StateContext.Provider>
   )
}

export default StateProvider