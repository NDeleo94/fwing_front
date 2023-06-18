import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

export const useConfig = () => {
  const { token } = useContext(LoginContext);

  const config = {
    headers: { Authorization: `Token ${token}` },
  };

  return config;
};
