import React from "react";
import { useContext } from "react";
import { AlertContext, CartContext, userContext } from "./Context";

const WithProvider = (IncomingProvider) => (Incoming) => (props) => {
  const ContextData = useContext(IncomingProvider);
  return <Incoming {...props} {...ContextData} />;
};
export default WithProvider;

export const AlertUser = WithProvider(AlertContext);
export const WithUser = WithProvider(userContext);
export const WithCart = WithProvider(CartContext);
