import React, { useEffect, useContext } from 'react'
import { checkRegisterAndGetUserProjects } from './RequestProvider';
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
      projectsInfo, setProjectsInfo } = useContext(StateContext)

   const checkIfWalletConnected = async () => {
      try {
         if (!ethereum) return alert('Please install Metamask!')
         const accounts = await ethereum.request({ method: 'eth_accounts' })

         if (accounts.length) {
            setUserAccount(accounts[0])
            setUserChainWallet(window.ethereum.networkVersion)

            checkRegisterAndGetUserProjects(accounts, setIsUserRegistered, setProjectsInfo, setUserProjectsDataToLocalStore)

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

         checkRegisterAndGetUserProjects(accounts, setIsUserRegistered, setProjectsInfo, setUserProjectsDataToLocalStore)

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