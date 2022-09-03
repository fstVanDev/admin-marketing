import React from 'react'
import Loader from '../../components/Loader'
import { IoIosMore } from "react-icons/io";
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { FiBarChart } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineRefresh } from 'react-icons/hi';


const General = () => {

   const data = window.localStorage.getItem(`currentProject`)
   const userProjectsData = JSON.parse(data)

   const earningData = [
      {
         icon: <MdOutlineSupervisorAccount />,
         amount: `${userProjectsData ? userProjectsData.users_connected_wallet + userProjectsData.users_with_wallet + userProjectsData.users_without_wallet : <Loader />}`,
         title: 'All users',
         iconColor: '#03C9D7',
         iconBg: '#E5FAFB',
         pcColor: 'red-600',
      },
      {
         icon: <BsBoxSeam />,
         amount: `${userProjectsData ? userProjectsData.users_without_wallet : <Loader />}`,
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


  return (
     <div className="bg-main-dark-bg p-10">
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

        <div className="flex gap-10 m-4 flex-wrap justify-center bg-main-dark">
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
              </div>
           </div>
        </div>
     </div>
  )
}

export default General