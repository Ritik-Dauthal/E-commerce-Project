import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductListPage from "./ProductListPage";
import ProductDetail from "./ProductDetail";
import { Routes, Route } from "react-router-dom";
import NoProductFound from "./NoProductFound";
import { useState } from "react";
import CartPage from "./CartPage";
import Login from "./login";
import Signup from "./signup";
import Forget from "./Forget";
import { useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import UserRoute from "./UserRoute";
import Authroute from "./Authroute";

function App() {
  const [menuopen, Setmenu] = useState(false);
  const savedDataString = localStorage.getItem("my-Cart") || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);
  const [user, setuser] = useState();
  const [loadinguser, SetloadingUser] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setuser(response.data);
          SetloadingUser(false);
        });
    } else {
      SetloadingUser(false);
    }
  }, []);

  function handleAddToCart(productId, count) {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: oldCount + count };

    updateCart(newCart);
  }
  function updateCart(newCart) {
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("my-Cart", cartString);
  }

  const totalCount = Object.keys(cart).reduce(function (previous, current) {
    return previous + cart[current];
  }, 0);

  const HamburgerOpen = () => {
    Setmenu(!menuopen);
  };
  if (loadinguser) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-screen overflow-y-scroll bg-gray-200">
      <div>
        <Navbar
          menuopen={menuopen}
          HamburgerOpen={HamburgerOpen}
          productCount={totalCount}
          user={user}
        />
      </div>

      <div className="grow">
        <Routes>
          <Route
            index
            element={
              <UserRoute user={user}>
                <ProductListPage user={user} setuser={setuser} />
              </UserRoute>
            }
          ></Route>
          <Route
            path="/products/:xyz"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          ></Route>
          <Route path="*" element={<NoProductFound />}></Route>
          <Route
            path="/login"
            element={
              <Authroute user={user}>
                <Login setuser={setuser} />
              </Authroute>
            }
          ></Route>
          <Route path="/signup" element={<Signup setuser={setuser} />}></Route>
          <Route path="/forget" element={<Forget />}></Route>
          <Route
            path="/cart"
            element={<CartPage cart={cart} updateCart={updateCart} />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
