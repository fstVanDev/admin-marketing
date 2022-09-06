import React, { useState, useEffect, useContext } from 'react'
import CustomModal from '../Modal';
import { StateContext } from '../../context/StateProvider'
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

const LiquidityChart = () => {
   const { viewChart, setViewChart, dataSnapshot } = useContext(StateContext)



   // var lineCustomSeries = [
   //    {
   //       dataSource: gameList[0],
   //       xName: 'x',
   //       yName: 'y',
   //       name: 'Liquidity',
   //       width: '1',
   //       marker: { visible: true, width: 5, height: 5 },
   //       type: 'Line'
   //    },
   // ];

   // const LinePrimaryXAxis = {
   //    valueType: 'DateTime',
   //    labelFormat: 'h',
   //    intervalType: 'Hours',
   //    edgeLabelPlacement: 'Shift',
   //    majorGridLines: { width: 0 },
   //    background: 'white',
   // };

   // const LinePrimaryYAxis = {
   //    labelFormat: '{value}',
   //    rangePadding: 'None',
   //    minimum: 0,
   //    maximum: 1000,
   //    interval: 100,
   //    lineStyle: { width: 0 },
   //    majorTickLines: { width: 0 },
   //    minorTickLines: { width: 0 },
   // };

   const getLiquidity = () => {

      let luquidity = []

      for (let i = 0; i < dataSnapshot.length; i++) {
         for (let j = 0; j < dataSnapshot[i].everyHour.length; j++) {
            dataSnapshot[i].everyHour[j].map((item) => {
               luquidity.push(item)
            })
         }
      }
      console.log(luquidity)
   }

   // useEffect(() => {

   //    getLiquidity()
   // }, [dataSnapshot])


   return (
      <CustomModal visible={viewChart} onClose={() => setViewChart(false)}>
         <div className="absolute m-auto left-0 right-0 blur-none z-1000 w-[400px] h-[400px] bg-gray-800 m-auto rounded-lg border-1">

            <button onClick={() => getLiquidity()}>Get Liq</button>

         </div>
      </CustomModal>
   )
}

export default LiquidityChart