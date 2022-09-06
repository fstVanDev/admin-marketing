/* eslint-disable no-sequences */
import React, { Fragment, useContext, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { StateContext } from "../../context/StateProvider";
import { useStateContext } from "../../context/ContextProvider";
import { getDataSnapshot, getCurrentDate } from '../../context/RequestProvider'
import DatePicker from "../../components/DatePicker";
import { Stacked, Button, LineChart } from "../../components";



const Snapshot = () => {

   const { dataSnapshot, currentSnapshot, setCurrentSnapshot, setDataSnapshot } = useContext(StateContext)
   const { currentColor, currentMode } = useStateContext();

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
   }

   const days = window.localStorage.getItem('currentProject')
   const daysTracked = JSON.parse(days)
   console.log(daysTracked.daysTracked)

   const handleForm = async (event) => {

      if (event === 'Last 3 days') {
         await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 1), getCurrentDate(new Date(), 3))
      } else if (event === 'Last 7 days') {
         await getDataSnapshot(setDataSnapshot, getCurrentDate(new Date(), 1), getCurrentDate(new Date(), 7))
      }

      console.log(dataSnapshot, 'currentSnapshot')
   }

   useEffect(() => {
      function consoleSnap() {
         console.log(dataSnapshot)
      }
      consoleSnap()
   }, [dataSnapshot])

   return (
      <div className="bg-main-dark-bg p-10">
         <div className="dark:text-gray-200  flex flex-wrap justify-center mx-auto my-4 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
            <div className="flex w-full justify-between items-center gap-2 mb-10 w-max-content">
               <p className="text-xl font-semibold">Sales Overview</p>

               {/* DropDown chain */}
               <Menu as="div" className=" text-gray-200 h-min-content bg-main-dark-bg w-[120px] rounded-lg ">

                  <Menu.Button className="inline-flex rounded-lg justify-center w-full px-4 py-2 bg-main-dark-bg text-sm font-medium text-gray-200">
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

                           {daysTracked.daysTracked  >= 7 ? (
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
               {/* </form> */}

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
   )
}

export default Snapshot