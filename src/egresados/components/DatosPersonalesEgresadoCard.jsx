import React from "react";

export const DatosPersonalesEgresadoCard = ({
  nombre,
  apellido,
  fechanac,
  anioEgresado,
  ciudadNatal,
  ciudadActual,
}) => {
  return (
    <>
      <div className="card border-secondary mb-3">
        <div className="row mt-4 mx-2">
          <div className="col-4">
            <b>Nombre Completo:</b>
          </div>
          <div className="col-8">
            {nombre} {apellido}
          </div>
        </div>
        <hr />
        <div className="row mx-2">
          <div className="col-4">
            <b>Fecha de Nacimiento:</b>
          </div>
          <div className="col-8">{fechanac}</div>
        </div>
        <hr />
        <div className="row mx-2">
          <div className="col-4">
            <b>Año de Egreso:</b>
          </div>
          <div className="col-8">{anioEgresado}</div>
        </div>
        <hr />
        <div className="row mx-2">
          <div className="col-4">
            <b>Ciudad Natal:</b>
          </div>
          <div className="col-8">{ciudadNatal}</div>
        </div>
        <hr />
        <div className="row mb-3 mx-2">
          <div className="col-4">
            <b>Ciudad Actual:</b>
          </div>
          <div className="col-8">{ciudadActual}</div>
        </div>
      </div>
    </>
  );
};
