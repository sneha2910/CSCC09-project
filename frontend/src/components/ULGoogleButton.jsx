import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService.js";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export function ULGoogleButton() {
  const navigate = useNavigate();

  const { oauth } = useContext(UserContext);

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);

    const token = response.credential;
    oauth(token)
      .then((res) => {
        console.log("Oauth logged in!", document.cookie);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      shape: "pill",
    });
  }, []);

  return (
    <div className="gsibutton">
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div id="signInDiv"></div>
    </div>
  );
}
