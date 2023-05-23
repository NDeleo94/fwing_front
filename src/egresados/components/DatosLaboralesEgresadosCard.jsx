import React, { useEffect, useState } from "react";

export const DatosLaboralesEgresadosCard = ({ actividades }) => {
  const [actividad, setActividad] = useState(null);

  useEffect(() => {
    setActividad(actividades);
  }, [actividades]);

  return (
    <>
      <div className="card border-secondary mb-3">
        <div className="card-header">Trabajo</div>
        <ul className="list-group list-group-flush">
          {actividad
            ? actividad.map((element) => (
                <li key={element.id} className="list-group-item">
                  <b>{element.puesto.puesto}</b> en{" "}
                  <b>{element.organizacion.organizacion}</b> desde{" "}
                  {element.inicio} hasta{" "}
                  {element.fin ? `${element.fin}` : `actualidad`}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </>
  );
};
