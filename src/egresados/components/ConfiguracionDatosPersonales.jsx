import Logo from "../../assets/imgs/Logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { Loading } from "../../ui/components/Loading";

export const ConfiguracionDatosPersonales = ({ egresado, loading }) => {
  console.log(egresado, "egresado");
  const [egresadoOriginal, setEgresadoOriginal] = useState(egresado);

  const initialForm = {
    email: egresado ? egresado.email : "",
    nacionalidad: egresado ? egresado.nacionalidad : "",
    fecha_nac: "",
    ciudad_natal: "",
    ciudad_actual: "",
    domicilio: "",
    sexo: "",
  };

  const [initialState, setInitialState] = useState(initialForm);

  const { formState, onInputChange } = useForm(initialForm);
  

  useEffect(() => {
    if (egresado) {
      setInitialState(egresado);
      console.log("1");
      console.log(initialState);
    }
  }, [egresado]);

  const handleSubmitDos = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  console.log(formState);

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

  return (
    <> 
    {loading ? <Loading /> :
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNacionalidad">
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Control
                type="text"
                value={formState.nacionalidad}
                onChange={onInputChange}
                name="nacionalidad"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFechaNacimiento">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                value={formState.fecha_nac}
                onChange={onInputChange}
                name="fecha_nac"
              />
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
            <Button type="submit" onClick={handleSubmitDos}>
              Guardar cambios
            </Button>
          </div>
        </Form>
      </div>}
    </>
  );
};
