import Logo from "../../assets/imgs/Logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { Loading } from "../../ui/components/Loading";

export const ConfiguracionDatosPersonales = ({ egresado }) => {
  const initialForm = {
    email: egresado.email || "",
    nacionalidad: egresado.nacionalidad || "",
    fecha_nac: egresado.fecha_nac || "",
    ciudad_natal: egresado.ciudad_natal || "",
    ciudad_actual: egresado.ciudad_actual || "",
    domicilio: egresado.domicilio || "",
    sexo: egresado.sexo || "",
  };

  const { formState, onInputChange } = useForm(initialForm);

  /* Validación Bootstrap */
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  /* FinValidación Bootstrap */

  function NoHayCambios(initial, changed) {
    return (
      initial.email == changed.email &&
      initial.nacionalidad == changed.nacionalidad &&
      initial.fecha_nac == changed.fecha_nac &&
      initial.ciudad_actual == changed.ciudad_actual &&
      initial.ciudad_natal == changed.ciudad_natal &&
      initial.domicilio == changed.domicilio &&
      initial.sexo == changed.sexo
    );
  }

  return (
    <>
      <div className="container-fluid mt-2 text-secondary">
        <h3>Datos Personales</h3>
        <hr />
        <Form noValidate validated={validated}>
          <div className="row">
            <div className="col-3">
              <div className="card-header">
                <img src={Logo} className="img-thumbnail" alt="Following" />
              </div>
            </div>
            <div className="col-9">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>¿Desea cambiar su foto de perfil?</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </div>
          </div>
          <hr />
          {/* react-bootstrap */}
          <div className="row mx-0">
            <div className="col-6">
              <Form.Group className="mb-3" controlId="formApellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" disabled value={egresado.apellidos} />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-3" controlId="formNombres">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" disabled value={egresado.nombres} />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-3" controlId="formTipoDNI">
                <Form.Label>Tipo de Documento</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  value="Documento Nacional de Identidad"
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-3" controlId="formDNI">
                <Form.Label>Número de Documento</Form.Label>
                <Form.Control type="text" disabled value={egresado.dni} />
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                value={formState.email}
                onChange={onInputChange}
                name="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNacionalidad">
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Control
                type="text"
                value={formState.nacionalidad}
                onChange={onInputChange}
                name="nacionalidad"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFechaNacimiento">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                value={formState.fecha_nac}
                onChange={onInputChange}
                name="fecha_nac"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCiudadNatal">
              <Form.Label>Ciudad Natal</Form.Label>
              <Form.Control
                type="text"
                value={formState.ciudad_natal}
                onChange={onInputChange}
                name="ciudad_natal"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCiudadActual">
              <Form.Label>Ciudad Actual</Form.Label>
              <Form.Control
                type="text"
                value={formState.ciudad_actual}
                onChange={onInputChange}
                name="ciudad_actual"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDomicilio">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control
                type="text"
                value={formState.domicilio}
                onChange={onInputChange}
                name="domicilio"
                required
              />
            </Form.Group>
            <div className="col-12">
              <Form.Label>Sexo</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                name="sexo"
                value={formState.sexo}
                onChange={onInputChange}
              >
                <option>Elija una opción...</option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
                <option value={null}>Prefiero no decirlo...</option>
              </Form.Select>
            </div>
          </div>
          <div className="col-12 my-4 d-grid">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={NoHayCambios(initialForm, formState)}
            >
              Guardar cambios
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
