import Logo from "../../assets/imgs/Logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export const ConfiguracionDatosPersonales = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <div className="container-fluid mt-2 text-secondary">
      <h3>Datos Personales</h3>
      <hr />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
              <Form.Control type="text" disabled value="Apellidos" />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group className="mb-3" controlId="formNombres">
              <Form.Label>Nombres</Form.Label>
              <Form.Control type="text" disabled value="Nombres" />
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
              <Form.Control type="text" disabled value="DNI" />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" value="e-mail" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNacionalidad">
            <Form.Label>Nacionalidad</Form.Label>
            <Form.Control type="text" value="Nacionalidad" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFechaNacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCiudadNatal">
            <Form.Label>Ciudad Natal</Form.Label>
            <Form.Control type="text" value="CiudadNatal" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCiudadActual">
            <Form.Label>Ciudad Actual</Form.Label>
            <Form.Control type="text" value="CiudadActual" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDomicilio">
            <Form.Label>Domicilio</Form.Label>
            <Form.Control type="text" value="Domicilio" />
          </Form.Group>
          <div className="col-12">
            <Form.Label>Sexo</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Elija una opción...</option>
              <option value="1">Femenino</option>
              <option value="2">Masculino</option>
              <option value="3">Prefiero no decirlo...</option>
            </Form.Select>
          </div>
        </div>
        <div className="col-12 my-4 d-grid">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </Form>
    </div>
  );
};
