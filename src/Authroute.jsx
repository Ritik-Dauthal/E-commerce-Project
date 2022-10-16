import React from "react";
import { Navigate } from "react-router-dom";
import { WithUser } from "./WithProvider";

const Authroute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default WithUser(Authroute);
