import React from "react";

export const PerfilEgresadoCard = ({ nombre, carrera, ciudadNatal }) => {
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
          <h3 className="card-title text-primary">{nombre}</h3>
          <h4 className="card-title">{carrera}</h4>
          <h5 className="card-title">{ciudadNatal}</h5>
        </div>
      </div>
    </>
  );
};
