import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "../hooks/useForm";
import { ToastNotificacionPush } from "./ToastNotificacionPush";

export const ConfiguracionEgresos = ({ egresado }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        onResetForm();
        setValidated(false);
        setShow(true);
    };

    const initialForm = {
        matricula: "",
        ciclo_egreso: "",
        carrera: "",
        facultad: "",
        universidad: "",
    };
    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    /* Validación Bootstrap */
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        /* Validación React */
        if (
            formState.ciclo_egreso &&
            formState.carrera &&
            formState.facultad &&
            formState.universidad
        ) {
            CallToast();
            setShow(false);
            /* post de agregar egreso a egresado */
        }
    };
    /* FinValidación Bootstrap */

    function NoHayCambios(initial, changed) {
        return (
            initial.matricula == changed.matricula &&
            initial.ciclo_egreso == changed.ciclo_egreso &&
            initial.carrera == changed.carrera &&
            initial.facultad == changed.facultad &&
            initial.universidad == changed.universidad
        );
    }

    /* Notificación Push */
    const [mostrar, setMostrar] = useState(false);
    
    const message = (
        <>
            <b>¡Se agregó el nuevo título!</b>
        </>
    );
    
    function CallToast() {
        setMostrar(true);
        setTimeout(() => {
            setMostrar(false);
        }, 5100);
    }
    /* Fin Notificación Push */

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
                        {egresado.egresos.map((egre) => (
                            <tr key={egre.id}>
                                <th scope="row">
                                    {egre.matricula ? egre.matricula : "--"}
                                </th>
                                <td>{egre.ciclo_egreso.split("-")[0]}</td>
                                <td>{egre.carrera.carrera}</td>
                                <td>{egre.carrera.facultad.facultad}</td>
                                <td>
                                    {egre.carrera.facultad.universidad.acronimo}
                                </td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <ToastNotificacionPush mensaje={message} mostrar={mostrar}/>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Egreso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated}>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formMatricula"
                                    >
                                        <Form.Label>Matrícula</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formState.matricula}
                                            onChange={onInputChange}
                                            name="matricula"
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formAnioEgreso"
                                    >
                                        <Form.Label>Año de Egreso</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formState.ciclo_egreso}
                                            onChange={onInputChange}
                                            name="ciclo_egreso"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Group
                                className="mb-3"
                                controlId="formCarrera"
                            >
                                <Form.Label>Carrera</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formState.carrera}
                                    onChange={onInputChange}
                                    name="carrera"
                                    required
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formFacultad"
                            >
                                <Form.Label>Facultad</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formState.facultad}
                                    onChange={onInputChange}
                                    name="facultad"
                                    required
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formUniversidad"
                            >
                                <Form.Label>Universidad</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formState.universidad}
                                    onChange={onInputChange}
                                    name="universidad"
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={NoHayCambios(initialForm, formState)}
                        >
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
