import React, { useState, useEffect, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { getProductData } from "./api";
import Loading from "./Loading";
import NoProductFound from "./NoProductFound";
import { AiFillHome } from "react-icons/ai";
import { WithCart } from "./WithProvider";

function ProductDetail({ handleAddToCart }) {
  const params = useParams();
  const id = +params.xyz;
  const [Product, Setproduct] = useState();
  const [loading, Setloading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(
    function () {
      const d = getProductData(id);
      d.then(function (data) {
        Setproduct(data);
        Setloading(false);
      }).catch(function () {
        Setloading(false);
      });
    },
    [id]
  );
  function handleitemchange() {
    setCount(1);
    Setloading(true);
  }

  function handleCountChange(event) {
    setCount(+event.target.value);
  }
  function handleButtonClick() {
    handleAddToCart(id, count);
  }

  if (loading) {
    return <Loading />;
  }
  if (!Product) {
    return <NoProductFound />;
  }

  return (
    <>
      <div className="flex justify-between px-2">
        <div>
          {id > 1 && (
            <Link to={"/products/" + (id - 1)}>
              <BsArrowLeftCircleFill
                onClick={handleitemchange}
                className="text-8xl md:text-4xl"
              />
            </Link>
          )}
        </div>
        <div>
          <Link to={"/products/" + (id + 1)}>
            <BsArrowRightCircleFill
              onClick={handleitemchange}
              className="text-8xl md:text-4xl"
            />
          </Link>
        </div>
      </div>
      <div className="h-screen bg-blue-200 ">
        <div className="h-1/2 aspect-square">
          <img className="object-cover w-full h-full" src={Product.thumbnail} />
        </div>
        <div className="h-1/2">
          <div className="text-4xl text-gray-500 md:text-2xl">
            Category - {Product.category}
          </div>
          <div className="mt-2 text-4xl font-bold text-green-700 md:text-2xl">
            Title - {Product.title}
          </div>
          <div className="mt-2 text-4xl font-bold md:text-2xl text-cyan-600">
            Stock - {Product.stock}
          </div>
          <div className="mt-2 text-4xl font-bold text-blue-600 md:text-2xl">
            Description - {Product.description}
          </div>
          <div className="mt-2 text-4xl font-bold text-red-700 md:text-2xl">
            Discount - {Product.discountPercentage}
          </div>
          <div className="mt-2 text-4xl font-bold text-gray-800 md:text-2xl">
            ${Product.price}
          </div>
          <div className="mt-2 text-4xl text-green-900 md:text-2xl">
            Rating - {Product.rating}
          </div>
          <div className="flex flex-col mt-4 lg:flex-row">
            <div>
              <Link to="/">
                <AiFillHome className="text-8xl md:text-4xl" />
              </Link>
            </div>
            <div className="mt-2 lg:mt-0">
              <button
                onClick={handleButtonClick}
                className="px-2 text-4xl text-white rounded-md md:text-2xl bg-primary-dark"
              >
                Add to cart
              </button>
              <input
                onChange={handleCountChange}
                className="text-4xl font-bold text-black border-gray-400 border-3 md:text-2xl w-14 "
                type="number"
                value={count}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WithCart(memo(ProductDetail));
