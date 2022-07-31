import { createContext, useState } from "react";
import userService from "../services/userService.js";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const getCurrentUserInCookie = () => {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  };
  const [currentUser, setCurrentUser] = useState(getCurrentUserInCookie());

  const signIn = (email, password) => {
    return userService
      .signIn(email, password)
      .then(() => {
        setCurrentUser(getCurrentUserInCookie());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signOut = () => {
    return userService
      .signOut()
      .then(() => {
        setCurrentUser(null);
      })
      .catch((err) => {
        console.log(err);
        setCurrentUser(null);
      });
  };

  return (
    <UserContext.Provider value={{ username: currentUser, signIn, signOut }}>
      {props.children}
    </UserContext.Provider>
  );
};
