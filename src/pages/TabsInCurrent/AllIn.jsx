import { StateContext } from '../../context/StateProvider'
import Loader from '../../components/Loader'
/* eslint-disable no-sequences */
import React, { Fragment, useContext, useEffect, useState, useCallback } from 'react'
import { Menu, Transition } from '@headlessui/react'
import DatePicker from "../../components/DatePicker";
import { getDataSnapshot, getCurrentDate } from '../../context/RequestProvider'
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { FiBarChart } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineRefresh } from 'react-icons/hi';
import ChartClassic from '../../components/Charts/ChartClassic';





const AllIn = () => {
   const { dataSnapshot, setDataSnapshot, setViewChart, viewChart } = useContext(StateContext)

   const [allUsers, setAllUsers] = useState(null)
   // const [name, setName] = useState()

   const [dataArray, setDataArray] = useState([])

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
   }
   const days = window.localStorage.getItem('currentProject')
   const daysTracked = JSON.parse(days)


   const Chart = dataArray.map((item) => {
      return <ChartClassic parametr={item} />

   })


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

   const handleForm = async (event) => {

      if (event === 'Last 3 days') {
         await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 0), getCurrentDate(new Date(), 2))
      } else if (event === 'Last 7 days') {
         await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 0), getCurrentDate(new Date(), 6))
      } else if (event === 'Yesterday') {
         await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 1), getCurrentDate(new Date(), 1))
      }

      console.log(dataSnapshot, 'currentSnapshot')
   }


   const CheckHandler = (e) => {
      const value = e.target.value;
      setDataArray((prev) =>
         dataArray.includes(value)
            ? prev.filter((cur) => cur !== value)
            : [...prev, e.target.value]
      );
      setViewChart(true)
   };


   const paramsDataArray =
   {
      users_connected_wallet: 'Users connected',
      users_with_wallet: 'Users with wallet',
      users_without_wallet: 'Users without wallet',
      price_usd: 'Price (USD)',
      volume_24h_usd: 'Volume 24H (USD)',
      liquidity_usd: 'Liquidity (USD)'
   }

   // const handleData = (event) => {
   //    setName(event)
   //    setViewChart(true)
   // }

   const araayChecked = []

   const mainObj = {
      obj: String,
      index: Number,
      checked: Boolean
   }

   const doAction = () => {

      if (dataArray.length !== 0) {
         var arr = Object.keys(paramsDataArray)

         for (let i = 0; i < arr.length; i++) {

            if (dataArray.includes(arr[i]) === true) {

               araayChecked.push(true)

            } else {

               araayChecked.push(false)

            }
         }
         return (

            araayChecked.map((item, index) => (
               <div className='flex w-full py-auto text-white text-base mx-2 text-center ' key={Object.keys(paramsDataArray)[index]}>
                  <input type='checkbox' id={Object.keys(paramsDataArray)[index]} value={Object.keys(paramsDataArray)[index]} checked={item} className='rounded-full border-1 cursor-pointer w-5 h-5 my-auto' placeholder=' ' onClick={CheckHandler} />
                  <label className='ml-2 w-[max-content] h-[min-content] my-auto  cursor-pointer' htmlFor={Object.keys(paramsDataArray)[index]}>{Object.values(paramsDataArray)[index]}</label>
               </div>
            ))
         )

      } else {
         var arr = Object.keys(paramsDataArray)

         for (let i = 0; i < arr.length; i++) {

            if (dataArray.includes(arr[i]) !== true) {
               araayChecked.push(false)
            }
         }
         return (

            araayChecked.map((item, index) => (
               <div className='flex w-full py-auto text-white text-base mx-2 text-center ' key={Object.keys(paramsDataArray)[index]}>
                  <input type='checkbox' id={Object.keys(paramsDataArray)[index]} value={Object.keys(paramsDataArray)[index]} checked={item} className='rounded-full border-1 cursor-pointer w-5 h-5 my-auto' placeholder=' ' onClick={CheckHandler} />
                  <label className='ml-2 w-[max-content] h-[min-content] my-auto  cursor-pointer' htmlFor={Object.keys(paramsDataArray)[index]}>{Object.values(paramsDataArray)[index]}</label>
               </div>
            ))
         )
      }

   }

   // useEffect(() => {

   //    if (dataArray.length !== 0) {
   //       doAction()
   //    } else {
   //       doAction()
   //    }
   //    console.log(dataArray)
   // }, [dataArray])

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


   return (
      <>
         {dataSnapshot !== null ? (
            <div className='column justify-center px-auto'>
               <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                  <div className="flex mt-3 flex-wrap justify-between gap-1 items-center">
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
                                             value={'Yesterday'}
                                             className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                             )}
                                             onClick={(e) => handleForm((e.target.value))}

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
               </div>

               <div className='flex justify-center gap-7 bg-secondary-dark-bg w-[max-content] h-[80px] rounded-lg mx-auto mt-3'>
                  <div className='flex justiify-around px-4' >


                     {doAction()}

                     <button className='w-fit h-[44px] rounded-lg border-1 bg-main-bg px-3 py-2 my-auto ml-8'>Apply</button>

                  </div>


               </div>


               {dataArray.length > 0 ? (
                  <div className='flex flex-wrap mx-auto'>
                     <>
                        {dataArray.map((item) => (
                           // <div key={item} >
                           //    <ChartClassic parametr={item} />
                           // </div>
                           <div className='mt-5 mx-auto'>
                              <ChartClassic parametr={item} />

                           </div>

                        ))}
                     </>
                  </div>
               ) :
                  (
                     null
                  )}





            </div>
         ) : (<Loader />)
         }
      </>
   )
}

export default AllIn



// {
//    dataArray.map((item) => {
//       const obj = {
//          obj: String,
//          checked: Boolean
//       }
//       if (Object.keys(paramsDataArray).includes(item) === true) {
//          obj.obj = item
//          obj.checked = true
//       }

//       return (
//          <>
//             {Object.keys(paramsDataArray).map((key) => {


//                <div className='flex w-full py-auto text-white text-base mx-2 text-center ' key={key}>
//                   <input type='checkbox' id={key} value={key} checked={obj.obj === key ? obj.checked : !obj.checked} className='rounded-full border-1 cursor-pointer w-5 h-5 my-auto' placeholder=' ' onClick={CheckHandler} />
//                   <label className='ml-2 w-[max-content] h-[min-content] my-auto  cursor-pointer' key={key} htmlFor={key}>{paramsDataArray[key]}</label>
//                </div>

//             })}
//          </>
//       )
//    }
//    )
// }


// {
//    Object.keys(paramsDataArray).map((key) => {

//       let mainObj = {}
//       dataArray.map((item) => {
//          const obj = {
//             obj: String,
//             checked: Boolean
//          }
//          if (Object.keys(paramsDataArray).includes(item) === true) {
//             obj.obj = item
//             obj.checked = true
//          }
//          mainObj = obj
//       })
//       console.log(mainObj, '121212')
//       return (
//          <div className='flex w-full py-auto text-white text-base mx-2 text-center ' key={key}>
//             <input type='checkbox' id={key} value={key} checked={false} className='rounded-full border-1 cursor-pointer w-5 h-5 my-auto' placeholder=' ' onClick={CheckHandler} />
//             <label className='ml-2 w-[max-content] h-[min-content] my-auto  cursor-pointer' htmlFor={key}>{paramsDataArray[key]}</label>
//          </div>
//       )
//    })
// }
