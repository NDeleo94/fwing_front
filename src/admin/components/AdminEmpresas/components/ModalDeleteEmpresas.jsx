import { Button, Modal } from "react-bootstrap";

export const ModalDeleteEmpresas = ({
  showModalDelete,
  handleCloseModalDelete,
  eliminarButtonDisabled,
  toDelete,
  handleSubmitModalDelete,
}) => {
  return (
    <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
      <Modal.Header closeButton>
        <Modal.Title>¿Eliminar Organización?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Desea eliminar la siguiente Organización? <br />
        <b>"{toDelete?.organizacion}"</b>
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
