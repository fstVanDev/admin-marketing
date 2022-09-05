import React, { useContext } from "react";
import { StateContext } from "../context/StateProvider";
import { TabComponent, TabItemDirective, TabItemsDirective } from "@syncfusion/ej2-react-navigations";

import Moonarch from "./TabsInCurrent/Moonarch";
import Snapshot from "./TabsInCurrent/Snapshot";
import General from "./TabsInCurrent/General";
import Loader from "../components/Loader";



const CurrentProject = () => {
   const { generalData } = useContext(StateContext)

   let headertext = [
      { text: "General" },
      { text: "Snapshot" },
      { text: "Monarch" },
   ];


   return (
      <div className="relative mt-24 z-0">
         {generalData ? (
            <TabComponent heightAdjustMode="Auto" id="nestedTab1">
               <TabItemsDirective >
                  <TabItemDirective header={headertext[0]} content={General} />
                  <TabItemDirective header={headertext[1]} content={Snapshot} />
                  <TabItemDirective header={headertext[2]} content={Moonarch} />
               </TabItemsDirective>
            </TabComponent>
         ) : (<Loader />)}
      </div>
   );
};

export default CurrentProject;
