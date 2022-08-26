import React, { useState } from "react";
import {
   ChartComponent,
   SeriesCollectionDirective,
   SeriesDirective,
   Inject,
   Legend,
   Category,
   Tooltip,
   ColumnSeries,
   DataLabel,
} from "@syncfusion/ej2-react-charts";
import BigNumber from 'bignumber.js'
import {
   // barCustomSeries,
   barPrimaryXAxis,
   barPrimaryYAxis,
} from "../../data/dummy";
import { ChartsHeader } from "../../components";
import { useStateContext } from "../../context/ContextProvider";
import { ethers } from "ethers";

const Bar = () => {
   const { currentMode } = useStateContext();
   






   const barChartData = [
      [
         { x: 'CAKE/WBNB', y: 35 },
         { x: 'BUSD-T/CAKE', y: 21 },
         { x: 'hello', y: 26 },
      ],
      [
         { x: 'Cake/WBNB', y: 37 },
         { x: 'BUSD-T/CAKE', y: 23 },
         { x: 'hello', y: 18 },
      ],
      [
         { x: 'Cake/WBNB', y: 38 },
         { x: 'BUSD-T/CAKE', y: 17 },
         { x: 'hello', y: 26 },
      ],
   ];

   const barCustomSeries = [
      {
         dataSource: barChartData[0],
         xName: 'x',
         yName: 'y',
         name: 'BUSD',
         type: 'Column',
         marker: {
            dataLabel: {
               visible: true,
               position: 'Top',
               font: { fontWeight: '600', color: '#ffffff' },
            },
         },
      },
      {
         dataSource: barChartData[1],
         xName: 'x',
         yName: 'y',
         name: 'Silver',
         type: 'Column',
         marker: {
            dataLabel: {
               visible: true,
               position: 'Top',
               font: { fontWeight: '600', color: '#ffffff' },
            },
         },
      },
      // {
      //    dataSource: barChartData[2],
      //    xName: 'x',
      //    yName: 'y',
      //    name: 'Bronze',
      //    type: 'Column',
      //    marker: {
      //       dataLabel: {
      //          visible: true,
      //          position: 'Top',
      //          font: { fontWeight: '600', color: '#ffffff' },
      //       },
      //    },
      // },
   ];

   return (
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
         <ChartsHeader category="Bar" title="Top 3 Pool" />
         <div className=" w-full">
            <ChartComponent
               id="charts"
               primaryXAxis={barPrimaryXAxis}
               primaryYAxis={barPrimaryYAxis}
               chartArea={{ border: { width: 0 } }}
               tooltip={{ enable: true }}
               background={currentMode === "Dark" ? "#33373E" : "#fff"}
               legendSettings={{ background: "white" }}
            >

               <Inject
                  services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
               />
               <SeriesCollectionDirective>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  {barCustomSeries.map((item, index) => (
                     <SeriesDirective key={index} {...item} />
                  ))}
               </SeriesCollectionDirective>
            </ChartComponent>
         </div>
      </div>
   );
};

export default Bar;
