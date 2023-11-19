import { Alert, Button, Form, Modal } from "react-bootstrap";

export const ModalEditPuestos = ({
  show,
  handleClose,
  formState,
  onInputChange,
  addMode,
  handleSubmit,
  showAlert,
  waitAxios,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{addMode ? "Agregar" : "Modificar"} puesto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPuesto">
            <Form.Label>Nombre del Puesto:</Form.Label>
            <Form.Control
              type="text"
              value={formState.puesto}
              onChange={onInputChange}
              name="puesto"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescrpPuesto">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              value={formState.descripcion}
              onChange={onInputChange}
              name="descripcion"
            />
          </Form.Group>
        </Form>

        {showAlert && !(formState.puesto && formState.descripcion) ? (
          <>
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {!(formState.puesto && formState.descripcion) ? (
                <b>
                  - Formulario incompleto, falta: <br />
                </b>
              ) : (
                ""
              )}
              {!formState.puesto ? "Nombre del puesto," : ""}
              {!formState.descripcion ? " Descripción," : ""}
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
