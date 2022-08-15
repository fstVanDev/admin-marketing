import React, { useContext, useState, Fragment } from 'react'
import { TranscactionContext } from "../context/TransactionProvidert"
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios';
const qs = require('qs')


const CreateNewProject = () => {
   const { connectWallet, currentAccount, walletDisconnect, isRegistered } = useContext(TranscactionContext)

   const [projectName, setProjectName] = useState('')
   const [tokenContract, setTokenContract] = useState('')
   const [projectUrl, setProjectUrl] = useState('')
   const [projectType, setProjectType] = useState('')

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
   }


   let handleSubmit = async (event) => {
      event.preventDefault();

      try {
         var data = qs.stringify({
            'project_name': projectName,
            'token_contract': tokenContract,
            'project_url': projectUrl,
            'project_type': projectType,
            'owner_address': currentAccount
         });
         console.log(projectName, 'name from post project')
         console.log(projectUrl, 'url from post project')
         console.log(projectType, 'type from post project')
         console.log(currentAccount, 'acc from post project')
         console.log(tokenContract, 'contract from post project')


         var config = {
            method: 'post',
            baseURL: 'https://wallettreatment.herokuapp.com/register_project',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
         };

         axios(config)
            .then(response => {
               console.log(response, 'response from post project')
               console.log('Отправка project')
            })
            .catch(error => {
               console.log(error)
            })
      } catch (err) {
         console.log(err);
      }
   };


   return (
      <div>
         <p className='text-white flex font-xxl m-auto p-auto'>Create Project</p>

         <form className='w-[400px] mx-auto mt-9 rounded border-amber-50' onSubmit={handleSubmit}>
            <input
               className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
               type="text"
               value={projectName}
               placeholder="Project name"
               onChange={(e) => setProjectName(e.target.value)}
            />
            <input
               className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
               type="text"
               value={tokenContract}
               placeholder="Contarct"
               onChange={(e) => setTokenContract(e.target.value)}
            />
            <input
               className="my-2 w-full rounded-md p-2 text-black outline-none bg-bcg text-sm white-glassmorphism focus:border-none"
               type="text"
               value={projectUrl}
               placeholder="Project URL"
               onChange={(e) => setProjectUrl(e.target.value)}
            />

            {/* DropDown */}

            <Menu as="div" className="relative inline-block text-left">
               <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                     Type of project
                  </Menu.Button>
               </div>

               <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
               >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                     <div className="py-1">
                        <Menu.Item>
                           {({ active }) => (
                              <option
                                 value='DApp'
                                 className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                 )}
                                 onClick={(e) => setProjectType(e.target.value)}
                              >
                                 DApp
                              </option>
                           )}
                        </Menu.Item>
                        <Menu.Item>
                           {({ active }) => (
                              <option
                                 value='Exchange'
                                 className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                 )}
                                 onClick={(e) => setProjectType(e.target.value)}

                              >
                                 Exchange
                              </option>
                           )}
                        </Menu.Item>
                     </div>
                  </Menu.Items>
               </Transition>
            </Menu>
            <button className='flex flex-row justify-center items-center my-5 m-auto p-3 rounded-full cursor-pointer border-amber-50 bg-cyan-800 bg:hover' type="submit">Create</button>

         </form>

      </div>
   )
}

export default CreateNewProject