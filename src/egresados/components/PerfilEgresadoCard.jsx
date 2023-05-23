import React, { useEffect, useState } from "react";

export const PerfilEgresadoCard = ({ nombres, egresos, ciudad_natal }) => {
  const [primeraCarrera, setPrimeraCarrera] = useState(null);

  useEffect(() => {
    if(egresos){
      setPrimeraCarrera(egresos[0].carrera.carrera)
    }
  }, [egresos])

  return (
    <>
      <div className="card border-primary mb-3">
        <div className="card-header">
          <img
            src="https://marketplace.canva.com/EAEj17Y_k_k/2/0/1600w/canva-amarillo-y-negro-gamer-desgastado-imagen-de-perfil-de-twitch-41B81rUGLAg.jpg"
            className="img-thumbnail"
            alt="..."
          />
        </div>
        <div className="card-body text-center">
          <h3 className="card-title text-primary">{nombres}</h3>
          <h4 className="card-title">{primeraCarrera}</h4>
          <h5 className="card-title">{ciudad_natal}</h5>
        </div>
      </div>
    </>
  );
};
