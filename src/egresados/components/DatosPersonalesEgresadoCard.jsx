import React, { useEffect, useState } from "react";

export const DatosPersonalesEgresadoCard = ({
  nombres,
  apellidos,
  fecha_nac,
  egresos,
  ciudad_natal,
  ciudad_actual,
}) => {
  const [anioEgreso, setAnioEgreso] = useState(null);

  useEffect(() => {
    if(egresos){
      setAnioEgreso(egresos[0].ciclo_egreso)
    }
  }, [egresos])
  return (
    <>
      <div className="card border-secondary mb-3">
        <div className="row mt-4 mx-2">
          <div className="col-4">
            <b>Nombre Completo:</b>
          </div>
          <div className="col-8">
            {nombres} {apellidos}
          </div>
        </div>
        <hr />
        <div className="row mx-2">
          <div className="col-4">
            <b>Fecha de Nacimiento:</b>
          </div>
          <div className="col-8">{fecha_nac}</div>
        </div>
        <hr />
        <div className="row mx-2">
          <div className="col-4">
            <b>Año de Egreso:</b>
          </div>
          <div className="col-8">{anioEgreso}</div>
        </div>
        <hr />
        <div className="row mx-2">
          <div className="col-4">
            <b>Ciudad Natal:</b>
          </div>
          <div className="col-8">{ciudad_natal}</div>
        </div>
        <hr />
        <div className="row mb-3 mx-2">
          <div className="col-4">
            <b>Ciudad Actual:</b>
          </div>
          <div className="col-8">{ciudad_actual}</div>
        </div>
      </div>
    </>
  );
};
