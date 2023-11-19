import { Button, Modal } from "react-bootstrap";

export const ModalDeleteCiudades = ({
  showModalDelete,
  handleCloseModalDelete,
  eliminarButtonDisabled,
  toDelete,
  handleSubmitModalDelete,
}) => {
  return (
    <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
      <Modal.Header closeButton>
        <Modal.Title>¿Eliminar Ciudad?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Desea eliminar la siguiente ciudad? <br />
        <b>"{toDelete?.ciudad}"</b>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseModalDelete}
          disabled={eliminarButtonDisabled}
        >
          Cerrar
        </Button>
        <Button
          type="submit"
          onClick={handleSubmitModalDelete}
          variant="danger"
          disabled={eliminarButtonDisabled}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
