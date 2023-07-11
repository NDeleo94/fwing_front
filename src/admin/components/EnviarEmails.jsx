import React, { useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Table,
} from "react-bootstrap";

export const EnviarEmails = () => {
    /* Modal */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /* FIN Modal */
    const showModalPlantilla = () => {
        setShow(true);
    };
    return (
        <>
            <div className=" mt-2 text-secondary">
                <h3>
                    <i className="bi bi-envelope-at"></i> Enviar E-mails
                </h3>
                <hr />
                <Button variant="secondary" onClick={showModalPlantilla}>
                    <i className="bi bi-file-earmark-text"></i> Crear Plantilla
                    de e-mail
                </Button>
                <hr />
                <h5>
                    <i className="bi bi-envelope-at"></i> Plantillas
                </h5>
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Título</th>
                            <th scope="col">Cuerpo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Bienvenida</td>
                            <td className="text-break">
                                ¡Hola @nombre! Somos del Sistema de Graduados de
                                la FACET, ¡te invitamos a conocernos en el
                                siguiente link!
                            </td>
                            <td>
                                <Container>
                                    <Row xs={2} md={2}>
                                        <Col>
                                            <Button
                                                variant="outline-success"
                                                className="mb-1"
                                            >
                                                <i className="bi bi-send"></i>
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant="outline-secondary"
                                                className="mb-1"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant="outline-danger"
                                                className="mb-1"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <h5>
                    <i className="bi bi-clock-history"></i> Historial de e-mails
                    enviados
                </h5>
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha y Hora</th>
                            <th scope="col">Título</th>
                            <th scope="col">Cuerpo</th>
                            <th scope="col">Enviado a:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>2023-05-22 18:05</td>
                            <td>Bienvenida</td>
                            <td className="text-break">
                                ¡Hola @nombre! Somos del Sistema de Graduados de
                                la FACET, ¡te invitamos a conocernos en el
                                siguiente link!
                            </td>
                            <td>
                                todos
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear plantilla</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título del e-mail"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Cuerpo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cuerpo del e-mail"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Crear plantilla
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
