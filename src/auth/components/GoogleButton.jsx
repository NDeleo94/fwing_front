import { useEffect } from "react";

const urlBase = import.meta.env.VITE_URL_LOCAL;

export const GoogleButton = () => {
  const handleCredentialResponse = (response) => {
    const userObject = response.credential;
    const url = `${urlBase}/google/`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Login successfully:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "88215929636-o3hln0vhbhn9pmojgem8bveb6079avj6.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleButton"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return <div id="googleButton"></div>;
};
