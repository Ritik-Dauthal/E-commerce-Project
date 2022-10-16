import React from "react";
import { useContext } from "react";
import { userContext } from "./Context";

const WithUser = (Incoming) => {
  const Outgoing = (props) => {
    const ContextData = useContext(userContext);
    return <Incoming {...props} {...ContextData} />;
  };
  return Outgoing;
};
export default WithUser;
