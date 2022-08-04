import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

//oauth button to signup/signin with google
export function ULGoogleButton() {
  const navigate = useNavigate();

  const { oauth } = useContext(UserContext);

  function handleCallbackResponse(response) {
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
      shape: "pill",
    });
  });

  return (
    <div className="gsibutton">
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div id="signInDiv"></div>
    </div>
  );
}
