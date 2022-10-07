import React,{memo} from 'react';

function Noproduct(){
  console.log("noproduct is running")
  return(
    <div className="text-2xl text-primary-dark">
      No product found !!
      kuch orr dekh lo..
    </div>
  )
}
  export default memo(Noproduct);