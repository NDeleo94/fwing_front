import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useForm } from "../hooks/useForm";

export const ConfiguracionHistorialLaboral = ({ egresado }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [esActual, setEsActual] = useState(false);

  const initialForm = {
    puesto: "",
    organizacion: "",
    inicio: "",
    fin: "",
  };
  const { formState, onInputChange } = useForm(initialForm);

  const handleChangeActual = (event) => {
    if (event.target.checked) {
      formState.fin = "";
    }
    setEsActual((current) => !current);
  };

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
            {egresado.historial.map((egre, index) => (
              <tr key={egre.id}>
                <th scope="row">{index + 1}</th>
                <td>{egre.puesto.puesto}</td>
                <td>{egre.organizacion.organizacion}</td>
                <td>{egre.inicio}</td>
                <td>{egre.fin ? egre.fin : "Actual"}</td>
                <td></td>
              </tr>
            ))}
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
                <Form.Control
                  type="text"
                  value={formState.puesto}
                  onChange={onInputChange}
                  name="puesto"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formOrganizacion">
                <Form.Label>Organizacion</Form.Label>
                <Form.Control
                  type="text"
                  value={formState.organizacion}
                  onChange={onInputChange}
                  name="organizacion"
                />
              </Form.Group>
              <div className="row">
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formFechaInicio">
                    <Form.Label>Inicio</Form.Label>
                    <Form.Control
                      type="date"
                      value={formState.inicio}
                      onChange={onInputChange}
                      name="inicio"
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formFechaFin">
                    <Form.Label>Fin</Form.Label>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="¿Es actual?"
                      name="fin"
                      onChange={handleChangeActual}
                    />
                    <Form.Control
                      type={esActual ? "text" : "date"}
                      value={esActual ? "Actual" : formState.fin}
                      onChange={onInputChange}
                      name="fin"
                      disabled={esActual}
                    />
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
