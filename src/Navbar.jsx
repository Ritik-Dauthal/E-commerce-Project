import React, { memo } from "react";
import { HiShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import Hamburger from "./HamburgerIcon";
import { VscAccount } from "react-icons/vsc";
function Navbar({ productCount, HamburgerOpen, menuopen, user }) {
  return (
    <div className="py-4 bg-gray-100 ">
      <div className="flex justify-between max-w-6xl mx-auto">
        <img
          className="w-40"
          src="https://media.discordapp.net/attachments/1005128452661321848/1027862284162310175/IMG-20221007-WA0000.jpg"
        />
        <div className="flex space-x-2">
          <div>
            <VscAccount className="text-3xl " onClick={HamburgerOpen} />
            {menuopen && <Hamburger />}
          </div>
          {user && (
            <div>
              <Link to="/cart">
                <HiShoppingBag className="text-3xl border-4 border-primary-default" />
              </Link>
              <div className="text-center text-white border border-md bg-primary-dark">
                {productCount}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default memo(Navbar);
