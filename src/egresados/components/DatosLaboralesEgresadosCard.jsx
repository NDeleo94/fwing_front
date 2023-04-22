import React from "react";

export const DatosLaboralesEgresadosCard = ({ trabajaComo, trabajaEn }) => {
  return (
    <>
      <div className="card border-secondary mb-3">
        <div className="card-header">Trabajo</div>
        <div className="card-body">
          {trabajaComo} en {trabajaEn}
        </div>
      </div>
    </>
  );
};
