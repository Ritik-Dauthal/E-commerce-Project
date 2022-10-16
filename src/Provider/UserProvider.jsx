import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { userContext } from "../Context";

const UserProvider = ({ children }) => {
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
        })
        .catch(() => {
          localStorage.removeItem("token");
          SetloadingUser(false);
        });
    } else {
      SetloadingUser(false);
    }
  }, []);

  if (loadinguser) {
    return <Loading />;
  }
  return (
    <userContext.Provider value={{ LoggedIn: !!token, user, setuser }}>
      {children}
    </userContext.Provider>
  );
};
export default UserProvider;
