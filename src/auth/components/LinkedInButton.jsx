import axios from "axios";
import React, { useEffect } from "react";

export const LinkedInButton = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");

  const u = import.meta.env.VITE_URL_LOCAL;

  const client_id = import.meta.env.VITE_LI_CLIENT;
  const secret_id = import.meta.env.VITE_LI_SECRET;
  const redirect_uri = import.meta.env.VITE_LI_REDIRECT;
  const urlBase = "https://www.linkedin.com/oauth/v2/authorization?";
  const response_type = import.meta.env.VITE_LI_RESPONSE;
  const scope = import.meta.env.VITE_LI_SCOPE;
  const state = import.meta.env.VITE_LI_STATE;

  const url = `${urlBase}response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

  useEffect(() => {
    // Extract the authorization code from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    // Call your backend API to perform token exchange using the authorization code
    console.log(authorizationCode);
    if (authorizationCode) {
      axios
        .post(`${u}/linkedin/`, { code: authorizationCode, id: 968 })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  }, []);

  const handleLoginLinkedIn = () => {
    window.location.href = url;
  };

  return (
    <div>
      <button onClick={handleLoginLinkedIn}>LinkedIn</button>
    </div>
  );
};
