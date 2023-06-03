import React from "react";

export const ConfiguracionHistorialLaboral = () => {
  return (
    <>
      <div className="container-fluid mt-2 text-secondary">
        <h3>Historial Laboral</h3>
        <hr />

        <button type="button" className="btn btn-secondary">
          Agregar Trabajo
        </button>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Puesto</th>
              <th scope="col">Organización</th>
              <th scope="col">Inicio</th>
              <th scope="col">Fin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Secretaria</td>
              <td>Sanatorio Modelo</td>
              <td>2020-06-15</td>
              <td>actualidad</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
