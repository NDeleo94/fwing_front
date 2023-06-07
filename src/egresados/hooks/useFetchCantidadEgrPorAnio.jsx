import { useEffect, useState } from "react";
import { getCantidadEgrePorAnio } from "../helpers/getCantidadEgrPorAnio";

export const useFetchCantidadEgrPorAnio = () => {
  const [state, setState] = useState(null);
  let data = []

  useEffect(() => {
    getCantidadEgrePorAnio().then(setState(data));
  }, []);
  return state;
};
