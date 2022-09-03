import React, {useContext, useState} from 'react'
import { StateContext } from "../../context/StateProvider";


const Moonarch = () => {

   const { generalData } = useContext(StateContext)
   const [copyText, setCopyText] = useState("");
   const [dropDown, setDropdown] = useState('hidden')


   const CopyToClipElement = ({ text }) => {
      const myRef = React.useRef(null);
      const [data, setData] = React.useState(text);
      React.useEffect(() => setData(text), [text]);

      React.useEffect(() => {
         if (myRef.current && data) {
            myRef.current.select();
            document.execCommand("copy");
            setData(null);
         }
      }, [data, myRef.current]);

      return <div>{data && <textarea ref={myRef}>{data}</textarea>} </div>;
   };

   const getFlex = () => {
      if (dropDown === 'hidden') {
         setDropdown('column')
      } else {
         setDropdown('hidden')
      }
   }

   const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;


   
   return (
      <div className="bg-main-dark-bg p-10">
         <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  mb-0 p-6 rounded-2xl w-[880px] mx-auto justify-between">
            <div className="flex ">
               <p className="font-semibold text-xl">General Data</p>
            </div>

            <div className="mt-10 column gap-10 flex-wrap justify-between">
               <div className="border-r-1 border-color m-4 mr-0 pr-6">
                  <div>
                     <div>
                        <span className="text-xl font-semibold">
                           {shortenAddress(generalData[0].token.address)}
                        </span>
                        <>
                           <button className="p-1.5 hover:drop-shadow-xl rounded-full text-white bg-green-600 ml-10 mt-1 text-xs" onClick={() => setCopyText(generalData[0].token.address)}>
                              Copy address
                           </button>
                           <CopyToClipElement text={copyText} />
                        </>
                     </div>
                     <p className="text-gray-500 mt-1">Address</p>
                  </div>
                  <div className="mt-8">
                     <div>
                        <span className="text-xl font-semibold">
                           {generalData[0].token.name}
                        </span>
                        <span className="p-1.5 hover:drop-shadow-xl rounded-full text-white bg-gray-600 ml-3 text-xs">
                           {generalData[0].token.symbol}
                        </span>
                        <p className="text-gray-500 mt-1">Token name</p>
                     </div>
                  </div>
                  <div className="mt-8">
                     <div>
                        <span className="text-xl font-semibold">
                           {generalData[0].token.decimals}
                        </span>
                        <p className="text-gray-500 mt-1">Decimals</p>
                     </div>
                  </div>
                  <div className="mt-8">
                     <div>
                        <span className="text-xl font-semibold">
                           {(generalData[1].price_usd).toFixed(0)}
                        </span>
                        <span className="p-1.5 hover:drop-shadow-xl rounded-full text-white bg-gray-600 ml-3 text-xs">
                           USD
                        </span>
                        <p className="text-gray-500 mt-1">Price</p>
                     </div>
                  </div>
                  <div className="mt-8">
                     <div>
                        <span className="text-xl font-semibold">
                           {(generalData[1].liquidity).toFixed(2)}
                        </span>
                        <span className="p-1.5 hover:drop-shadow-xl rounded-full text-white bg-gray-600 ml-3 text-xs">
                           BNB
                        </span>
                        <p className="text-gray-500 mt-1">Liquidity</p>
                     </div>
                  </div>
                  <div className="mt-8">
                     <div>
                        <span className="text-xl font-semibold">
                           {(generalData[1].liquidity_usd).toFixed(0)}
                        </span>
                        <span className="p-1.5 hover:drop-shadow-xl rounded-full text-white bg-gray-600 ml-3 text-xs">
                           USD
                        </span>
                        <p className="text-gray-500 mt-1">Liquidity</p>
                     </div>
                  </div>
                  <div className="mt-8">
                     <div>
                        <span className="text-xl font-semibold">
                           {(generalData[1].volume_24h).toFixed(2)}
                        </span>
                        <span className="p-1.5 hover:drop-shadow-xl rounded-full text-white bg-gray-600 ml-3 text-xs">
                           BNB
                        </span>
                        <p className="text-gray-500 mt-1">Volume 24h</p>
                     </div>
                  </div>
                  <div className="mt-8">
                     <div>
                        <span className="text-xl font-semibold">
                           {(generalData[1].volume_24h_usd).toFixed(0)}
                        </span>
                        <span className="p-1.5 hover:drop-shadow-xl rounded-full text-white bg-gray-600 ml-3 text-xs">
                           USD
                        </span>
                        <p className="text-gray-500 mt-1">Volume</p>
                     </div>
                  </div>
               </div>


               <div className="m-4 mr-0 mt-6">
                  <div className='pr-10  relative '>
                     <div>
                        <span className="text-xl text-white">
                           {generalData[0].token.network}
                        </span>
                        <p className='text-gray-500 mt-1'>Network</p>
                     </div>
                     <div className="mt-4">
                        <span className="text-xl text-white">
                           {String(generalData[0].token.verified)}
                        </span>
                        <p className="text-gray-500 mt-1"> Verified contract</p>
                     </div>
                     <div className="mt-4">
                        <span className="text-xl text-white">
                           {generalData[0].token.creator ? generalData[0].token.creator : 'Enable to fetch'}
                        </span>
                        <p className="text-gray-500 mt-1">Creator</p>
                     </div>
                     <div className="mt-4">
                        <span className="text-xl text-white">
                           {generalData[0].token.owner ? generalData[0].token.owner : 'Enable to fetch'}
                        </span>
                        <p className="text-gray-500 mt-1">Owner</p>
                     </div>
                     <div className="mt-4">
                        <span className="text-xl text-white">
                           {generalData[0].token.ownerSupply ? generalData[0].token.ownerSupply : 'Enable to fetch'}
                        </span>
                        <p className="text-gray-500 mt-1">Owner supply</p>
                     </div>
                     <div className="mt-4">
                        <span className="text-xl text-white">
                           {generalData[0].token.burntSupply}
                        </span>
                        <p className="text-gray-500 mt-1">Burnt supply</p>
                     </div>
                  </div>
               </div>
               <button
                  className="rounded-xl flex-end border-1 border-green-700 bg-green-800"
                  onClick={() => getFlex()}>
                  <span className="mx-6 my-4">{generalData[0].locks.length > 0 ? 'Locked Liquidity' : 'No Locked Liquidity'}</span>
               </button>
            </div>
            <div className={`${dropDown} text-gray-500`}>
               {(generalData[0].locks).map((item, index) => (
                  <div
                     className="m-2 border-b-1 border-green-800"
                     key={index}
                  >
                     <div className="mt-4">
                        <span className="text-white text-lg">{(item.address)}</span>
                        <p className="text-gray-500">Address</p>
                     </div>
                     <div className="mt-2">
                        <span className="text-white text-lg">{item.network}</span>
                        <p className="text-gray-500">Network</p>
                     </div>
                     <div className="mt-2">
                        <span className="text-white text-lg">{item.emission ? item.emission : '-'}</span>
                        <p className="text-gray-500">Emission</p>
                     </div>
                     <div className="mt-2">
                        <span className="text-white text-lg">{(item.locker)}</span>
                        <p className="text-gray-500">Locker</p>
                     </div>
                     <div className="mt-2">
                        <span className="text-white text-lg">{item.type}</span>
                        <p className="text-gray-500">TypeAmount</p>
                     </div>
                     <div className="mt-2 mb-2">
                        <span className="text-white text-lg">{item.hash}</span>
                        <p className="text-gray-500">Hash</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Moonarch