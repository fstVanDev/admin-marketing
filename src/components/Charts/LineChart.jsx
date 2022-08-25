import React, { useContext } from "react";
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

import {
   lineCustomSeries,
} from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";

const LineChart = () => {
   const { currentMode } = useStateContext();
   const { dataSnapshot } = useContext(StateContext)

   const lineChartData = [
      // without wallet
      [],

      // with wallet
      [],

      // connected wallet
      [],
   ];

   dataSnapshot.map((item) => (
      lineChartData[0].push({ x: item.timestamp, y: item.users_without_wallet })
   ))
   dataSnapshot.map((item) => (
      lineChartData[1].push({ x: item.timestamp, y: item.users_with_wallet })))

   dataSnapshot.map((item) => (
      lineChartData[2].push({ x: item.timestamp, y: item.users_connected_wallet })))


   const lineCustomSeries = [
      {
         dataSource: lineChartData[0],
         xName: 'x',
         yName: 'y',
         name: 'Without wallet',
         width: '2',
         marker: { visible: true, width: 10, height: 10 },
         type: 'Line'
      },

      {
         dataSource: lineChartData[1],
         xName: 'x',
         yName: 'y',
         name: 'With wallet',
         width: '2',
         marker: { visible: true, width: 10, height: 10 },
         type: 'Line'
      },

      {
         dataSource: lineChartData[2],
         xName: 'x',
         yName: 'y',
         name: 'Connected wallet',
         width: '3',
         marker: { visible: true, width: 10, height: 10 },
         type: 'Line'
      },

   ];

   const LinePrimaryXAxis = {
      valueType: 'DateTime',
      labelFormat: 'y',
      intervalType: 'Years',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 },
      background: 'white',
   };

   const LinePrimaryYAxis = {
      labelFormat: '{value}',
      rangePadding: 'None',
      minimum: 0,
      maximum: 300,
      interval: 50,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
   };

   const dataView = () => {
      dataSnapshot.map((item) => (
         lineChartData[0].push({ x: item.timestamp, y: item.users_without_wallet })
      ))
      dataSnapshot.map((item) => (
         lineChartData[1].push({ x: item.timestamp, y: item.users_with_wallet })))

      dataSnapshot.map((item) => (
         lineChartData[2].push({ x: item.timestamp, y: item.users_connected_wallet })))
      return lineChartData
   }




   return (
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
            {/* {dataView()} */}
            {lineCustomSeries.map((item, index) => (
               <SeriesDirective key={index} {...item} />
            ))}
         </SeriesCollectionDirective>
      </ChartComponent>
   );
};

export default LineChart;
