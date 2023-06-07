import { useEffect, useState } from "react";
import { getEgresadosById } from "../helpers/getEgresadosById";

export const useFetchEgresadosById = (id) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    getEgresadosById(id).then((egresado) => {
      setState({
        data: egresado,
        loading: false,
      });
    });
  }, [id]);
  return state;
};
