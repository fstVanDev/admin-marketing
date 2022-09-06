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
import { useStateContext } from '../../context/ContextProvider';

const LiquidityChart = () => {
   const { viewChart, setViewChart, dataSnapshot } = useContext(StateContext)
   const [gameList, setGameList] = useState([]);
   const { currentMode } = useStateContext();



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
      majorGridLines: { width: 0 },
      background: 'white',
   };

   const LinePrimaryYAxis = {
      labelFormat: '{value}',
      rangePadding: 'None',
      minimum: 0,
      maximum: Math.max(...gameList).toFixed(0),
      interval: (Math.max(...gameList) / 10).toFixed(0),
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
   };



   useEffect(() => {
      const getLiquidity = () => {


         for (let i = 0; i < dataSnapshot.length; i++) {
            for (let j = 0; j < dataSnapshot[i].everyHour.length; j++) {
               gameList.push(dataSnapshot[i].everyHour[j].project_general_info[1].liquidity_usd)
            }
         }
         console.log(gameList)

      }
      getLiquidity()
   }, [dataSnapshot])


   return (
      <CustomModal visible={viewChart} onClose={() => setViewChart(false)}>
         <div className="absolute m-auto bg-[#33373E] left-0 right-0 blur-none z-1000 w-[800px] h-[600px] bg-gray-800 m-auto rounded-lg border-1  pt-8">
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


         </div>
      </CustomModal>
   )
}

export default LiquidityChart