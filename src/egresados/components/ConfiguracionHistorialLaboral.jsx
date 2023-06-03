import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

export const ConfiguracionHistorialLaboral = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="container-fluid mt-2 text-secondary">
        <h3>Historial Laboral</h3>
        <hr />

        <Button variant="secondary" onClick={handleShow}>
          Agregar Trabajo
        </Button>

        <Table responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Puesto</th>
              <th scope="col">Organización</th>
              <th scope="col">Inicio</th>
              <th scope="col">Fin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Secretaria</td>
              <td>Sanatorio Modelo</td>
              <td>2020-06-15</td>
              <td>actualidad</td>
            </tr>
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Trabajo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formPuesto">
                <Form.Label>Puesto</Form.Label>
                <Form.Control type="text" value="" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formOrganizacion">
                <Form.Label>Organizacion</Form.Label>
                <Form.Control type="text" value="" />
              </Form.Group>
              <div className="row">
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formFechaInicio">
                    <Form.Label>Inicio</Form.Label>
                    <Form.Control type="date" value="" />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formFechaFin">
                    <Form.Label>Fin</Form.Label>
                    <Form.Control type="date" value="" />
                  </Form.Group>
                </div>
              </div>
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
