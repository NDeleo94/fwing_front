import React, { useEffect, useState } from "react";
import { EgresadoCard } from "./EgresadoCard";

export const EgresadoList = ({ data }) => {
  const [listaEgresados, setListaEgresados] = useState(null);

  useEffect(() => {
    setListaEgresados(data);
  }, [data]);

  return (
    <>
      <div className="row rows-cols-1 row-cols-1 g-3">
        {listaEgresados
          ? listaEgresados.map((egre) => (
              <EgresadoCard key={egre.id} {...egre} />
            ))
          : ""}
      </div>
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
