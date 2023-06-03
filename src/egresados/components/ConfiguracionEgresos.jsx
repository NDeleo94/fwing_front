import React from "react";

export const ConfiguracionEgresos = () => {
  return (
    <>
      <div className="container-fluid mt-2 text-secondary">
        <h3>Egresos</h3>
        <hr />
        <button type="button" className="btn btn-secondary">
          Agregar Egreso
        </button>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Matrícula</th>
              <th scope="col">Año de Egreso</th>
              <th scope="col">Carrera</th>
              <th scope="col">Facultad</th>
              <th scope="col">Universidad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">--</th>
              <td>2023</td>
              <td>Ingeniería en Computación</td>
              <td>Facultad de Ciencias Exactas y Tecnología</td>
              <td>Universidad Nacional de Tucumán</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
