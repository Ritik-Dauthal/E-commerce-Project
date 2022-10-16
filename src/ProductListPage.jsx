import React, { useState, useEffect, useCallback } from "react";
import ProductList from "./ProductList";
import Noproduct from "./Noproduct";
import { getProductList } from "./api";
import Loading from "./Loading";
import FancyInput from "./FancyInput";
import { WithUser } from "./WithProvider";
import { range } from "lodash";
import { Link, useSearchParams } from "react-router-dom";

function ProductListPage({ user, setuser }) {
  const [productlist, setProductlist] = useState({});
  const [loading, setloading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  let { sort, query, page } = params;

  sort = sort || "default";
  query = query || "";
  page = +page || 1;

  useEffect(
    function () {
      let sortBy;
      let sortType;

      if (sort == "title") {
        sortBy = "title";
      } else if (sort == "pricei") {
        sortBy = "price";
      } else if (sort == "priced") {
        sortBy = "price";
        sortType = "desc";
      }

      getProductList(sortBy, query, page, sortType).then(function (response) {
        setProductlist(response);
        setloading(false);
      });
    },
    [sort, query, page]
  );
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setuser(undefined);
  };

  const handlechange = useCallback(
    function (event) {
      setSearchParams({ ...params, query: event.target.value, page: 1 });
    },
    [query]
  );

  const sortchange = useCallback(
    function (event) {
      setSearchParams({ ...params, sort: event.target.value });
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

      {productlist.data.length > 0 && (
        <ProductList products={productlist.data} />
      )}
      {productlist.data == 0 && <Noproduct />}
      {range(1, productlist.meta.last_page + 1).map((item) => (
        <Link
          to={"?" + new URLSearchParams({ ...params, page: item })}
          className={
            "p-2 m-1 mt-10 text-white " +
            (item === page ? "bg-primary-dark" : "bg-gray-700")
          }
          key={item}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}

export default WithUser(ProductListPage);
