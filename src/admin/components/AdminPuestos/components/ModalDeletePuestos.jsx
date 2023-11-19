import { Button, Modal } from "react-bootstrap";

export const ModalDeletePuestos = ({
  showModalDelete,
  handleCloseModalDelete,
  eliminarButtonDisabled,
  toDelete,
  handleSubmitModalDelete,
}) => {
  return (
    <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
      <Modal.Header closeButton>
        <Modal.Title>¿Eliminar Puesto de Trabajo?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Desea eliminar el siguiente puesto de trabajo? <br />
        <b>"{toDelete?.puesto}"</b>
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
