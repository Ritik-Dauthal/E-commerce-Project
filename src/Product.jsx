import React, { memo } from "react";
import { Link } from "react-router-dom";

function Product({ thumbnail, title, category, price, id }) {
  return (
    <div className="mt-4 h-fit lg:mt-0 lg:h-fit">
      <div className="h-1/2 aspect-square">
        <img className="object-cover w-full h-full" src={thumbnail} />
      </div>
      <div className="h-1/2">
        <div className="mt-2 text-xl text-gray-600 lg:mt-0 lg:text-base ">
          {category}
        </div>
        <div className="mt-2 text-xl font-bold lg:mt-0 lg:text-base">
          {title}
        </div>
        <div className="mt-2 mb-4 text-xl font-bold lg:mt-0 lg:text-base lg:mb-4">
          ${price}
        </div>
        <Link
          className="px-2 py-1 text-xl text-white rounded-lg lg:text-base border-3 bg-primary-dark"
          to={"/products/" + id}
        >
          View Detail
        </Link>
      </div>
    </div>
  );
}
export default memo(Product);
