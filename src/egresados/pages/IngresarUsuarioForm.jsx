import React from "react";
import { useForm } from "../hooks/useForm";

export const IngresarUsuarioForm = () => {
  const initialForm = {
    apellidos: "",
    nombres: "",
    dni: 0,
    email: "",
    ciclo_egreso: "",
    nacionalidad: "",
    ciudad_natal: "",
    domicilio: "",
    ciudad_actual: "",
    certificado: "",
    sexo: "",
  };
  const { formState, onInputChange } = useForm(initialForm);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    const url = `https://ndeleo94.pythonanywhere.com/fw/api/egresados/`;
    const postData = formState;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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
                    className="form-control"
                    placeholder="Apellidos"
                    type="text"
                    id="apellidoEgresado"
                    name="apellidos"
                    onChange={onInputChange}
                  />
                </div>
                <div className="form-group input-group col">
                  <input
                    className="form-control"
                    placeholder="Nombres"
                    type="text"
                    id="nombreEgresado"
                    name="nombres"
                    onChange={onInputChange}
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
                  className="form-control"
                  placeholder="DNI"
                  type="number"
                  id="dniEgresado"
                  name="dni"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Email address"
                  type="email"
                  id="emailEgresado"
                  name="email"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-mortarboard"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Carrera"
                  type="text"
                  id="carreraEgresado"
                  name="carrera"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-calendar-check"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Fecha Egreso"
                  type="date"
                  id="fechaEgresoEgresado"
                  name="cicloEgreso"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-balloon"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Fecha de Nacimiento"
                  type="date"
                  id="fechaNacimientoEgresado"
                  name="fecha_nac"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-globe"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Nacionalidad"
                  type="text"
                  id="nacionalidadEgresado"
                  name="nacionalidad"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-houses"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Localidad de nacimiento"
                  type="text"
                  id="localidadNacEgresado"
                  name="ciudad_natal"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-house"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Domicilio"
                  type="text"
                  id="domicilioActualEgresado"
                  name="domicilio"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-building"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Localidad Actual"
                  type="text"
                  id="localidadActualEgresado"
                  name="ciudad_actual"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-mortarboard-fill"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Certificado"
                  type="text"
                  id="certificadoEgresado"
                  name="certificado"
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person-circle"></i>
                  </span>
                </div>
                <select
                  className="form-control"
                  name="sexo"
                  id="sexoEgresado"
                  onChange={onInputChange}
                  placeholder="Sexo"
                >
                  <option value="" defaultValue="">
                    Seleccionar Sexo
                  </option>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                </select>
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary my-2 d-grid mx-auto"
                  id="submitButton"
                  onClick={(e) => handleSubmit(e)}
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
