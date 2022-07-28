import { useEffect, useState} from 'react';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    /* Extract username from cookie */
    const username = document.cookie.split("; ").find((cookie) => {
      return cookie.startsWith("username=");
    });
    if (username) {
      setCurrentUser(username.split("=")[1]);
    }
  }, []);


  return {
    currentUser,
  };
};