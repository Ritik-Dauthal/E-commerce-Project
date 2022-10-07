import React from "react";
import { Link } from "react-router-dom";

const Hamburger = ({ setuser, user }) => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setuser(undefined);
  };

  return (
    <div className="flex flex-col">
      <Link className="font-bold" to="/">
        Home
      </Link>
      <Link className="font-bold" to="/login">
        Login
      </Link>
      <Link className="font-bold" to="/signup">
        SignUp
      </Link>
      <Link className="font-bold" to="/forget">
        Forget Password?
      </Link>
      {user && (
        <div>
          <button
            onClick={handleLogOut}
            className="px-2 font-semibold text-white bg-primary-dark"
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};
export default Hamburger;
