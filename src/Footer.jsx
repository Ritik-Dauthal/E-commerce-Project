import React, { memo } from 'react';

function Footer(){
 
  return(
    <div className="flex h-16 py-4 bg-gray-300">
    <div className="ml-60">Copyright@2022|Codeyogi</div>
    <span className="grow"></span>
    <div className="mr-60">Powrerd By Codeyogi</div>
      </div>
  )
}
export default memo(Footer) ;