import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import userService from '../services/userService.js';

export function ULGoogleButton() {
  const navigate = useNavigate();

  function handleCallbackResponse(response){
    var userObject =  jwt_decode(response.credential);
    console.log(userObject);

    const token = response.credential;
    userService.oauth(token)
    .catch(error => {
      console.log(error);
    })
    .then(() => {
        console.log("Oauth logged in!");
        navigate("/");
  });
  }

  useEffect(() => {
  /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );
}, []);

return(
  <div className='gsibutton'>
    <div id="signInDiv"></div>
  </div>
);
}


// const refreshTokenSetup = response => {
//   let refreshTiming = (response.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    
//   const refreshToken = async () => {
//   const newAuthRes = await response.reloadAuthResponse();
//   refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
//   console.log('newAuthRes:', newAuthRes);
//   // saveUserToken(newAuthRes.access_token);  <-- save new token
//   localStorage.setItem('authToken', newAuthRes.id_token);

//   // Setup the other timer after the first one
//   setTimeout(refreshToken, refreshTiming);
// };

// // Setup first refresh timer
// setTimeout(refreshToken, refreshTiming);
// };
//  refreshTokenSetup(response);