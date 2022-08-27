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

// import {
//    lineCustomSeries,
// } from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";

const LineChart = () => {
   const { currentMode } = useStateContext();
   const { dataSnapshot } = useContext(StateContext)
   const [rend, setRend] = useState([])

   const lineChartData = [
      [],
      [],
      [],
   ]
   console.log(rend, 'haha')

   

   const dataView = () => {
      dataSnapshot[1].everyHour.map((item, index) => (
         setRend(rend.push({ x: `${String(item.timestamp)}`, y: item.project_info.users_without_wallet }))
      ))
      dataSnapshot[1].everyHour.map((item, index) => (
         setRend(rend.push({ x: `${String(item.timestamp)}`, y: item.project_info.users_with_wallet }))
      ))

      dataSnapshot[1].everyHour.map((item, index) => (
         setRend(rend.push({ x: `${String(item.timestamp)}`, y: item.project_info.users_connected_wallet }))
      ))
      console.log(dataSnapshot, 'linechart')
      // setRend(true)
      // return lineChartData
      console.log(rend, 'rend before')

   }

   dataView()


   const lineCustomSeries = [
      {
         dataSource: rend[0],
         xName: 'x',
         yName: 'y',
         name: 'Without wallet',
         width: '2',
         marker: { visible: true, width: 5, height: 5 },
         type: 'Line'
      },

      {
         dataSource: rend[1],
         xName: 'x',
         yName: 'y',
         name: 'With wallet',
         width: '2',
         marker: { visible: true, width: 5, height: 5 },
         type: 'Line'
      },

      {
         dataSource: rend[2],
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
      maximum: 100,
      interval: 5,
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


   return (
      <>
         {/* { dataView() } */}
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
               {console.log(rend, 'rend')}

               {
                  lineCustomSeries.map((item) => (
                     <SeriesDirective key={item.id} {...item} />
                  ))
               }


            </SeriesCollectionDirective>
         </ChartComponent>
      </>
   );
};

export default React.memo(LineChart);
