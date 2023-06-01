import React from "react";
import Logo from "../../assets/imgs/Logo.png";

export const ConfiguracionDatosPersonales = () => {
  return (
    <div className="container-fluid mt-2 text-secondary">
      <h3>Datos Personales</h3>
      <hr />
      <div className="row">
        <div className="col-3">
          <div className="card-header">
            <img src={Logo} className="img-thumbnail" alt="..." />
          </div>
        </div>
        <div className="col-9">
          <div className="mb-3">
            <label for="formFile" className="form-label">
              ¿Desea cambiar su foto de perfil?
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
        </div>
      </div>
      <hr />
      <div className="row mx-0">
        <div className="col-6">
          <label for="apellidos" className="form-label">
            Apellidos
          </label>
          <input
            class="form-control"
            type="text"
            value="Apellidos"
            aria-label="Disabled input example"
            disabled
            readonly
          />
        </div>
        <div className="col-6">
          <label for="nombres" className="form-label">
            Nombres
          </label>
          <input
            class="form-control"
            type="text"
            value="Nombres"
            aria-label="Disabled input example"
            disabled
            readonly
          />
        </div>
        <div className="col-6">
          <label for="tipodni" className="form-label mt-2">
            Tipo de Documento
          </label>
          <input
            class="form-control"
            type="text"
            value="Documento Nacional de Identidad"
            aria-label="Disabled input example"
            disabled
            readonly
          />
        </div>
        <div className="col-6">
          <label for="dni" className="form-label mt-2">
            Número de Documento
          </label>
          <input
            class="form-control"
            type="text"
            value="DNI"
            aria-label="Disabled input example"
            disabled
            readonly
          />
        </div>
        <div className="col-12">
          <label for="email" className="form-label mt-2">
            E-mail
          </label>
          <input
            class="form-control"
            type="text"
            value="e-mail"
            aria-label="Disabled input example"
          />
        </div>
        <div className="col-12">
          <label for="nacionalidad" className="form-label mt-2">
            Nacionalidad
          </label>
          <input
            class="form-control"
            type="text"
            value="Nacionalidad"
            aria-label="Disabled input example"
          />
        </div>
        <div className="col-12">
          <label for="fecha_nac" className="form-label mt-2">
            Fecha de Nacimiento
          </label>
          <input
            class="form-control"
            type="date"
            value="01-01-1900"
            aria-label="Disabled input example"
          />
        </div>
        <div className="col-12">
          <label for="ciudadNatal" className="form-label mt-2">
            Ciudad Natal
          </label>
          <input
            class="form-control"
            type="text"
            value="Ciudad Natal"
            aria-label="Disabled input example"
          />
        </div>
        <div className="col-12">
          <label for="ciudadActual" className="form-label mt-2">
            Ciudad Actual
          </label>
          <input
            class="form-control"
            type="text"
            value="Ciudad Actual"
            aria-label="Disabled input example"
          />
        </div>
        <div className="col-12 my-4 d-grid">
          <button type="button" className="btn btn-primary">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
