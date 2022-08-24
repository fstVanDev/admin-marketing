import React, { useContext, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { StateContext } from '../context/StateProvider'
import { registerNewProject } from "../context/RequestProvider";
import { useStateContext } from "../context/ContextProvider";


const CreateNewUserProject = () => {

   const { setIsClicked, initialState } = useStateContext();

   const { userAccount,
      projectName, setProjectName,
      tokenContract, setTokenContract,
      projectUrl, setProjectUrl,
      projectType, setProjectType, isUserRegistered
   } = useContext(StateContext)

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
   }


   let createProject = async (event) => {
      event.preventDefault()

      registerNewProject(projectName, tokenContract, projectUrl, projectType, userAccount)
   }

   

  return (
     <>
        <div className="flex justify-end">
           <button className="rounded-lg w-[34px] h-[34px] border-1 text-white hover:bg-main-dark-bg" onClick={() => setIsClicked(initialState)}>
              X
           </button>
        </div>
        <p className='font-semibold text-lg dark:text-gray-200'>Create Project</p>

        <form className='w-[320px] mx-auto mt-5 rounded border-amber-50' onSubmit={createProject}>
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
              placeholder="Contract"
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
                 <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {projectType ? projectType : 'Type of project'}
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
                       <Menu.Item>
                          {({ active }) => (
                             <option
                                value='Gaming'
                                className={classNames(
                                   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                   'block px-4 py-2 text-sm'
                                )}
                                onClick={(e) => setProjectType(e.target.value)}

                             >
                                Gaming
                             </option>
                          )}
                       </Menu.Item>
                    </div>
                 </Menu.Items>
              </Transition>
           </Menu>
           <button
              className='text-xl text-white rounded-lg mt-5 p-3 hover:bg-main-dark-bg w-full hover:bg-light-gray'
              type="submit"
           >
              Create
           </button>

        </form>
     </>
  )
}

export default CreateNewUserProject