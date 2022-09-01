import React, { useEffect, useContext } from 'react'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { StateContext } from '../context/StateProvider';

const DatePicker = () => {
   const { date, setDate, dataSnapshot } = useContext(StateContext)

   useEffect(() => {

      var date1 = new Date(date)
     
      var days = date1.getDate();
      var month = date1.getMonth();
      var year = date1.getFullYear();
      const a = year + '-' + (month + 1) + '-' + days

      setDate(a)

   }, [date])


   const dateFromSnapshot = () => {
      let arr = []
      dataSnapshot.map((item) => {
          arr.push(item.date)
      })
    return arr
   }

   

   return (
      <div>
         <Flatpickr
            value={date}
            placeholder={dataSnapshot[dataSnapshot.length - 1].date}
            onChange={(_, str) => setDate(str)}
            options={{
               // to minDate => date start project 
               minDate: dataSnapshot[0].date,
               maxDate: dataSnapshot[dataSnapshot.length - 1].date,
               dateFormat: "Y-m-d",
               enable: dateFromSnapshot(),
                mode: "range"
            }}
            className='text-gray-200 w-[120px] rounded-xl px-auto text-center h-[34px] text-base border-1 bg-secondary-dark-bg'
         />
      </div>
   )
}

export default DatePicker