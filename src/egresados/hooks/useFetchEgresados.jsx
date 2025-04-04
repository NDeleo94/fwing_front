import { useEffect, useState } from "react";
import { getEgresados } from "../helpers/getEgresados";

export const useFetchEgresados = () => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    getEgresados().then((egresado) => {
      setState({
        data: egresado,
        loading: false,
      });
    });
  }, []);
  return state;
};
