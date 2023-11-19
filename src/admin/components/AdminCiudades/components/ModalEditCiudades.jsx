import { Alert, Button, Form, Modal } from "react-bootstrap";

export const ModalEditCiudades = ({
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
        <Modal.Title>{addMode ? "Agregar" : "Modificar"} ciudad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label>Nombre de la Ciudad:</Form.Label>
            <Form.Control
              type="text"
              value={formState.ciudad}
              onChange={onInputChange}
              name="ciudad"
            />
          </Form.Group>
        </Form>

        {showAlert && !formState.ciudad ? (
          <>
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {!formState.ciudad ? (
                <b>
                  - Formulario incompleto, falta: <br />
                </b>
              ) : (
                ""
              )}
              {!formState.ciudad ? "Nombre de la ciudad." : ""}
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
