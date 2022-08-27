import React, { useContext, useState, useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { StateContext } from "../context/StateProvider";
import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
   medicalproBranding,
   recentTransactions,
   weeklyStats,
   dropdownData,
   SparklineAreaData,
   ecomPieChartData,
} from "../data/dummy";
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { FiBarChart } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useStateContext } from "../context/ContextProvider";
import product9 from "../data/product9.jpg";


const CurrentProject = () => {
   const { currentColor, currentMode } = useStateContext();

   const [dropDown, setDropdown] = useState('hidden')

   const getFlex = () => {
      if (dropDown === 'hidden') {
         setDropdown('column')
      } else {
         setDropdown('hidden')
      }
   }

   const { generalData, dataSnapshot, isMonarch, isCurrent, isShapshot } = useContext(StateContext)

   const data = window.localStorage.getItem(`currentProject`)
   const userProjectsData = JSON.parse(data)

   const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;

   const Loader = () => {
      return (
         <div className="flex items-center justify-center ">
            <div className="w-16 h-16 border-b-4 border-yellow-900 rounded-full animate-spin"></div>
         </div>
      )
   }

   const earningData = [
      {
         icon: <MdOutlineSupervisorAccount />,
         amount: `${userProjectsData ? userProjectsData.users_connected_wallet + userProjectsData.users_with_wallet + userProjectsData.users_without_wallet : <Loader />}`,
         // percentage: dataSnapshot[0].,
         title: 'All users',
         iconColor: '#03C9D7',
         iconBg: '#E5FAFB',
         pcColor: 'red-600',
      },
      {
         icon: <BsBoxSeam />,
         amount: `${userProjectsData ? userProjectsData.users_without_wallet : <Loader />}`,
         // percentage: ((dataSnapshot[dataSnapshot.length - 2].users_without_wallet * 100) / dataSnapshot[dataSnapshot.length - 1].users_without_wallet).toFixed(1) + ' %',

         title: 'Without wallet',
         iconColor: 'rgb(255, 244, 229)',
         iconBg: 'rgb(254, 201, 15)',
         pcColor: 'green-600',
      },
      {
         icon: <FiBarChart />,
         amount: `${userProjectsData ? userProjectsData.users_with_wallet : <Loader />}`,
         percentage: '+38%',
         title: 'With wallet',
         iconColor: 'rgb(228, 106, 118)',
         iconBg: 'rgb(255, 244, 229)',

         pcColor: 'green-600',
      },
      {
         icon: <HiOutlineRefresh />,
         amount: `${userProjectsData ? userProjectsData.users_connected_wallet : <Loader />}`,
         percentage: '-12%',
         title: 'Connected wallet',
         iconColor: 'rgb(0, 194, 146)',
         iconBg: 'rgb(235, 250, 242)',
         pcColor: 'red-600',
      },
   ];

   const recentTransactions = [
      {
         amount: '+$350',
         title: 'Paypal Transfer',
         desc: 'Money Added',
         iconColor: '#03C9D7',
         iconBg: '#E5FAFB',
         pcColor: 'green-600',
      },
      {
         amount: '-$560',
         desc: 'Bill Payment',
         title: 'Wallet',
         iconColor: 'rgb(0, 194, 146)',
         iconBg: 'rgb(235, 250, 242)',
         pcColor: 'red-600',
      },
      {
         amount: '+$350',
         title: 'Credit Card',
         desc: 'Money reversed',
         iconColor: 'rgb(255, 244, 229)',
         iconBg: 'rgb(254, 201, 15)',

         pcColor: 'green-600',
      },
      {
         amount: '+$350',
         title: 'Bank Transfer',
         desc: 'Money Added',

         iconColor: 'rgb(228, 106, 118)',
         iconBg: 'rgb(255, 244, 229)',
         pcColor: 'green-600',
      },
      {
         amount: '-$50',
         percentage: '+38%',
         title: 'Refund',
         desc: 'Payment Sent',
         iconColor: '#03C9D7',
         iconBg: '#E5FAFB',
         pcColor: 'red-600',
      },
   ];

   const weeklyStats = [
      {
         amount: '-$560',
         title: 'Top Sales',
         desc: 'Johnathan Doe',
         iconBg: '#FB9678',
         pcColor: 'red-600',
      },
      {
         amount: '-$560',
         title: 'Best Seller',
         desc: 'MaterialPro Admin',
         iconBg: 'rgb(254, 201, 15)',
         pcColor: 'red-600',
      },
      {
         amount: '+$560',
         title: 'Most Commented',
         desc: 'Ample Admin',
         iconBg: '#00C292',
         pcColor: 'green-600',
      },
   ];

   const [copyText, setCopyText] = React.useState("");

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



   return (
      <div className="mt-24">
         <>
            {generalData && isCurrent ? (
               <>
                  <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                     <div className="flex m-3 flex-wrap justify-between gap-1 items-center">
                        {earningData.map((item) => (
                           <div
                              key={item.title}
                              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl "
                           >
                              <button
                                 type="button"
                                 style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                                 className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                              >
                                 {item.icon}
                              </button>
                              <div className="mt-3">
                                 <span className="text-lg font-semibold">{item.amount}</span>
                                 <span className={`text-sm text-${item.pcColor} ml-2`}>
                                    {item.percentage}
                                 </span>
                              </div>
                              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex gap-10 m-4 flex-wrap justify-center">
                     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
                        <div className="flex justify-between items-center gap-2">
                           <p className="text-xl font-semibold">Recent Transactions</p>
                        </div>
                        <div className="mt-10 w-72 md:w-400">
                           {recentTransactions.map((item) => (
                              <div key={item.title} className="flex justify-between mt-4">
                                 <div className="flex gap-4">
                                    <div>
                                       <p className="text-md font-semibold">{item.title}</p>
                                       <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                 </div>
                                 <p className={`text-${item.pcColor}`}>{item.amount}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-wrap justify-center">
                     <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                        <div className="flex justify-between">
                           <p className="text-xl font-semibold">Weekly Stats</p>
                           <button
                              type="button"
                              className="text-xl font-semibold text-gray-500"
                           >
                              <IoIosMore />
                           </button>
                        </div>

                        <div className="mt-10 ">
                           {weeklyStats.map((item) => (
                              <div
                                 key={item.title}
                                 className="flex justify-between mt-4 w-full"
                              >
                                 <div className="flex gap-4">
                                    <div>
                                       <p className="text-md font-semibold">{item.title}</p>
                                       <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                 </div>

                                 <p className={`text-${item.pcColor}`}>{item.amount}</p>
                              </div>
                           ))}
                           <div className="mt-4">
                              <SparkLine
                                 currentColor={currentColor}
                                 id="area-sparkLine"
                                 height="160px"
                                 type="Area"
                                 data={SparklineAreaData}
                                 width="320"
                                 color="rgb(242, 252, 253)"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  {!isCurrent ? null : <Loader />}
               </>
            )}
         </>

         {isShapshot && dataSnapshot.length > 0 ? (
            <>
               <div className="bg-white dark:text-gray-200 flex flex-wrap justify-center mx-auto my-4 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
                  <div className="flex justify-between items-center gap-2 mb-10">
                     <p className="text-xl font-semibold">Sales Overview</p>
                  </div>
                  <div className="md:w-full overflow-auto">
                     <LineChart />
                  </div>
               </div>
               <div className="flex gap-10 flex-wrap justify-center">
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
                     <div className="flex justify-between">
                        <p className="font-semibold text-xl">Revenue Updates</p>
                     </div>
                     <div className="mt-10 flex gap-10 flex-wrap justify-center">
                        <div className=" border-r-1 border-color m-4 pr-10">
                           <div>
                              <div>
                                 <span className="text-3xl font-semibold">$93,438</span>
                                 <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                                    23%
                                 </span>
                              </div>
                              <p className="text-gray-500 mt-1">Budget</p>
                           </div>
                           <div className="mt-8">
                              <p className="text-3xl font-semibold">$48,487</p>

                              <p className="text-gray-500 mt-1">Expense</p>
                           </div>

                           <div className="mt-5">
                              <SparkLine
                                 currentColor={currentColor}
                                 id="line-sparkLine"
                                 type="Line"
                                 height="80px"
                                 width="250px"
                                 data={SparklineAreaData}
                                 color={currentColor}
                              />
                           </div>
                           <div className="mt-10">
                              <Button
                                 color="white"
                                 bgColor={currentColor}
                                 text="Download Report"
                                 borderRadius="10px"
                              />
                           </div>
                        </div>
                        <div>
                           <Stacked currentMode={currentMode} width="320px" height="360px" />
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ) : (
            <>
               {isCurrent || isMonarch ? (null) : (
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mx-auto w-[400px] p-6 rounded-2xl">
                     <div className="flex items-center m-auto text-xl font-semibold text-center">
                        <p className="mx-auto">Sorry Snapshot is null</p>
                     </div>
                  </div>
               )}
            </>
         )}



         {isMonarch ? (
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-6 rounded-2xl w-[880px] mx-auto justify-between">
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
         ) : (
            null
         )}
      </div>
   );
};

export default CurrentProject;
