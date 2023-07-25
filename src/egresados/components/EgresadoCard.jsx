import React, { useEffect, useState } from "react";
import Logo from "../../assets/imgs/Logo.png";
import { Link } from "react-router-dom";

export const EgresadoCard = ({
  id,
  nombres,
  apellidos,
  ciudad_natal,
  historial,
  fecha_nac,
}) => {
  const [edad, setEdad] = useState("");
  useEffect(() => {
    if (fecha_nac) {
      let anio = fecha_nac.split("-");
      setEdad(2023 - anio[0]);
    }
  }, []);

  return (
    <>
      <div className="col animate__animated animate__fadeIn">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-4 d-grid mx-auto">
              <img src={Logo} className="card-img" alt="superhero" />
            </div>

            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title">{`${apellidos}, ${nombres}`}</h5>
                <p className="card-text">
                  {ciudad_natal ? (
                    <>
                      de {ciudad_natal.ciudad} <br />
                    </>
                  ) : (
                    ""
                  )}
                  {edad} años
                  <br />
                  {historial.lenght > 0
                    ? `Trabajó en: ${historial[0].organizacion.organizacion} `
                    : ""}
                </p>
                <Link to={`/perfil/${id}`}>
                  <button type="button" className="btn btn-primary btn-sm">
                    Más...
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
