import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ConfiguracionEgresos = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="container-fluid mt-2 text-secondary">
        <h3>Egresos</h3>
        <hr />

        <Button variant="secondary" onClick={handleShow}>
          Agregar Egreso
        </Button>

        <Table responsive>
          <thead>
            <tr>
              <th scope="col">Matrícula</th>
              <th scope="col">Año de Egreso</th>
              <th scope="col">Carrera</th>
              <th scope="col">Facultad</th>
              <th scope="col">Universidad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">--</th>
              <td>2023</td>
              <td>Ingeniería en Computación</td>
              <td>Facultad de Ciencias Exactas y Tecnología</td>
              <td>Universidad Nacional de Tucumán</td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Egreso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formMatricula">
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control type="number" value="" />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formAnioEgreso">
                    <Form.Label>Año de Egreso</Form.Label>
                    <Form.Control type="number" value="" />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3" controlId="formCarrera">
                <Form.Label>Carrera</Form.Label>
                <Form.Control type="text" value="" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFacultad">
                <Form.Label>Facultad</Form.Label>
                <Form.Control type="text" value="" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formUniversidad">
                <Form.Label>Universidad</Form.Label>
                <Form.Control type="text" value="" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
