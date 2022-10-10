import React from "react";
import { useContext } from "react";
import { AlertContext } from "./Context";

const AlertUser = (Incoming) => {
  const Outgoing = (props) => {
    const ContextData = useContext(AlertContext);
    return <Incoming {...props} {...ContextData} />;
  };
  return Outgoing;
};
export default AlertUser;
