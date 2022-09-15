import React, { useEffect, useContext } from 'react'
import { checkRegisterAndGetUserProjects, getCurrentProject, getDataSnapshot, getCurrentDate } from './RequestProvider';
import { StateContext } from './StateProvider';
import { LocalContext } from './LocalProvider';

const axios = require('axios')
var qs = require('qs');

const { ethereum } = window

export const TranscactionContext = React.createContext()


export const TransactionProvider = ({ children }) => {

   const { setUserProjectsDataToLocalStore,
      setUserCurrentProjectDataToLocalStore,
      clearLocalStorage } = useContext(LocalContext)

   const {
      userAccount, setUserAccount,
      useChainWallet, setUserChainWallet,
      isUserRegistered, setIsUserRegistered,
      projectId, setProjectId,
      projectsInfo, setProjectsInfo, setDataSnapshot, generalData, setGeneralData } = useContext(StateContext)

   const checkIfWalletConnected = async () => {

      const data = window.localStorage.getItem('currentProject')
      const data1 = JSON.parse(data)

      try {
         if (!ethereum) return alert('Please install Metamask!')
         const accounts = await ethereum.request({ method: 'eth_accounts' })

         if (accounts.length) {
            setUserAccount(accounts[0])
            setUserChainWallet(window.ethereum.networkVersion)

           await  checkRegisterAndGetUserProjects(accounts, setIsUserRegistered, setProjectsInfo, setUserProjectsDataToLocalStore, userAccount)
            getCurrentProject(0, data1.project_id, setGeneralData)
            getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 0), getCurrentDate(new Date(), 1))
         } else {
            console.log('none account in check wallet')
         }
      } catch (error) {
         console.log(error);
      }
   }

   const connectWallet = async () => {
      try {
         if (!ethereum) return alert('Please install Metamask!')
         const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

         setUserAccount(accounts[0])
         setUserChainWallet(window.ethereum.networkVersion)

         checkRegisterAndGetUserProjects(accounts, setIsUserRegistered, setProjectsInfo, setUserProjectsDataToLocalStore, userAccount)

      } catch (error) {
         console.log(error);
      }

   }

   const disconnectWallet = async () => {
      setUserAccount(null)
      setIsUserRegistered(null)
      setUserChainWallet(null)
      setProjectsInfo(null)

      clearLocalStorage()
   }

   useEffect(() => {
      checkIfWalletConnected()
   }, [])


   return (
      <TranscactionContext.Provider value={{ connectWallet, disconnectWallet }}>
         {children}
      </TranscactionContext.Provider>
   )
}