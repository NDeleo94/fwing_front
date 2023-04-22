import { useEffect } from "react";

export const GoogleButton = () => {
  const handleCredentialResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
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
