import React, { useState } from 'react'


export const StateContext = React.createContext()

export const StateProvider = ({ children }) => {

   // User data States
   const [userAccount, setUserAccount] = useState(null)
   const [useChainWallet, setUserChainWallet] = useState(null)
   const [isUserRegistered, setIsUserRegistered] = useState(false)

   // users data for register project in system
   const [projectName, setProjectName] = useState(null)
   const [tokenContract, setTokenContract] = useState(null)
   const [projectUrl, setProjectUrl] = useState(null)
   const [projectType, setProjectType] = useState(null)

   // Users registration data 
   const [userEmail, setUserEmail] = useState(null);
   const [currentWallet, setCurrentWallet] = useState(null);

   // User project states 
   const [projectId, setProjectId] = useState(null)
   const [projectsInfo, setProjectsInfo] = useState(null) // user projects info (0: {project_id: ..., project_name:...})
   const [currentUserProject, setCurrentUserProject] = useState(null)


   return (
      <StateContext.Provider value={{
         userAccount, setUserAccount,
         useChainWallet, setUserChainWallet,
         isUserRegistered, setIsUserRegistered,
         projectId, setProjectId,
         projectsInfo, setProjectsInfo,
         currentUserProject, setCurrentUserProject,
         projectName, setProjectName,
         tokenContract, setTokenContract,
         projectUrl, setProjectUrl,
         projectType, setProjectType,
         userEmail, setUserEmail,
         currentWallet, setCurrentWallet
      }}>
         {children}
      </StateContext.Provider>
   )
}

