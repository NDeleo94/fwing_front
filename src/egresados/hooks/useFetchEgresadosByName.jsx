import { useEffect, useState } from "react";
import { getEgresadosByName } from "../helpers/getEgresadosByName";


export const useFetchEgresadosByName = () => {
    const [state, setState] = useState({
        data: [],
        loading: true,
      });
    
      useEffect(() => {
        getEgresadosByName().then((egresado) => {
          setState({
            data: egresado,
            loading: false,
          });
        });
      }, []);
      return state;
    
}
