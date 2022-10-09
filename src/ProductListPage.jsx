import React, { useState, useEffect, useCallback } from "react";
import ProductList from "./ProductList";
import Noproduct from "./Noproduct";
import { getProductList } from "./api";
import Loading from "./Loading";
import FancyInput from "./FancyInput";
import { Navigate } from "react-router-dom";

function ProductListPage({ user, setuser }) {
  const [productlist, setProductlist] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(function () {
    const p = getProductList();
    p.then(function (products) {
      setProductlist(products);
      setloading(false);
    });
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setuser(undefined);
  };

  const [query, setQuery] = useState("");
  const [sort, setsort] = useState("default");

  const data = productlist.filter(function (item) {
    return item.title.toLowerCase().indexOf(query.toLowerCase()) != -1;
  });

  if (sort == "title") {
    data.sort(function (x, y) {
      return x.title > y.title ? -1 : 1;
    });
  } else if (sort == "pricei") {
    data.sort(function (x, y) {
      return x.price - y.price;
    });
  } else if (sort == "priced") {
    data.sort(function (x, y) {
      return y.price - x.price;
    });
  }

  const handlechange = useCallback(
    function (event) {
      setQuery(event.target.value);
    },
    [query]
  );

  const sortchange = useCallback(
    function (event) {
      console.log("sortchange is running usecallback");
      setsort(event.target.value);
    },
    [sort]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-2 max-w-6xl mx-auto bg-white px-9 py-[50px}">
      <div className="text-4xl font-bold text-center md:text-3xl text-primary-dark animate-bounce">
        Welcome, {user.full_name}
      </div>
      <div className="flex">
        <div className="flex flex-col mb-2 lg:flex-row">
          <FancyInput
            placeholder="search"
            onChange={handlechange}
            value={query}
          />

          <select
            className="w-40 border border-gray-700 rounded-md "
            onChange={sortchange}
            value={sort}
          >
            <option value="default">Default sort</option>
            <option value="title">title</option>
            <option value="pricei">price:low to high </option>
            <option value="priced">price:high to low</option>
          </select>
        </div>
        <span className="grow"></span>
        <div>
          <button
            onClick={handleLogOut}
            className="px-2 text-4xl font-semibold text-white md:text-xl bg-primary-dark"
          >
            LogOut
          </button>
        </div>
      </div>

      {data.length > 0 && <ProductList products={data} />}
      {data.length == 0 && <Noproduct />}
    </div>
  );
}

export default ProductListPage;
