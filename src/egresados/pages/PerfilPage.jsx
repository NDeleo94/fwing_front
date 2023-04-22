import { useFetchEgresados } from "../hooks/useFetchEgresados";

export const PerfilPage = () => {
  const { data, loading } = useFetchEgresados("4");
  console.log(data);

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-4">
            {/* Card Foto de perfil */}
            <div className="card border-primary mb-3">
              <div className="card-header">
                <img
                  src="https://marketplace.canva.com/EAEj17Y_k_k/2/0/1600w/canva-amarillo-y-negro-gamer-desgastado-imagen-de-perfil-de-twitch-41B81rUGLAg.jpg"
                  className="img-thumbnail"
                  alt="..."
                />
              </div>
              <div className="card-body text-center">
                <h3 className="card-title text-primary">{data.nombre}</h3>
                <h4 className="card-title">{data.carrera}</h4>
                <h5 className="card-title">{data.ciudadNatal}</h5>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card border-secondary mb-3">
              <div className="row mt-4 mx-2">
                <div className="col-4">
                  <b>Nombre Completo:</b>
                </div>
                <div className="col-8">
                  {data.nombre} {data.apellido}
                </div>
              </div>
              <hr />
              <div className="row mx-2">
                <div className="col-4">
                  <b>Fecha de Nacimiento:</b>
                </div>
                <div className="col-8">{data.fechanac}</div>
              </div>
              <hr />
              <div className="row mx-2">
                <div className="col-4">
                  <b>Año de Egreso:</b>
                </div>
                <div className="col-8">{data.anioEgresado}</div>
              </div>
              <hr />
              <div className="row mx-2">
                <div className="col-4">
                  <b>Ciudad Natal:</b>
                </div>
                <div className="col-8">{data.ciudadNatal}</div>
              </div>
              <hr />
              <div className="row mb-3 mx-2">
                <div className="col-4">
                  <b>Ciudad Actual:</b>
                </div>
                <div className="col-8">{data.ciudadActual}</div>
              </div>
            </div>
            <div className="card border-secondary mb-3">
              <div className="card-header">Trabajo</div>
              <div className="card-body">
                {data.trabajaComo} en {data.trabajaEn}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
