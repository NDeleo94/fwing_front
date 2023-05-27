import React, { useEffect, useState } from "react";
import { EgresadoCard } from "./EgresadoCard";

export const EgresadoList = ({ ...egresados }) => {
  const [listaEgresados, setListaEgresados] = useState([]);
  console.log(egresados);
  useEffect(() => {
    console.log(egresados)
    if (egresados != {}) {
      setListaEgresados(egresados);
      console.log(listaEgresados);
    }
    console.log(egresados);
    console.log(listaEgresados);
  }, [egresados != []]);

  return (
    <>
      <div className="row rows-cols-1 row-cols-md-2 g-3"></div>
    </>
  );
};

/* {
  heroes.map( hero => (
      <HeroCard 
          key={ hero.id }
          { ...hero }
      />
  ))
} */
