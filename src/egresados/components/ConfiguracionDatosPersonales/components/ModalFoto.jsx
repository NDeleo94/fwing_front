import { Button, Modal } from "react-bootstrap";

export const ModalFoto = ({
  showModal,
  handleCloseModal,
  handleSubmitModal,
  mensajeModal,
  tipoModal,
  confirmarModal,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar cambio de Foto</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensajeModal}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant={tipoModal} onClick={handleSubmitModal}>
          {confirmarModal}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
