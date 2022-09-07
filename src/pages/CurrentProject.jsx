import React, { useContext } from "react";
import { StateContext } from "../context/StateProvider";
import { TabComponent, TabItemDirective, TabItemsDirective } from "@syncfusion/ej2-react-navigations";

import Moonarch from "./TabsInCurrent/Moonarch";
import Snapshot from "./TabsInCurrent/Snapshot";
import General from "./TabsInCurrent/General";
import AllIn from "./TabsInCurrent/AllIn";
import Loader from "../components/Loader";



const CurrentProject = () => {
   const { generalData, viewCreate, dataSnapshot } = useContext(StateContext)

   let headertext = [
      { text: "General" },
      { text: "Snapshot" },
      { text: "Monarch" },
      { text: 'All In' }
   ];


   return (
      <div className={viewCreate === true ? 'hidden' : 'mt-2 z-0'}>
         {dataSnapshot ? (
            <TabComponent heightAdjustMode="Auto" id="nestedTab1">
               <TabItemsDirective>
                  <TabItemDirective header={headertext[0]} content={General} />
                  <TabItemDirective header={headertext[1]} content={Snapshot} />
                  <TabItemDirective header={headertext[2]} content={Moonarch} />
                  <TabItemDirective header={headertext[3]} content={AllIn} />
               </TabItemsDirective>
            </TabComponent>
         ) : (<Loader />)}
      </div>
   );
};

export default CurrentProject;
