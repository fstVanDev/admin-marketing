import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { SUPPORTED_NETWORKS } from "./helpers/networks";

import { Menu } from '@headlessui/react'

export const ConnectWalletContext = React.createContext()


const ConnectWallet = ({ children }) => {

   const [connector, setConnector] = useState(null);
   const [chainId, setChainId] = useState(null);
   const [account, setAccount] = useState(null);
   const [fetching, setFetching] = useState(false);
   const [balance, setBalance] = useState(null);
   const [error, setError] = useState(null);
   const [supported, setSupported] = useState(false);
   const [network, setNetwork] = useState(null);
   const [symbol, setSymbol] = useState(null);

   useEffect(() => {
      const onConnect = async (chainId, connectedAccount) => {
         setAccount(connectedAccount);
         setChainId(chainId);

         // get chain data
         const networkData = SUPPORTED_NETWORKS.filter(
            (chain) => chain.chain_id === chainId
         )[0];

         if (!networkData) {
            setSupported(false);
         } else {
            setSupported(true);
            setNetwork(networkData.name);
            setSymbol(networkData.native_currency.symbol);

            // get account balance
            let provider = new ethers.providers.StaticJsonRpcProvider(
               networkData.rpc_url,
               {
                  chainId,
                  name: networkData.name,
               }
            );

            let balance = await provider.getBalance(connectedAccount);
            let formattedBalance = ethers.utils.formatEther(balance);

            setBalance(formattedBalance);
         }
      };

      const refreshData = async () => {
         const { chainId, accounts } = connector;
         await onConnect(chainId, accounts[0]);
         setFetching(false);
      };

      if (connector) {
         connector.on("connect", async (error, payload) => {
            const { chainId, accounts } = payload.params[0];
            await onConnect(chainId, accounts[0]);
            setFetching(false);
         });

         connector.on("disconnect", (error, payload) => {
            if (error) {
               throw error;
            }
            disconnect();
         });

         if ((!chainId || !account || !balance) && connector.connected) {
            refreshData();
         }
      }
   }, [connector, balance, chainId, account]);

   const connect = async () => {
      setFetching(true);
      const bridge = "https://bridge.walletconnect.org";

      const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
      setConnector(connector);

      if (!connector.connected) {
         await connector.createSession();
      }
   };



   const disconnect = () => {
      setConnector(null);
      setChainId(null);
      setAccount(null);
      setFetching(false);
      setBalance(null);
      setError(null);
   };

   return (
      <ConnectWalletContext.Provider value={{ connect, disconnect, account, chainId, connector }}>
         {children}
      </ConnectWalletContext.Provider>
   );
}

export default ConnectWallet;