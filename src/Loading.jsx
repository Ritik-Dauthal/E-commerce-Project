import React from 'react';
import {ImSpinner} from "react-icons/im";

function Loading(){
  return <div className="text-3xl flex items-center justify-center ">
    <ImSpinner className="animate-spin "/>
  </div>
  
}
export default Loading;
