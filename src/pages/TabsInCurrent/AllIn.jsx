import { StateContext } from '../../context/StateProvider'
import Loader from '../../components/Loader'
/* eslint-disable no-sequences */
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import DatePicker from "../../components/DatePicker";
import { getDataSnapshot, getCurrentDate } from '../../context/RequestProvider'
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { FiBarChart } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineRefresh } from 'react-icons/hi';



const AllIn = () => {
   const { dataSnapshot, setDataSnapshot } = useContext(StateContext)

    const [allUsers, setAllUsers] = useState(null)

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
   }
   const days = window.localStorage.getItem('currentProject')
   const daysTracked = JSON.parse(days)


  

   const earningData = [
      {
         icon: <MdOutlineSupervisorAccount />,
         amount: `${allUsers ? allUsers.with + allUsers.without + allUsers.connected : <Loader />}`,
         title: 'All users',
         iconColor: '#03C9D7',
         iconBg: '#E5FAFB',
         pcColor: 'red-600',
      },
      {
         icon: <BsBoxSeam />,
         amount: `${allUsers ? allUsers.without : <Loader />}`,
         title: 'Without wallet',
         iconColor: 'rgb(255, 244, 229)',
         iconBg: 'rgb(254, 201, 15)',
         pcColor: 'green-600',
      },
      {
         icon: <FiBarChart />,
         amount: `${allUsers ? allUsers.with : <Loader />}`,
         percentage: '+38%',
         title: 'With wallet',
         iconColor: 'rgb(228, 106, 118)',
         iconBg: 'rgb(255, 244, 229)',

         pcColor: 'green-600',
      },
      {
         icon: <HiOutlineRefresh />,
         amount: `${allUsers ? allUsers.connected : <Loader />}`,
         percentage: '-12%',
         title: 'Connected wallet',
         iconColor: 'rgb(0, 194, 146)',
         iconBg: 'rgb(235, 250, 242)',
         pcColor: 'red-600',
      },
   ];


   useEffect(() => {
      const getUsers = () => {
         let connected = 0
         let without = 0
         let withWallet = 0

         for (let i = 0; i < dataSnapshot[0].everyHour.length; i++) {
            connected += parseInt(dataSnapshot[0].everyHour[i].project_info.users_connected_wallet)
            without += parseInt(dataSnapshot[0].everyHour[i].project_info.users_without_wallet)
            withWallet += parseInt(dataSnapshot[0].everyHour[i].project_info.users_with_wallet)
         }
         setAllUsers({ with: withWallet, without: without, connected: connected })
      }
      getUsers()
   }, [dataSnapshot])


   const handleForm = async (event) => {

      if (event === 'Last 3 days') {
         await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 1), getCurrentDate(new Date(), 3))
      } else if (event === 'Last 7 days') {
         await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 1), getCurrentDate(new Date(), 7))
      }

      console.log(dataSnapshot, 'currentSnapshot')
   }


   return (
      <>
         {dataSnapshot !== null ? (
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

               {/* <button onClick={() => getUsers()}>Get All</button> */}

               {/* DropDown chain */}
               <Menu as="div" className=" text-gray-200 bg-main-dark-bg w-[120px] h-[40px] rounded-lg h-22">

                  <Menu.Button className="inline-flex rounded-lg justify-center px-4 py-2 bg-main-dark-bg text-sm font-medium text-gray-200">
                     Choose date
                  </Menu.Button>


                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                     leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95"
                  >
                     <Menu.Items className="origin-top-right absolute z-[1000] w-[140px] rounded-lg p-auto shadow-lg bg-main-dark-bg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 rounded-lg">

                           {daysTracked.daysTracked >= 1 ? (
                              <Menu.Item className=' text-gray-200 text-sm px-3 py-3'>
                                 {({ active }) => (
                                    <option
                                       value={''}
                                       className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                       )}
                                       onClick={(e) => console.log((e.target.value))}

                                    >
                                       Yesterday
                                    </option>
                                 )}
                              </Menu.Item>
                           ) : (
                              <Menu.Item className=' text-gray-500 text-sm px-3 py-3 mb-6'>
                                 <option> Yesterday </option>
                              </Menu.Item>
                           )}

                           {daysTracked.daysTracked >= 3 ? (
                              <Menu.Item className=' text-gray-200 text-sm px-3 py-3'>
                                 {({ active }) => (
                                    <option
                                       value={'Last 3 days'}
                                       className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                       )}
                                       onClick={(e) => handleForm((e.target.value))}
                                    >
                                       Last 3 days
                                    </option>
                                 )}
                              </Menu.Item>
                           ) : (
                              <Menu.Item className=' text-gray-500 text-sm px-3 py-3 mb-6'>
                                 <option> Last 3 days </option>
                              </Menu.Item>
                           )}

                           {daysTracked.daysTracked >= 7 ? (
                              <Menu.Item className=' text-gray-200 text-sm px-3 py-3'>
                                 {({ active }) => (
                                    <option
                                       value={'Last 7 days'}
                                       className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                       )}
                                       onClick={(e) => handleForm(e.target.value)}

                                    >
                                       Last 7 days
                                    </option>
                                 )}
                              </Menu.Item>
                           ) : (
                              <Menu.Item className=' text-gray-500 text-sm px-3 py-3 mb-6'>
                                 <option> Last 7 days </option>
                              </Menu.Item>
                           )}


                           {daysTracked.daysTracked >= 30 ? (
                              <Menu.Item className=' text-gray-200 text-sm px-3 py-3 mb-6'>
                                 {({ active }) => (
                                    <option
                                       value={''}
                                       className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                       )}
                                       onClick={(e) => console.log(e.target.value)}

                                    >
                                       Last 30 days
                                    </option>
                                 )}
                              </Menu.Item>
                           ) : (
                              <Menu.Item className=' text-gray-500 text-sm px-3 py-3 mb-6'>
                                 <option> Last 30 days </option>
                              </Menu.Item>
                           )}


                           <div className='w-[max-content] m-auto'>
                              <DatePicker />
                           </div>
                        </div>
                     </Menu.Items>
                  </Transition>
               </Menu>

            </div>
         ) : (<Loader />)}
      </>
   )
}

export default AllIn