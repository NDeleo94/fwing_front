import React, { useState } from "react";
import { Alert, Button, Form, Modal, Table } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { ToastNotificacionPush } from "./ToastNotificacionPush";
import CreatableSelect from "react-select/creatable";

export const ConfiguracionHistorialLaboral = ({ egresado }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShowAlert(false);
        setEsActual(false);
        setValueOrganizacion();
        setValuePuesto();
        onResetForm();
        setShow(true);
    };

    const [esActual, setEsActual] = useState(false);

    const initialForm = {
        puesto: "",
        organizacion: "",
        inicio: "",
        fin: "",
    };
    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    const handleChangeActual = (event) => {
        if (event.target.checked) {
            formState.fin = "";
        }
        setEsActual((current) => !current);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        /* Validación React */
        if (
            !!valueOrganizacion &&
            !!valuePuesto &&
            formState.inicio &&
            (esActual || formState.fin) &&
            EsInicioAntesQueFin()
        ) {
            valuePuesto.value
                ? (formState.puesto = valuePuesto.value)
                : (formState.puesto = valuePuesto.label);
            valueOrganizacion.value
                ? (formState.organizacion = valueOrganizacion.value)
                : (formState.organizacion = valueOrganizacion.label);
            CallToast();
            setShow(false);
            /* post de agregar trabajo a egresado */
        } else {
            setShowAlert(true);
        }
        console.log(formState);
    };

    /* Notificación Push */
    const [mostrar, setMostrar] = useState(false);
    const message = (
        <>
            <b>¡Se agregó el nuevo trabajo!</b>
        </>
    );
    function CallToast() {
        setMostrar(true);
        setTimeout(() => {
            setMostrar(false);
        }, 5100);
    }
    /* Fin Notificación Push */

    /* Inicio Select-input de carrera-facultad-universidad */
    const createOption = (label, id) => ({
        label,
        value: id,
    });
    // Aquí hay que traer la info del back
    const defaultOptionsPuestos = [
        createOption("Full Stack Developer", 11),
        createOption("DevOps", 12),
        createOption("Profesor Adjunto", 13),
        createOption("Gerente IT", 15),
    ];
    const defaultOptionsOrganizaciones = [
        createOption("Globant", 21),
        createOption("Sovos", 22),
        createOption("Legislatura de Tucumán", 23),
        createOption("Sistenso", 25),
        createOption("Universidad Nacional de Tucumán", 125),
    ];
    const [isLoadingSelectPuesto, setIsLoadingSelectPuesto] = useState(false);
    const [isLoadingSelectOrganizacion, setIsLoadingSelectOrganizacion] =
        useState(false);
    const [optionsPuestos, setOptionsPuestos] = useState(defaultOptionsPuestos);
    const [optionsOrganizaciones, setOptionsOrganizaciones] = useState(
        defaultOptionsOrganizaciones
    );
    const [valuePuesto, setValuePuesto] = useState();
    const [valueOrganizacion, setValueOrganizacion] = useState();
    const handleCreateSelectPuesto = (inputValue) => {
        setIsLoadingSelectPuesto(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelectPuesto(false); // saca el loading
            setOptionsPuestos((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setValuePuesto(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    const handleCreateSelectOrganizacion = (inputValue) => {
        setIsLoadingSelectOrganizacion(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelectOrganizacion(false); // saca el loading
            setOptionsOrganizaciones((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setValueOrganizacion(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    /* Fin Select-input de carrera-facultad-universidad */

    /* Alert de validación */
    const [showAlert, setShowAlert] = useState(false);
    /* FIN Alert de validación */

    function EsInicioAntesQueFin() {
        let fechaInicio = new Date(formState.inicio);
        let fechaFin;
        if (esActual) {
            fechaFin = new Date();
        } else {
            fechaFin = new Date(formState.fin);
        }

        if (fechaInicio <= fechaFin) {
            return true;
        } else return false;
    }

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

                <ToastNotificacionPush mensaje={message} mostrar={mostrar} />

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Trabajo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formPuesto">
                                <Form.Label>Puesto</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    isDisabled={isLoadingSelectPuesto}
                                    isLoading={isLoadingSelectPuesto}
                                    onChange={(newValue) =>
                                        setValuePuesto(newValue)
                                    }
                                    onCreateOption={handleCreateSelectPuesto}
                                    options={optionsPuestos}
                                    value={valuePuesto}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formOrganizacion"
                            >
                                <Form.Label>Organizacion</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    isDisabled={isLoadingSelectOrganizacion}
                                    isLoading={isLoadingSelectOrganizacion}
                                    onChange={(newValue) =>
                                        setValueOrganizacion(newValue)
                                    }
                                    onCreateOption={
                                        handleCreateSelectOrganizacion
                                    }
                                    options={optionsOrganizaciones}
                                    value={valueOrganizacion}
                                />
                            </Form.Group>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formFechaInicio"
                                    >
                                        <Form.Label>Inicio</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={formState.inicio}
                                            onChange={onInputChange}
                                            name="inicio"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formFechaFin"
                                    >
                                        <Form.Label>Fin</Form.Label>
                                        <Form.Control
                                            type={esActual ? "text" : "date"}
                                            value={
                                                esActual
                                                    ? "Actual"
                                                    : formState.fin
                                            }
                                            onChange={onInputChange}
                                            name="fin"
                                            disabled={esActual}
                                            required={!esActual}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="¿Es actual?"
                                            name="fin"
                                            onChange={handleChangeActual}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                        {showAlert &&
                        !(
                            formState.inicio &&
                            valuePuesto &&
                            valueOrganizacion &&
                            (esActual || formState.fin) &&
                            EsInicioAntesQueFin()
                        ) ? (
                            <>
                                <Alert
                                    variant="danger"
                                    onClose={() => setShowAlert(false)}
                                    dismissible
                                >
                                    {!(
                                        formState.inicio &&
                                        valuePuesto &&
                                        valueOrganizacion &&
                                        (esActual || formState.fin)
                                    ) ? (
                                        <b>
                                            - Formulario incompleto, falta:{" "}
                                            <br />
                                        </b>
                                    ) : (
                                        ""
                                    )}
                                    {!formState.inicio
                                        ? "Inicio de trabajo,"
                                        : ""}
                                    {!valuePuesto ? " Puesto laboral," : ""}
                                    {!valueOrganizacion ? " Organizacion," : ""}
                                    {!(formState.fin || esActual)
                                        ? " Fin de Trabajo."
                                        : ""}
                                    {!(
                                        formState.inicio &&
                                        valuePuesto &&
                                        valueOrganizacion &&
                                        (esActual || formState.fin)
                                    ) ? (
                                        <br />
                                    ) : (
                                        ""
                                    )}
                                    {!EsInicioAntesQueFin() ? (
                                        <>
                                            <b>- ¡Fechas incorrectas/nulas!</b>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </Alert>
                            </>
                        ) : (
                            ""
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
