import React, { useState} from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import BigNumber from 'bignumber.js'
import {
  stackedPrimaryXAxis,
  stackedPrimaryYAxis,
} from "../../data/dummy";
import { useStateContext } from "../../context/ContextProvider";

const Stacked = ({ width, height }) => {
   const { currentMode } = useStateContext();  

   
   const stackedChartData = [
      [
         { x: 'Jan', y: 111.1 },
         { x: 'Feb', y: 127.3 },
         { x: 'Mar', y: 143.9 },
         { x: 'Apr', y: 159.9 },
         { x: 'May', y: 159.9 },
         { x: 'Jun', y: 159.9 },
         { x: 'July', y: 159.9 },
      ],
      [
         { x: 'Jan', y: 111.1 },
         { x: 'Feb', y: 127.3 },
         { x: 'Mar', y: 143.4 },
         { x: 'Apr', y: 159.9 },
         { x: 'May', y: 159.9 },
         { x: 'Jun', y: 159.9 },
         { x: 'July', y: 159.9 },
      ],
   ];

   const stackedCustomSeries = [

      {
         dataSource: stackedChartData[0],
         xName: 'x',
         yName: 'y',
         name: 'BUSD',
         type: 'StackingColumn',
         background: 'blue',

      },

      {
         dataSource: stackedChartData[1],
         xName: 'x',
         yName: 'y',
         name: 'Base',
         type: 'StackingColumn',
         background: 'red',

      },

   ];
   
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
     >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
