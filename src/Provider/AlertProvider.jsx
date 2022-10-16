import React, { useState } from "react";
import { AlertContext } from "../Context";

const AlertProvider = ({ children }) => {
  const [alert, SetAlert] = useState();

  const removeAlert = () => {
    SetAlert(undefined);
  };

  return (
    <AlertContext.Provider value={{ alert, SetAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertProvider;
