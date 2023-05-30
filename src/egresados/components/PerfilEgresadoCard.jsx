import React, { useEffect, useState } from "react";
import Logo from "../../assets/imgs/Logo.png";

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
            src={Logo}
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
