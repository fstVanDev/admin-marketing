import React from 'react'

import axios from 'axios'
const qs = require('qs')



// request when user connect the wallet (check ther register and get info about projects)
export const checkRegisterAndGetUserProjects = async (array, setIsUserRegistered, setProjectsInfo, toLocalStore) => {

   var data = qs.stringify({
      'wallet_address': array[0]
   });
   var config = {
      method: 'post',
      baseURL: `${process.env.REACT_APP_BACK_URL}/wallets`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config).then(function (response) {

      // check register
      setIsUserRegistered(response.data)

      // set info into state
      console.log(response.data[1].project_info, 'info about all user project (need register if null)')
      setProjectsInfo(response.data[1].project_info)


      //  <= setUserProjectsDataToLocalStore =>
      toLocalStore(response)
      console.log('check register user (request), get all projects')


   }).catch(error => {
      console.log(error)
   })
}


// request for register new user in system
export const registerNewUser = async (name, contract, url, type, account) => {

   var data = qs.stringify({
      'project_name': name,
      'token_contract': contract,
      'project_url': url,
      'project_type': type,
      'owner_address': account
   });
   

   var config = {
      method: 'post',
      baseURL: `${process.env.REACT_APP_BACK_URL}/register_project`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config)
      .then(response => {
         console.log(response, 'register new user is success (request)')
      })
      .catch(error => {
         console.log(error)
      })
}



// request when user click on one of his project (all info about current project)
export const getDataFromCurrentProject = async (projectsInfo, value, toLocalStore, setCurrentUserProject) => {

   var data = qs.stringify({
      'project_id': projectsInfo[value].project_id
   });
   var config = {
      method: 'post',
      baseURL: `${process.env.REACT_APP_BACK_URL}/project_info`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config).then(function (response) {
      // set info about current project
      setCurrentUserProject(response.data)

      // <= setUserCurrentProjectDataToLocalStore =>
      toLocalStore(response)

      console.log('get data from current project (request)')

   }).catch(error => {
      console.log(error)
   })
}


