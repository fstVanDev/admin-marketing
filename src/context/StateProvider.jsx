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
   const [chainId, setChainId] = useState(null)

   // Users registration data 
   const [userEmail, setUserEmail] = useState(null);
   const [currentWallet, setCurrentWallet] = useState(null);

   // User project states 
   const [projectId, setProjectId] = useState(null)
   const [projectsInfo, setProjectsInfo] = useState(null) // user projects info (0: {project_id: ..., project_name:...})
   const [currentUserProject, setCurrentUserProject] = useState(null)
   const [generalData, setGeneralData] = useState(null)
   const [dataSnapshot, setDataSnapshot] = useState(null)
   const [isCreate, setIsCreate] = useState(false)
   const [isMonarch, setIsMonarch] = useState(false)
   const [isShapshot, setIsSnapshot] = useState(false)
   const [isCurrent, setIsCurrent] = useState(true)

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
         currentWallet, setCurrentWallet,
         generalData, setGeneralData,
         dataSnapshot, setDataSnapshot,
         isCreate, setIsCreate,
         chainId, setChainId,
         isMonarch, setIsMonarch,
         isShapshot, setIsSnapshot,
         isCurrent, setIsCurrent
      }}>
         {children}
      </StateContext.Provider>
   )
}

