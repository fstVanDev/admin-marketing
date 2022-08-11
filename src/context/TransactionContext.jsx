import React, { useEffect, useState, useContext } from 'react'
import { ethers } from 'ethers'
import { StateContext } from './StateProvider';

const axios = require('axios')
var qs = require('qs');

const { ethereum } = window

export const TranscactionContext = React.createContext()


export const TransactionProvider = ({ children }) => {

   const {
      userAccount, setUserAccount,
      useChainWallet, setUserChainWallet,
      isUserRegistered, setIsUserRegistered,
      projectId, setProjectId,
      projectsInfo, setProjectsInfo } = useContext(StateContext)

   // const [currentAccount, setCurrentAccount] = useState('')
   // const [isRegistered, setIsRegistered] = useState(Number)

   // const [connector, setConnector] = useState(null);

   // const [userChainWallet, setUserChainWallet] = useState(null)   
   // const [isMetamask, setIsMetamask] = useState(Boolean)          
   // const [info, setInfo] = useState(null)
   // const [project, setProject] = useState(null)


   const checkIfWalletConnected = async () => {
      try {
         if (!ethereum) return alert('Please install Metamask!')
         const accounts = await ethereum.request({ method: 'eth_accounts' })

         if (accounts.length) {
            setUserAccount(accounts[0])
            setUserChainWallet(window.ethereum.networkVersion)

         } else {
            console.log('No accounts found')
         }
         console.log(accounts[0], 'from checkconnect')
         var data = qs.stringify({
            'wallet_address': accounts[0]
         });
         console.log(data)
         var config = {
            method: 'post',
            baseURL: 'https://wallettreatment.herokuapp.com/wallets',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
         };
         console.log('hrtr')
         axios(config).then(function (response) {
            console.log(response.data)
            console.log(response.status, 'statussss')
            setIsUserRegistered(response.status)
         }).catch(error => {
            console.log(error)
         })
         console.log('srrr')
      } catch (error) {
         console.log(error);

         throw new Error('No ethereum object')
      }
   }

   const connectWallet = async () => {
      try {
         if (!ethereum) return alert('Please install Metamask!')
         const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

         setUserAccount(accounts[0])
         setUserChainWallet(window.ethereum.networkVersion)

         var data = qs.stringify({
            'wallet_address': accounts[0]
         });

         var config = {
            method: 'post',
            baseURL: 'https://wallettreatment.herokuapp.com/wallets',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
         };

         axios(config).then(function (response) {
            console.log(response.data)
            setIsUserRegistered(response.data)
         }).catch(error => {
            console.log(error)
         })

      } catch (error) {
         console.log(error);

         throw new Error('No ethereum object')
      }

   }

   const disconnectWallet = async () => {
      setUserAccount(null)
      setIsUserRegistered(null)
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