import React from "react";

export const EgresadoCard = ({ id,nombres,apellidos,ciudad_natal,historial }) => {
  return (
    <>
      <div className="col animate__animated animate__fadeIn">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-4 ">
              <img
                src="https://marketplace.canva.com/EAEj17Y_k_k/2/0/1600w/canva-amarillo-y-negro-gamer-desgastado-imagen-de-perfil-de-twitch-41B81rUGLAg.jpg"
                className="card-img"
                alt="superhero"
              />
            </div>

            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title">{apellidos} {nombres}</h5>
                <p className="card-text">
                  De {ciudad_natal} <br /> 30 años
                  <br />
                  Trabajó en: {historial.organizacion.organizacion}
                </p>
                {/* <Link to={`/hero/${ id }`}>
                    Más...
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
