import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'

const axios = require('axios')
var qs = require('qs');

export const TranscactionContext = React.createContext()

const { ethereum } = window


const getEthereumContarct = () => {
   const provider = new ethers.providers.Web3Provider(ethereum)
   const signer = provider.getSigner()
   const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

   return transactionContract
}

export const TransactionProvider = ({ children }) => {

   const [currentAccount, setCurrentAccount] = useState('')
   const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
   const [isLoading, setIsLoading] = useState(false)
   const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
   const [isRegistered, setIsRegistered] = useState(Number)

   const handleChange = (e, name) => {
      setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
   }




   const checkIfWalletConnected = async () => {

      try {
         if (!ethereum) return alert('Please install Metamask!')
         const accounts = await ethereum.request({ method: 'eth_accounts' })

         if (accounts.length) {
            setCurrentAccount(accounts[0])

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
            setIsRegistered(response.status)
         }).catch(error => {
            console.log(error)
         })
         console.log('srrr')
         



      } catch (error) {
         console.log(error);

         throw new Error('No ethereum object')
      }


   }






   const walletConnect = async () => {
      try {
         if (!ethereum) return alert('Please install Metamask!')
         const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

         setCurrentAccount(accounts[0])

         console.log(accounts[0], 'from walletconnect')
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
            setIsRegistered(response.status)
         }).catch(error => {
            console.log(error)
         })
         console.log('srrr')

      } catch (error) {
         console.log(error);

         throw new Error('No ethereum object')
      }

   }

   const walletDisconnect = async () => {
      setCurrentAccount('')
      setIsRegistered(404)
   }

   const sendTransaction = async () => {
      try {
         if (!ethereum) return alert('Please install Metamask!')

         const { addressTo, amount, keyword, message } = formData
         const transactionContract = getEthereumContarct()
         const parsedAmount = ethers.utils.parseEther(amount)

         await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
               from: currentAccount,
               to: addressTo,
               gas: '0x5208', //21000 GWEI
               value: parsedAmount._hex // 0.00001

            }]
         })

         const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)

         setIsLoading(true)
         console.log(`Loading - ${transactionHash.hash}`)
         await transactionHash.wait()
         setIsLoading(false)
         console.log(`Success - ${transactionHash.hash}`)

         const transactionCount = await transactionContract.getTransactionCount()
         setTransactionCount(transactionCount.toNumber())

      } catch (error) {
         console.log(error);

         throw new Error('No ethereum object')
      }
   }

   useEffect(() => {
      checkIfWalletConnected()
   }, [])


   return (
      <TranscactionContext.Provider value={{ connectWallet: walletConnect, walletDisconnect, currentAccount, formData, setFormData, handleChange, sendTransaction, isRegistered }}>
         {children}
      </TranscactionContext.Provider>
   )
}