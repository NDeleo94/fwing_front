import { useEffect, useState } from "react";
import { getEgresados } from "../helpers/getEgresados";

export const useFetchEgresados = (id) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    getEgresados(id).then((egresado) => {
      setState({
        data: egresado,
        loading: false,
      });
    });
  }, [id]);
  return state;
};
