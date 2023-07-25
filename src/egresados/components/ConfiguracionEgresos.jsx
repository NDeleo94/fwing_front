import { useEffect, useState } from "react";
import { Badge, Col, Form, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "../hooks/useForm";
import { ToastNotificacionPush } from "./ToastNotificacionPush";
import CreatableSelect from "react-select/creatable";
import Alert from "react-bootstrap/Alert";
import { useConfig } from "../../auth/hooks/useConfig";
import axios from "axios";

export const ConfiguracionEgresos = ({ egresado }) => {
    const [show, setShow] = useState(false);
    const [addMode, setAddMode] = useState(true);
    const [defaultOptionsCarreras, setDefaultOptionsCarreras] = useState([]);
    const [defaultOptionsFacultades, setDefaultOptionsFacultades] = useState(
        []
    );
    const [defaultOptionsUniversidades, setDefaultOptionsUniversidades] =
        useState([]);
    const baseUrl = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();
    /* Prueba actualizador */
    const [datoEgresado, setDatoEgresado] = useState(egresado);

    const [actualizador, setActualizador] = useState(false);
    function Actualizar() {
        setActualizador(!actualizador);
    }
    /* FIN Prueba actualizador */
    useEffect(() => {
        axios
            .get(`${baseUrl}/universidades/`)
            .then(({ data }) =>
                setDefaultOptionsUniversidades(
                    data.map((u) => ({
                        value: u.id,
                        label: u.universidad,
                    }))
                )
            )
            .catch((error) => console.log(error));
        axios
            .get(`${baseUrl}/facultades/`)
            .then(({ data }) =>
                setDefaultOptionsFacultades(
                    data.map((f) => ({
                        value: f.id,
                        label: f.facultad,
                    }))
                )
            )
            .catch((error) => console.log(error));
        axios
            .get(`${baseUrl}/carreras/`)
            .then(({ data }) =>
                setDefaultOptionsCarreras(
                    data.map((c) => ({
                        value: c.id,
                        label: c.carrera,
                    }))
                )
            )
            .catch((error) => console.log(error));
        axios
            .get(`${baseUrl}/egresados/${egresado.id}`)
            .then(({ data }) => setDatoEgresado(data))
            .catch((error) => console.log(error));
    }, [actualizador]);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        onResetForm();
        setAddMode(true);
        setValueCarrera();
        setValueFacultad();
        setValueUniversidad();
        setShowAlert(false);
        setShow(true);
    };

    const initialForm = {
        usuario: egresado.id,
        matricula: "",
        ciclo_egreso: "",
        carrera: "",
        facultad: "",
        universidad: "",
        postgrado: false,
    };

    const { formState, onInputChange, onResetForm, setFormState } =
        useForm(initialForm);

    const handleChangepostgrado = (e) => {
        if (formState.postgrado) {
            setFormState({ ...formState, postgrado: false });
        } else {
            setFormState({ ...formState, postgrado: true });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        /* Validación React */
        if (
            formState.ciclo_egreso &&
            !!valueUniversidad &&
            !!valueFacultad &&
            !!valueCarrera
        ) {
            formState.ciclo_egreso = `${formState.ciclo_egreso}-01-01`;
            valueCarrera.value
                ? (formState.carrera = valueCarrera.value)
                : (formState.carrera = valueCarrera.label);
            valueFacultad.value
                ? (formState.facultad = valueFacultad.value)
                : (formState.facultad = valueFacultad.label);
            valueUniversidad.value
                ? (formState.universidad = valueUniversidad.value)
                : (formState.universidad = valueUniversidad.label);

            setShow(false);

            if (addMode) {
                console.log(formState);
                const url = `${baseUrl}/crear/egresos/`;
                axios
                    .post(url, formState, config)
                    .then(({ data }) => {
                        console.log(data);
                        CallToast(messagePositivo, "primary");
                        Actualizar();
                    })
                    .catch(({ response }) => {
                        CallToast(messageNegativo, "danger");
                        console.log(response);
                    });
            } else {
                const url = `${baseUrl}/editar/egresos/${formState.usuario}/`;
                console.log(formState);
                formState.usuario = egresado.id;
                axios
                    .put(url, formState, config)
                    .then(({ data }) => {
                        console.log(data);
                        CallToast(messagePositivo, "primary");
                        Actualizar();
                    })
                    .catch(({ response }) => {
                        console.log(response);
                        CallToast(messageNegativo, "danger");
                    });
            }
        } else {
            setShowAlert(true);
        }
    };

    function NoHayCambios(initial, changed) {
        // No está funcionando pero no interfiere en la destreza del componente
        return (
            initial.matricula == changed.matricula &&
            initial.ciclo_egreso == changed.ciclo_egreso &&
            !!valueCarrera &&
            !!valueFacultad &&
            !!valueUniversidad
        );
    }

    /* Notificación Push */
    const [mostrar, setMostrar] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [tipo, setTipo] = useState("");
    const messagePositivo = (
        <>
            <b>¡Se {addMode ? "agregó el nuevo" : "modificó el"} título!</b>
        </>
    );
    const messageNegativo = (
        <>
            <b>Problema con el servidor, intente nuevamente.</b>
        </>
    );
    function CallToast(mensaje, tipo) {
        setTipo(tipo);
        setMensaje(mensaje);
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

    const [isLoadingSelectCarrera, setIsLoadingSelectCarrera] = useState(false);
    const [isLoadingSelectFacultad, setIsLoadingSelectFacultad] =
        useState(false);
    const [isLoadingSelectUniversidad, setIsLoadingSelectUniversidad] =
        useState(false);

    const [valueCarrera, setValueCarrera] = useState();
    const [valueFacultad, setValueFacultad] = useState();
    const [valueUniversidad, setValueUniversidad] = useState();
    const handleCreateSelectCarrera = (inputValue) => {
        setIsLoadingSelectCarrera(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelectCarrera(false); // saca el loading
            setDefaultOptionsCarreras((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setValueCarrera(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    const handleCreateSelectFacultad = (inputValue) => {
        setIsLoadingSelectFacultad(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelectFacultad(false); // saca el loading
            setDefaultOptionsFacultades((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setValueFacultad(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    const handleCreateSelectUniversidad = (inputValue) => {
        setIsLoadingSelectUniversidad(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelectUniversidad(false); // saca el loading
            setDefaultOptionsUniversidades((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setValueUniversidad(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    /* Fin Select-input de carrera-facultad-universidad */

    /* Validación Alert */
    const [showAlert, setShowAlert] = useState(false);
    /* Fin Validación Alert */

    /* Función editar */
    function handleEdit(event, egreso) {
        event.preventDefault();
        setAddMode(false);
        formState.usuario = egreso.id;
        formState.matricula = egreso.matricula;
        formState.ciclo_egreso = egreso.ciclo_egreso.split("-")[0];
        formState.universidad = egreso.carrera.facultad.universidad;
        formState.facultad = egreso.carrera.facultad;
        formState.carrera = egreso.carrera;
        setValueUniversidad({
            label: egreso.carrera.facultad.universidad.universidad,
            value: egreso.carrera.facultad.universidad.id,
        });
        setValueFacultad({
            label: egreso.carrera.facultad.facultad,
            value: egreso.carrera.facultad.id,
        });
        setValueCarrera({
            label: egreso.carrera.carrera,
            value: egreso.carrera.id,
        });
        setShow(true);
        console.log(formState);
    }
    /* Fin Función editar */

    /* Función eliminar */
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [toDelete, setToDelete] = useState([]);
    const messageEliminado = (
        <>
            <b>El título ha sido eliminado correctamente.</b>
        </>
    );
    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
    };
    const handleDelete = (event, egre) => {
        event.preventDefault();
        setToDelete(egre);
        setShowModalDelete(true);
    };
    const handleSubmitModalDelete = (event) => {
        event.preventDefault();

        const url = `${baseUrl}/eliminar/egresos/${toDelete.id}/`;
        axios
            .delete(url, config)
            .then(({ data }) => {
                console.log(data);
                CallToast(messageEliminado, "primary");
                Actualizar();
            })
            .catch(({ response }) => {
                console.log(response);
                CallToast(messageNegativo, "danger");
            });
        setShowModalDelete(false);
        setToDelete([]);
    };
    /* Fin Función eliminar */

    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h3>
                    <i className="bi bi-mortarboard-fill"></i> Títulos
                </h3>
                <hr />
                <Button variant="secondary" onClick={handleShow}>
                    <i className="bi bi-plus-circle"></i> Agregar Título
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
                        {datoEgresado?.egresos.map((egre) => (
                            <tr key={egre.id}>
                                <th scope="row">
                                    {egre.matricula ? egre.matricula : "--"}
                                    {egre.postgrado && (
                                        <>
                                            <Badge pill bg="warning" text="dark">
                                                POSTGRADO
                                            </Badge>
                                        </>
                                    )}
                                </th>
                                <td>{egre.ciclo_egreso.split("-")[0]}</td>
                                <td>{egre.carrera.carrera}</td>
                                <td>{egre.carrera.facultad.facultad}</td>
                                <td>
                                    {egre.carrera.facultad.universidad.acronimo
                                        ? egre.carrera.facultad.universidad
                                              .acronimo
                                        : egre.carrera.facultad.universidad
                                              .universidad}{" "}
                                </td>
                                <td>
                                    {egre.id !==
                                    datoEgresado.egresos[
                                        datoEgresado.egresos.length - 1
                                    ].id ? (
                                        <>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="m-1"
                                                        onClick={(event) => {
                                                            handleEdit(
                                                                event,
                                                                egre
                                                            );
                                                        }}
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        variant="outline-danger"
                                                        className="m-1"
                                                        onClick={(event) => {
                                                            handleDelete(
                                                                event,
                                                                egre
                                                            );
                                                        }}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : (
                                        <>
                                            <b className="mx-auto">*</b>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="my-2" style={{ fontSize: "10pt" }}>
                    * : Es el título a cuál se le realiza seguimiento. Si desea
                    modificarlo, contáctese con
                    egresados.computacion@herrera.unt.edu.ar
                </div>
                <ToastNotificacionPush
                    mensaje={mensaje}
                    mostrar={mostrar}
                    tipo={tipo}
                />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {addMode ? "Agregar" : "Editar"} Egreso
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
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
                                controlId="formUniversidad"
                            >
                                <Form.Label>Universidad</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    isDisabled={isLoadingSelectUniversidad}
                                    isLoading={isLoadingSelectUniversidad}
                                    onChange={(newValue) =>
                                        setValueUniversidad(newValue)
                                    }
                                    onCreateOption={
                                        handleCreateSelectUniversidad
                                    }
                                    options={defaultOptionsUniversidades}
                                    value={valueUniversidad}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formFacultad"
                            >
                                <Form.Label>Facultad</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    isDisabled={
                                        isLoadingSelectFacultad ||
                                        !valueUniversidad
                                    }
                                    isLoading={isLoadingSelectFacultad}
                                    onChange={(newValue) =>
                                        setValueFacultad(newValue)
                                    }
                                    onCreateOption={handleCreateSelectFacultad}
                                    options={defaultOptionsFacultades}
                                    value={valueFacultad}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formCarrera"
                            >
                                <Form.Label>Carrera</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    isDisabled={
                                        isLoadingSelectCarrera ||
                                        !valueFacultad ||
                                        !valueUniversidad
                                    }
                                    isLoading={isLoadingSelectCarrera}
                                    onChange={(newValue) =>
                                        setValueCarrera(newValue)
                                    }
                                    onCreateOption={handleCreateSelectCarrera}
                                    options={defaultOptionsCarreras}
                                    value={valueCarrera}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formpostgrado"
                            >
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="¿Es postgrado?"
                                    name="fin"
                                    onChange={handleChangepostgrado}
                                    checked={formState.postgrado}
                                />
                            </Form.Group>
                        </Form>
                        {showAlert &&
                        !(
                            formState.ciclo_egreso &&
                            valueUniversidad &&
                            valueFacultad &&
                            valueCarrera
                        ) ? (
                            <>
                                <Alert
                                    className="my-3"
                                    variant="danger"
                                    onClose={() => setShowAlert(false)}
                                    dismissible
                                >
                                    <b>
                                        Formulario incompleto, falta: <br />
                                    </b>
                                    {!formState.ciclo_egreso
                                        ? "Año de Egreso,"
                                        : ""}
                                    {!valueUniversidad ? " Universidad," : ""}
                                    {!valueFacultad ? " Facultad," : ""}
                                    {!valueCarrera ? " Carrera." : "."}
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
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={NoHayCambios(initialForm, formState)}
                        >
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>¿Eliminar título?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Desea eliminar el siguiente título? <br />
                        <b>"{toDelete?.carrera?.carrera}"</b>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseModalDelete}
                        >
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmitModalDelete}
                            variant="danger"
                        >
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
