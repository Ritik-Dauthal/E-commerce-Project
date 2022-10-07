import React, { memo } from 'react';
import {Link} from 'react-router-dom';

function NoProductFound(){
  return(
    <div className="flex flex-col items-center justify-center">
      <img className="w-80"src="https://img.freepik.com/free-vector/404-error-abstract-concept-illustration_335657-2243.jpg?w=2000"/> 
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl text-primary-dark">something went wrong !!</h1>
      <Link className="px-3 text-white bg-black border-4" to="/" >Go Home</Link>
        </div>
    </div>
  )
}
export default memo(NoProductFound);