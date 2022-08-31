import React, { useContext, useEffect, useState } from "react";
import {
   ChartComponent,
   SeriesCollectionDirective,
   SeriesDirective,
   Inject,
   LineSeries,
   DateTime,
   Legend,
   Tooltip,
} from "@syncfusion/ej2-react-charts";
import { StateContext } from '../../context/StateProvider'
import { useStateContext } from "../../context/ContextProvider";
import { getDataSnapshotbyProjectId } from "../../context/RequestProvider";

const LineChart = () => {
   const { currentMode } = useStateContext();
   const { dataSnapshot, setDataSnapshot } = useContext(StateContext)
   const [gameList, setGameList] = useState([]);




   var lineCustomSeries = [
      {
         dataSource: gameList[0],
         xName: 'x',
         yName: 'y',
         name: 'Without wallet',
         width: '2',
         marker: { visible: true, width: 5, height: 5 },
         type: 'Line'
      },

      {
         dataSource: gameList[1],
         xName: 'x',
         yName: 'y',
         name: 'With wallet',
         width: '2',
         marker: { visible: true, width: 5, height: 5 },
         type: 'Line'
      },

      {
         dataSource: gameList[2],
         xName: 'x',
         yName: 'y',
         name: 'Connected wallet',
         width: '2',
         marker: { visible: true, width: 5, height: 5 },
         type: 'Line'
      },

   ];

   const LinePrimaryXAxis = {
      valueType: 'DateTime',
      labelFormat: 'h',
      intervalType: 'Hours',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 },
      background: 'white',
   };

   const LinePrimaryYAxis = {
      labelFormat: '{value}',
      rangePadding: 'None',
      minimum: 0,
      maximum: 10000,
      interval: 1000,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
   };

   const Loader = () => {
      return (
         <div className="flex items-center justify-center ">
            <div className="w-16 h-16 border-b-4 border-yellow-900 rounded-full animate-spin"></div>
         </div>
      )
   }


   useEffect(() => {
      const fetchData = async () => {

         try {
          
            let a = []
            let b = []
            let c = []

            dataSnapshot[1].everyHour.map((item, index) => (
               a.push({ x: `${new Date(item.timestamp)}`, y: parseInt(item.project_general_info[1].liquidity).toFixed(2) })
            ))
            dataSnapshot[1].everyHour.map((item, index) => (
               b.push({ x: `${new Date(item.timestamp)}`, y: parseInt(item.project_general_info[1].liquidity_usd).toFixed(2) })
            ))
            dataSnapshot[1].everyHour.map((item, index) => (
               c.push({ x: `${new Date(item.timestamp)}`, y: parseInt(item.project_general_info[1].volume_24h_usd).toFixed(2) })
            ))
            console.log('2')
            console.log(dataSnapshot)
            await setGameList(gameList => [...gameList, a]);
            await setGameList(gameList => [...gameList, b]);
            await setGameList(gameList => [...gameList, c]);
            console.log(gameList)
         } catch (e) {
            console.log(e.message)
         }
      }
      fetchData()
   }, [setGameList])


   return (
      <>
         {/* {dataView()} */}
         <ChartComponent
            id="line-chart"
            height="420px"
            primaryXAxis={LinePrimaryXAxis}
            primaryYAxis={LinePrimaryYAxis}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={currentMode === "Dark" ? "#33373E" : "#fff"}
            legendSettings={{ background: "white" }}
         >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />

            <SeriesCollectionDirective>
               {
                  lineCustomSeries.map((item, index) => (

                     <SeriesDirective key={index} {...item} />
                  ))
               }


            </SeriesCollectionDirective>
         </ChartComponent>
      </>
   );
};

export default LineChart;
