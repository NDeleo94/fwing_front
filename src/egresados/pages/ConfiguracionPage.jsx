import { ConfiguracionDatosPersonales } from "../components/ConfiguracionDatosPersonales";

export const ConfiguracionPage = () => {
  return (
    <>
      <div className="mt-2 mb-4">
        <h1>Administración</h1>
      </div>
      <div className="row">
        <div className="col-4 bg-light text-dark">
          <div className="row container-fluid">
            Datos personales <br />
            Administración
          </div>
        </div>
        <div className="col-8">
          <ConfiguracionDatosPersonales />
        </div>
      </div>
    </>
  );
};
