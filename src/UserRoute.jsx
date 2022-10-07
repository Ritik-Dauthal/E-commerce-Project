import React from "react";
import { Children } from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default UserRoute;
