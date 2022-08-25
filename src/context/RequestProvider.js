import React from 'react'

import axios from 'axios'
import { convertStringToValue } from '@syncfusion/ej2/maps';
const qs = require('qs')





// request when user connect the wallet (check ther register and get info about projects)
export const checkRegisterAndGetUserProjects = async (array, setIsUserRegistered, setProjectsInfo, toLocalStore, userAccount) => {
   var data = qs.stringify({
      'wallet_address': array[0]
   });
   var config = {
      method: 'post',
      mode: 'no-cors',
      baseURL: `${process.env.REACT_APP_BACK_URL}/wallets`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config).then(function (response) {

      // check register
      if (response.data.length === 0) {
         setIsUserRegistered(false)
      } else {
         setIsUserRegistered(true)
      }

      // set info into state
      console.log(response, 'info about all user project (need register if null)')
      if (typeof (response.data[1].project_info) !== 'undefined') {
         setProjectsInfo(response.data.project_info)

         //  <= setUserProjectsDataToLocalStore =>
         toLocalStore(response)
         console.log('check register user (request), get all projects')
      }

   }).catch(error => {
      console.log(error)
   })
}


// request for register new user in system
export const registerNewUser = async (account, email, setIsUserRegistered) => {

   var data = qs.stringify({
      'wallet_address': account,
      'email': email
   });

   var config = {
      method: 'post',
      mode: 'no-cors',
      baseURL: `${process.env.REACT_APP_BACK_URL}/send`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config)
      .then(response => {
         console.log(response, 'register new user is success (request)')
         setIsUserRegistered(true)
      })
      .catch(error => {
         console.log(error)
      })
}


// request for register new project in system
export const registerNewProject = async (name, contract, url, type, account, setIsCreate, chain) => {

   
   var data = qs.stringify({
      'project_name': name,
      'token_contract': contract,
      'project_url': url,
      'project_type': type,
      'owner_address': account,
      'chain_id': Number(chain)
   });


   var config = {
      method: 'post',
      mode: 'no-cors',
      baseURL: `${process.env.REACT_APP_BACK_URL}/register_project`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config)
      .then(response => {
         console.log(response, 'register new project is success (request)')
         checkRegisterAndGetUserProjects()
         setIsCreate(true)
      })
      .catch(error => {
         console.log(error)
      })
}



// get current project data 
export const getCurrentProject = async (value, setGeneralData, currentUserProject, setDataSnapshot) => {

   const datas = window.localStorage.getItem('allProjectsData')
   const userProjectsData = JSON.parse(datas)
   console.log(datas)



   var data = qs.stringify({
      'project_id': userProjectsData[value].project_id
   });
   var config = {
      method: 'post',
      baseURL: `${process.env.REACT_APP_BACK_URL}/project_info`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config)
      .then(function (response) {
         console.log(response.data, 'current project (request)')
         window.localStorage.setItem(`currentProject`, JSON.stringify(response.data))

         const datas1 = window.localStorage.getItem(`currentProject`)
         // console.log(currentUserProject, '???')

         const userProjectsData1 = JSON.parse(datas1)
         console.log(datas1)


         let data2 = qs.stringify({
            'token_address': userProjectsData1.token_contract,
            'chain_id': '56'
         })
         var config2 = {
            method: 'post',
            url: `${process.env.REACT_APP_BACK_URL}/token_info`,

            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data2
         }

         axios(config2)
            .then(function (response) {
               // console.log(JSON.stringify(response.data), 'from just watch');
               setGeneralData(response.data)


               console.log(response.data, 'from Moonarch')
            })
            .catch(function (error) {
               console.log(error);
            })


      }
      ).catch(error => {
         console.log(error)
      })
}


export const justWatch = async (value, setGeneralData) => {

   const datas = window.localStorage.getItem(`currentProject_${value}`)
   const userProjectsData = JSON.parse(datas)

   console.log(userProjectsData.token_contract, 'token address')

   var data = qs.stringify({
      'token_address': userProjectsData.token_contract,
      'chain_id': '56'
   });
   console.log(data)
   var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BACK_URL}/token_info`,

      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config)
      .then(function (response) {
         console.log(JSON.stringify(response.data), 'from just watch');
         setGeneralData(response.data)
         console.log(response.data)
      })
      .catch(function (error) {
         console.log(error);
      });
}


// get data_snapshot
export const getDataSnapshot = async (value, setDataSnapshot) => {

   const datas = window.localStorage.getItem('allProjectsData')
   const userProjectsData = JSON.parse(datas)
   console.log(userProjectsData[value].project_id)

   var data = qs.stringify({
      'from_date': '2022-08-12',
      'project_id': userProjectsData[value].project_id
   });
   console.log(data)
   var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BACK_URL}/data_snapshot`,

      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config)
      .then(function (response) {
         console.log(response.data, 'from snapshot');
         setDataSnapshot(response.data)
      })
      .catch(function (error) {
         console.log(error);
      });
}



export const getCurrentProjectbyProjectId = async (project_id, setGeneralData) => {


   var data = qs.stringify({
      'project_id': project_id
   });
   var config = {
      method: 'post',
      baseURL: `${process.env.REACT_APP_BACK_URL}/project_info`,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config)
      .then(function (response) {
         console.log(response.data, 'current project (request)')
         window.localStorage.setItem(`currentProject`, JSON.stringify(response.data))

         const datas1 = window.localStorage.getItem(`currentProject`)
         // console.log(currentUserProject, '???')

         const userProjectsData1 = JSON.parse(datas1)
         console.log(datas1)


         let data2 = qs.stringify({
            'token_address': userProjectsData1.token_contract,
            'chain_id': '56'
         })
         var config2 = {
            method: 'post',
            url: `${process.env.REACT_APP_BACK_URL}/token_info`,

            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data2
         }

         axios(config2)
            .then(function (response) {
               setGeneralData(response.data)

               console.log(response.data, 'from Moonarch')
            })
            .catch(function (error) {
               console.log(error);
            })


      }
      ).catch(error => {
         console.log(error)
      })
}


export const getDataSnapshotbyProjectId = async (project_id, setDataSnapshot) => {


   var data = qs.stringify({
      'from_date': '2022-08-12',
      'project_id': project_id
   });
   console.log(data)
   var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BACK_URL}/data_snapshot`,

      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
   };

   axios(config)
      .then(function (response) {
         console.log(response.data, 'from snapshot');
         setDataSnapshot(response.data)
      })
      .catch(function (error) {
         console.log(error);
      });
}