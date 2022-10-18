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
import UserRoute from "./UserRoute";
import Authroute from "./Authroute";
import Alert from "./Alert";
import UserProvider from "./Provider/UserProvider";
import AlertProvider from "./Provider/AlertProvider";
import CartProvider from "./Provider/CartProvider";

function App() {
  const [menuopen, Setmenu] = useState(false);

  const HamburgerOpen = () => {
    Setmenu(!menuopen);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-scroll bg-gray-200">
      <UserProvider>
        <AlertProvider>
          <CartProvider>
            <Alert />
            <div>
              <Navbar menuopen={menuopen} HamburgerOpen={HamburgerOpen} />
            </div>

            <div className="grow">
              <Routes>
                <Route
                  index
                  element={
                    <UserRoute>
                      <ProductListPage />
                    </UserRoute>
                  }
                ></Route>
                <Route
                  path="/products/:xyz"
                  element={<ProductDetail />}
                ></Route>
                <Route path="*" element={<NoProductFound />}></Route>
                <Route
                  path="/login"
                  element={
                    <Authroute>
                      <Login />
                    </Authroute>
                  }
                ></Route>
                <Route
                  path="/signup"
                  element={
                    <Authroute>
                      <Signup />
                    </Authroute>
                  }
                ></Route>
                <Route path="/forget" element={<Forget />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
              </Routes>
            </div>

            <Footer />
          </CartProvider>
        </AlertProvider>
      </UserProvider>
    </div>
  );
}
export default App;
