import React, { useState, useEffect, useContext, useRef } from 'react'
import CustomModal from '../Modal';
import { StateContext } from '../../context/StateProvider'
import { useStateContext } from '../../context/ContextProvider';



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
   for (let i = 0; i < dataSnapshot.length; i++) {
      for (let j = 0; j < dataSnapshot[i].everyHour.length; j++) {
         arr1.push(dataSnapshot[i].everyHour[j].project_general_info[1][liquidity_usd])
         arr.push(dataSnapshot[i].everyHour[j].timestamp)
      }
   }
   setGameList(arr1)
   console.log(gameList)

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





const LiquidityChart = ({ parametr }) => {
   const { viewChart, setViewChart, dataSnapshot } = useContext(StateContext)
   const [gameList, setGameList] = useState([]);
   const { currentMode } = useStateContext();
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

   var lineCustomSeries = [
      {
         dataSource: gameList,
         xName: 'x',
         yName: 'y',
         name: 'Liquidity USD',
         width: '1',
         marker: { visible: true, width: 5, height: 5 },
         type: 'Line'
      },
   ];

   const LinePrimaryXAxis = {
      valueType: 'DateTime',
      labelFormat: 'h',
      intervalType: 'Hours',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 1 },
      background: 'white',
   };

   const LinePrimaryYAxis = {
      labelFormat: '{value}',
      rangePadding: 'None',
      minimum: 0,
      maximum: parseInt(Math.max(gameList)),
      interval: 100,
      lineStyle: { width: 0 },
      majorTickLines: { width: 1 },
      minorTickLines: { width: 2 },
   };

   const getCurrentDate = (newDate) => {
      newDate = new Date(newDate)
      var days = newDate.getDate();
      var month = newDate.getMonth();
      var year = newDate.getFullYear();
      var hours = newDate.getHours();
      const date = (month + 1) + 'm-' + days + 'd-' + hours + 'h'
      return date
   }

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'Chart.js Line Chart',
         },
      },
   };

   const labels = date;

   const data = {
      labels,
      datasets: [
         {
            label: 'Volume 24H USD',
            data: gameList,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
         },
      ],
   };

   useEffect(() => {
      console.log(bool)

      if (typeof parametr === 'string' ) {
         if (bool === false) {
            console.log(parametr)

            getChartLiquidityData(dataSnapshot, setGameList, gameList, date, setDate, parametr)
            setBool(true)
         }

      }
   }, [dataSnapshot, parametr])


   const handleBool = () => {
      
      setBool(false)
      setViewChart(false)
      setGameList([])
      setDate([])
   }

   const profitChartRef = useRef();

   if (profitChartRef?.current) {
      profitChartRef.current.chartInstance.destroy();
   }


   return (
      <CustomModal visible={viewChart} onClose={() => handleBool()}>
         <div className="absolute m-auto bg-[#33373E] left-0 right-0 blur-none z-1000 w-[800px] h-[600px] bg-gray-800 m-auto rounded-lg border-1  pt-8">

            <Line  options={options} data={data} />;

         </div>
      </CustomModal>
   )
}

export default LiquidityChart



//    < ChartComponent
// id = "line-chart"
// height = "420px"
// primaryXAxis = { LinePrimaryXAxis }
// primaryYAxis = { LinePrimaryYAxis }
// chartArea = {{ border: { width: 0 } }}
// tooltip = {{ enable: true }}
// background = { currentMode === "Dark" ? "#33373E" : "#fff"}
// legendSettings = {{ background: "white" }}
//             >
//                <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />

//                <SeriesCollectionDirective>
//                   {
//                      lineCustomSeries.map((item, index) => (

//                         <SeriesDirective key={index} {...item} />
//                      ))
//                   }


//                </SeriesCollectionDirective>
//             </ >