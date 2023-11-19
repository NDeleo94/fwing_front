import { Alert, Button, Container, Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

export const FormDataEgresado = ({
  egresado,
  formState,
  onInputChange,
  isLoadingSelect_natal,
  isLoadingSelect_actual,
  handleCreateSelect_natal,
  handleCreateSelect_actual,
  options,
  showAlert,
  handleSubmit,
  NoHayCambios,
  initialForm,
}) => {
  return (
    <Form>
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
            disabled
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

        <Form.Group className="mb-3" controlId="formPrueba">
          <Form.Label>Ciudad Natal</Form.Label>
          <CreatableSelect
            isClearable
            isDisabled={isLoadingSelect_natal}
            isLoading={isLoadingSelect_natal}
            onChange={(newValue) =>
              setFormState({
                ...formState,
                ciudad_natal: newValue,
              })
            }
            onCreateOption={handleCreateSelect_natal}
            options={options}
            value={formState.ciudad_natal}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCiudadActual">
          <Form.Label>Ciudad Actual</Form.Label>
          <CreatableSelect
            isClearable
            isDisabled={isLoadingSelect_actual}
            isLoading={isLoadingSelect_actual}
            onChange={(newValue) =>
              setFormState({
                ...formState,
                ciudad_actual: newValue,
              })
            }
            onCreateOption={handleCreateSelect_actual}
            options={options}
            value={formState.ciudad_actual}
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
            <option value="O">Prefiero no decirlo...</option>
          </Form.Select>
        </div>
      </div>
      {showAlert &&
      !(
        formState.email &&
        formState.nacionalidad &&
        formState.fecha_nac &&
        formState.sexo &&
        formState.ciudad_natal &&
        formState.ciudad_actual
      ) ? (
        <>
          <Container fluid className="my-3">
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <b>
                Formulario incompleto, falta: <br />
              </b>
              {!formState.email ? "E-mail," : ""}
              {!formState.nacionalidad ? " Nacionalidad," : ""}
              {!formState.fecha_nac ? " Fecha de Nacimiento," : ""}

              {!formState.sexo ? " Sexo," : ""}
              {!formState.ciudad_natal ? " Ciudad Natal," : ""}
              {!formState.ciudad_actual ? " Ciudad Actual." : "."}
            </Alert>
          </Container>
        </>
      ) : null}
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
  );
};
