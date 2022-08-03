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

//sets current user after signing in/out/up a user
  const [currentUser, setCurrentUser] = useState(getCurrentUserInCookie());

  const signIn = (email, password) => {
    return userService
      .signIn(email, password)
      .then(() => {
        setCurrentUser(getCurrentUserInCookie());
      })
      .catch((err) => {
      });
  };
  const signOut = () => {
    return userService
      .signOut()
      .then(() => {
        setCurrentUser(null);
      })
      .catch((err) => {
        setCurrentUser(null);
      });
  };
  const oauth = (token) => {
    return userService
      .oauth(token)
      .then(() => {
        setCurrentUser(getCurrentUserInCookie());
      })
      .catch((err) => {
      });
  };

  return (
    <UserContext.Provider value={{ username: currentUser, signIn, signOut, oauth }}>
      {props.children}
    </UserContext.Provider>
  );
};
