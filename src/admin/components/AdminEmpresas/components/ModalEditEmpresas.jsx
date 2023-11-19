import { Alert, Button, Form, Modal } from "react-bootstrap";

export const ModalEditEmpresas = ({
  show,
  handleClose,
  addMode,
  handleSubmit,
  formState,
  onInputChange,
  showAlert,
  waitAxios,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {addMode ? "Agregar" : "Modificar"} organización
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Nombre de la Organización:</Form.Label>
            <Form.Control
              type="text"
              value={formState.organizacion}
              onChange={onInputChange}
              name="organizacion"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Tipo:</Form.Label>
            <Form.Select
              aria-label="Default select example"
              required
              name="tipo"
              value={formState.tipo}
              onChange={onInputChange}
            >
              <option disabled value="">
                Elija el tipo de organización
              </option>
              <option value="p">Privada</option>
              <option value="e">Pública</option>
              <option value="i">Independiente</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formState.descripcion}
              onChange={onInputChange}
              name="descripcion"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="email"
              value={formState.email}
              onChange={onInputChange}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Sitio Web:</Form.Label>
            <Form.Control
              type="url"
              value={formState.web}
              onChange={onInputChange}
              name="web"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Cantidad de Empleados:</Form.Label>
            <Form.Select
              aria-label="Default select example"
              required
              name="empleados"
              value={formState.empleados}
              onChange={onInputChange}
            >
              <option disabled value="">
                Elija la cantidad de Empleados
              </option>
              <option value="1">Chica: [1, 10] empleados</option>
              <option value="2">Mediana: [11, 100] empleados</option>
              <option value="3">Grande: [101, 1000+) empleados</option>
            </Form.Select>
          </Form.Group>
        </Form>

        {showAlert &&
        !(
          formState.organizacion &&
          formState.tipo &&
          formState.empleados &&
          formState.descripcion &&
          formState.email &&
          formState.web
        ) ? (
          <>
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {!(
                formState.organizacion &&
                formState.tipo &&
                formState.empleados &&
                formState.descripcion &&
                formState.email &&
                formState.web
              ) ? (
                <b>
                  - Formulario incompleto, falta: <br />
                </b>
              ) : (
                ""
              )}
              {!formState.organizacion ? "Nombre de la Organización," : ""}
              {!formState.tipo ? " Tipo de organización," : ""}
              {!formState.empleados ? " Cantidad de Empleados," : ""}
              {!formState.descripcion ? " Descripción," : ""}
              {!formState.email ? " Email," : ""}
              {!formState.web ? " Página Web." : ""}
            </Alert>
          </>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={waitAxios}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={waitAxios}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
