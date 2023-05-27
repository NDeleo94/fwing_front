import { useEffect, useState } from "react";
import { getEgresadosByName } from "../helpers/getEgresadosByName";


export const useFetchEgresadosByName = ( name = '') => {
    const [state, setState] = useState({
        data: [],
        loading: true,
      });
    
      useEffect(() => {
        getEgresadosByName(name).then((egresado) => {
          setState({
            data: egresado,
            loading: false,
          });
        });
        console.log(state)
      }, []);
      return state;
    
}
