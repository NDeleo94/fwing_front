import React, { useEffect, useState } from "react";
import { convertirFecha, separarFecha } from "../helpers/manejoFecha";

export const DatosPersonalesEgresadoCard = ({
  nombres,
  apellidos,
  fecha_nac,
  email,
  egresos,
  ciudad_natal,
  ciudad_actual,
}) => {
  const [anioEgreso, setAnioEgreso] = useState(null);

  useEffect(() => {
    if (egresos) {
      const { anio } = separarFecha(egresos[egresos.length-1].ciclo_egreso);
      setAnioEgreso(anio);
    }
  }, [egresos]);
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
            <b>Correo Electrónico:</b>
          </div>
          <div className="col-8">{email}</div>
        </div>
        <hr />
        <div className="row mx-2">
          <div className="col-4">
            <b>Fecha de Nacimiento:</b>
          </div>
          <div className="col-8">{convertirFecha(fecha_nac)}</div>
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
