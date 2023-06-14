import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";

export const GoogleButton = () => {
  const { setIsLogged, setUser, setToken } = useContext(LoginContext);
  const urlBase = import.meta.env.VITE_URL_LOCAL;

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
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setToken(data.token);
            setUser(data.user);
            setIsLogged(true);
            navigate("/home", {
              replace: true,
            });
          });
        } else {
          response.json().then((data) => {
            console.error("Error:", data.error);
          });
        }
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
