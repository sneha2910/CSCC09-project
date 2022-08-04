import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

//oauth button to signup/signin with google
export function ULGoogleButton() {
  const navigate = useNavigate();

  const { oauth } = useContext(UserContext);

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);

    const token = response.credential;
    oauth(token)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {});
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
    });
  }, []);

  return (
    <div className="gsibutton">
      <div id="signInDiv"></div>
    </div>
  );
}
