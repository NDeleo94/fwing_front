import React from "react";

export const IngresarUsuarioForm = () => {
  return (
    <>
      <div className="container my-5">
        <div className="card bg-light">
          <article className="card-body mx-auto">
            <h4 className="card-title mt-3 text-center">Agregar Egresado</h4>

            <form>
              <div className="row">
                <div className="form-group input-group col">
                  <input
                    name=""
                    className="form-control"
                    placeholder="Apellidos"
                    type="text"
                    id="apellidoEgresado"
                  />
                </div>
                <div className="form-group input-group col">
                  <input
                    name=""
                    className="form-control"
                    placeholder="Nombres"
                    type="text"
                    id="nombreEgresado"
                  />
                </div>
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person-vcard"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="DNI"
                  type="text"
                  id="dniEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Email address"
                  type="email"
                  id="emailEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-mortarboard"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Carrera"
                  type="text"
                  id="carreraEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-calendar-check"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Fecha Egreso"
                  type="text"
                  id="fechaEgresoEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-balloon"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Fecha de Nacimiento"
                  type="text"
                  id="fechaNacimientoEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-globe"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Nacionalidad"
                  type="text"
                  id="nacionalidadEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-houses"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Localidad de nacimiento"
                  type="text"
                  id="localidadNacEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-house"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Domicilio"
                  type="text"
                  id="domicilioActualEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-building"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Localidad Actual"
                  type="text"
                  id="localidadActualEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-mortarboard-fill"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Certificado"
                  type="text"
                  id="certificadoEgresado"
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person-circle"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Sexo"
                  type="text"
                  id="sexoEgresado"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary my-2 d-grid mx-auto"
                  id="submitButton"
                >
                  Crear Egresado
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </>
  );
};
