import React, { useState, useEffect, useContext, useRef } from 'react'
import { StateContext } from '../../context/StateProvider'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



export const getChartLiquidityData = (dataSnapshot, setGameList, gameList, date, setDate, liquidity_usd) => {
   var arr = []
   var arr1 = []
   if (liquidity_usd === 'price_usd' || liquidity_usd === 'volume_24h_usd' || liquidity_usd === 'liquidity_usd') {
      for (let i = 0; i < dataSnapshot.length; i++) {
         for (let j = 0; j < dataSnapshot[i].everyHour.length; j++) {
            arr1.push(dataSnapshot[i].everyHour[j].project_general_info[1][liquidity_usd])
            arr.push(dataSnapshot[i].everyHour[j].timestamp)
         }
      }
   } else {
      for (let i = 0; i < dataSnapshot.length; i++) {
         for (let j = 0; j < dataSnapshot[i].everyHour.length; j++) {
            arr1.push(dataSnapshot[i].everyHour[j].project_info[liquidity_usd])
            arr.push(dataSnapshot[i].everyHour[j].timestamp)
         }
      }
   }
   setGameList(arr1)

   for (let k = 0; k < arr.length; k++) {
      date.push(convertStampDate(arr[k]))
   }
   setDate(date)
}


export const convertStampDate = (unixtimestamp) => {
   // Months array
   var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   // Convert timestamp to milliseconds
   var date1 = new Date(unixtimestamp);

   // Year
   var year = date1.getFullYear();

   // Month
   var month = months_arr[date1.getMonth()];

   // Day
   var day = date1.getDate();

   // Hours
   var hours = date1.getHours();

   // Minutes
   var minutes = (date1.getMinutes() >= 10 ? date1.getMinutes() : '0' + date1.getMinutes())

   // Seconds
   var seconds = "0" + date1.getSeconds();

   // Display date time in MM-dd-yyyy h:m:s format
   var fulldate = month + ' ' + day + '-' + year + ' ' + hours + ':'

   // final date
   var convdataTime = month + ' ' + day + ' - ' + hours + ':' + minutes
   return convdataTime;
}





const ChartClassic = ({ parametr }) => {
   const { dataSnapshot } = useContext(StateContext)
   const [gameList, setGameList] = useState([]);
   const [bool, setBool] = useState(false)

   const [date, setDate] = useState([])

   ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
   );

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            // text: 'Chart.js Line Chart',
         },
      },
   };

   const intoLabel = (parametr) => {
      switch (parametr) {
         case 'users_connected_wallet':
            return 'Users connected'
            
         case 'users_with_wallet':
            return 'Users with wallet'
         
         case 'users_without_wallet':
            return 'Users without wallet'
         
         case 'price_usd':
            return 'Price (USD)'
         
         case 'volume_24h_usd':
            return 'Volume 24H (USD)'
         
         case 'liquidity_usd':
            return 'Liquidity (USD)'
         
         default:
            break;
      }
   }

   const labels = date;

   const data = {
      labels,
      datasets: [
         {
            label: intoLabel(parametr),
            data: gameList,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
         },
      ],
   };

   useEffect(() => {

      if (typeof parametr === 'string') {
         if (bool === false) {

            getChartLiquidityData(dataSnapshot, setGameList, gameList, date, setDate, parametr)
            setBool(true)
         }

      }
   }, [dataSnapshot, parametr])


   const profitChartRef = useRef();

   if (profitChartRef?.current) {
      profitChartRef.current.chartInstance.destroy();
   }


   return (
      <div className=" bg-[#33373E] blur-none z-1000 w-[600px] px-3 h-[400px] bg-gray-800 rounded-lg border-1 py-7 mb-8">
         <Line options={options} data={data}/>;

      </div>
   )
}

export default ChartClassic