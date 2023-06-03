import { ConfiguracionEgresos } from "../components/ConfiguracionEgresos";
import { ConfiguracionDatosPersonales } from "../components/ConfiguracionDatosPersonales";
import { ConfiguracionHistorialLaboral } from "../components/ConfiguracionHistorialLaboral";
import { Link, Route, Routes } from "react-router-dom";

export const ConfiguracionPage = () => {
  return (
    <>
      <div className="mt-2 mb-4">
        <h1>Administración</h1>
      </div>
      <hr />
      <div className="row">
        <div className="col-3 bg-light text-dark">
          <div className="row container-fluid">
            Datos personales
            <br />
            Certificados
            <br />
            Historial Laboral
            <br />
            Administración
          </div>
        </div>
        <div className="col-9">
          <Routes>
            <Route
              path="configuracion/datospersonales"
              element={<ConfiguracionDatosPersonales />}
            />
            <Route path="egresos" element={<ConfiguracionEgresos />} />
            <Route
              path="historial"
              element={<ConfiguracionHistorialLaboral />}
            />
            <Route
              path="administracion"
              element={<ConfiguracionHistorialLaboral />}
            />
          </Routes>
          <ConfiguracionDatosPersonales />
          <ConfiguracionEgresos />
          <ConfiguracionHistorialLaboral />
        </div>
      </div>
    </>
  );
};
