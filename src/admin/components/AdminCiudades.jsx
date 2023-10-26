import React, { useEffect, useState } from "react";
import { useConfig } from "../../auth/hooks/useConfig";
import axios from "axios";
import { Alert, Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { Loading } from "../../ui/components/Loading";
import { useForm } from "../../egresados/hooks/useForm";
import { ToastNotificacionPush } from "../../egresados/components/ToastNotificacionPush";

function tipoOrganizacion(t) {
    if (t == "e") return `Pública`;
    if (t == "p") return `Privada`;
    if (t == "i") {
        return `Independiente`;
    } else {
        return `Sin Información`;
    }
}

function cantidadEmpleados(c) {
    if (c == 1) return `[1, 10]`;
    if (c == 2) return `[11, 100]`;
    if (c == 3) {
        return `[101, 1000+)`;
    } else {
        return `Sin Información`;
    }
}

export const AdminCiudades = () => {
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();
    const [actualizador, setActualizador] = useState(false);
    const [organizaciones, setOrganizaciones] = useState([]);
    const actualizar = () => {
        setActualizador((a) => !a);
        setLoading(true);
        /*setChoosed(false);
        setValue(""); */
    };
    useEffect(() => {
        axios
            .get(`${baseUrl}/organizaciones/`)
            .then(({ data }) => {
                setOrganizaciones(data);
                if (data) {
                    setLoading(false);
                }
            })
            .catch((error) => console.log(error));
        /* axios
            .get(`${baseUrl}/ciudades/`)
            .then(({ data }) => {
                setOptionsCities(
                    data.map((u) => ({
                        value: u.id,
                        label: u.ciudad,
                    }))
                );
            })
            .catch((error) => console.log(error)); */
    }, [actualizador]);

    /* Modal agregar/editar organizacion */
    const [show, setShow] = useState(false);
    const [addMode, setAddMode] = useState(true);
    const [waitAxios, setWaitAxios] = useState(false);
    const initialForm = {
        organizacion: "",
        descripcion: "",
        tipo: "",
        email: "",
        web: "",
        empleados: "",
    };
    const [showAlert, setShowAlert] = useState(false);
    const { formState, onInputChange, onResetForm } = useForm(initialForm);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
        onResetForm();
        setShowAlert(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setWaitAxios(true);
        /* controlar que todo esté bien */
        if (
            formState.organizacion &&
            formState.tipo &&
            formState.empleados &&
            formState.web &&
            formState.email &&
            formState.descripcion
        ) {
            if (!formState.web.includes("http")) {
                formState.web = `https://${formState.web}`;
            }
            if (addMode) {
                const url = `${baseUrl}/crear/organizaciones/`;
                console.log(formState);
                axios
                    .post(url, formState, config)
                    .then(({ data }) => {
                        console.log(data);
                        CallToast(messagePositivo, "primary");
                        actualizar();
                        setShow(false);
                        setWaitAxios(false);
                    })
                    .catch(({ response }) => {
                        CallToast(messageNegativo, "danger");
                        console.log(response);
                        setWaitAxios(false);
                    });
            } else {
                const url = `${baseUrl}/editar/organizaciones/${formState.id}/`;
                axios
                    .put(url, formState, config)
                    .then(({ data }) => {
                        console.log(data);
                        setWaitAxios(false);
                        actualizar();
                        CallToast(messageChangedPositivo, "primary");
                        setShow(false);
                    })
                    .catch(({ response }) => {
                        setWaitAxios(false);
                        console.log(response);
                        CallToast(messageNegativo, "danger");
                    });
            }
        } else {
            setShowAlert(true);
            setWaitAxios(false);
        }
    };
    const handleChangeOrganizacion = (e, o) => {
        e.preventDefault();
        setAddMode(false);
        setShowAlert(false);
        formState.id = o.id;
        formState.organizacion = o.organizacion;
        formState.descripcion = o.descripcion || "";
        formState.tipo = o.tipo || "";
        formState.email = o.email || "";
        formState.web = o.web || "";
        formState.empleados = o.empleados || "";

        setShow(true);
    };
    /* Fin Modal agregar/editar organizacion */

    /* Modal Eliminar organización */
    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
    };
    const [toDelete, setToDelete] = useState();
    const [eliminarButtonDisabled, setEliminarButtonDisabled] = useState(false);
    const handleSubmitModalDelete = () => {
        event.preventDefault();
        setEliminarButtonDisabled(true);
        const url = `${baseUrl}/eliminar/organizaciones/${toDelete.id}/`;
        axios
            .delete(url, config)
            .then(({ data }) => {
                console.log(data);
                setEliminarButtonDisabled(false);
                setShowModalDelete(false);
                setToDelete([]);
                CallToast(messageEliminado, "primary");
                actualizar();
            })
            .catch(({ response }) => {
                console.log(response);
                CallToast(messageNegativo, "danger");
                setShowModalDelete(false);
                setToDelete([]);
            });
    };
    const handleDelete = (e, org) => {
        e.preventDefault();
        setToDelete(org);
        setShowModalDelete(true);
    };
    /* FinModal Eliminar organización */

    /* Notificación Push */
    const [mostrar, setMostrar] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [tipo, setTipo] = useState("");
    const messagePositivo = (
        <>
            <b>¡Se agregó la nueva Organización!</b>
        </>
    );
    const messageChangedPositivo = (
        <>
            <b>¡Modificación exitosa!</b>
        </>
    );
    const messageEliminado = (
        <>
            <b>¡Eliminación exitosa!</b>
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
    /* FIN Notificación Push */
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="container-fluid mt-2 text-secondary">
                        <h3>
                            <i className="bi bi-globe2"></i> Empresas y
                            Organizaciones
                        </h3>
                        <hr />

                        <Button variant="secondary" onClick={handleShow}>
                            <i className="bi bi-plus-circle"></i> Agregar
                            Organización
                        </Button>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Organización</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">email</th>
                                    <th scope="col">Web</th>
                                    <th scope="col">Cantidad de Empleados</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {organizaciones?.map((o, index) => (
                                    <tr key={o.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{o.organizacion}</td>
                                        <td>{o?.descripcion}</td>
                                        <td>{tipoOrganizacion(o?.tipo)}</td>
                                        <td>{o?.email}</td>
                                        <td>{o?.web}</td>
                                        <td>
                                            {cantidadEmpleados(o?.empleados)}
                                        </td>
                                        <td>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="my-1"
                                                        onClick={(e) => {
                                                            handleChangeOrganizacion(
                                                                e,
                                                                o
                                                            );
                                                        }}
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        variant="outline-danger"
                                                        className="my-1"
                                                        onClick={(e) =>
                                                            handleDelete(e, o)
                                                        }
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {addMode ? "Agregar" : "Modificar"} organización
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formOrganizacion"
                                >
                                    <Form.Label>
                                        Nombre de la Organización:
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.organizacion}
                                        onChange={onInputChange}
                                        name="organizacion"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formOrganizacion"
                                >
                                    <Form.Label>Tipo:</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        required
                                        name="tipo"
                                        value={formState.tipo}
                                        onChange={onInputChange}
                                    >
                                        <option disabled value="">
                                            Elija el tipo de organización
                                        </option>
                                        <option value="p">Privada</option>
                                        <option value="e">Pública</option>
                                        <option value="i">Independiente</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formDescripcion"
                                >
                                    <Form.Label>Descripción:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={formState.descripcion}
                                        onChange={onInputChange}
                                        name="descripcion"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formEmail"
                                >
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={formState.email}
                                        onChange={onInputChange}
                                        name="email"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formOrganizacion"
                                >
                                    <Form.Label>Sitio Web:</Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={formState.web}
                                        onChange={onInputChange}
                                        name="web"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formOrganizacion"
                                >
                                    <Form.Label>
                                        Cantidad de Empleados:
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        required
                                        name="empleados"
                                        value={formState.empleados}
                                        onChange={onInputChange}
                                    >
                                        <option disabled value="">
                                            Elija la cantidad de Empleados
                                        </option>
                                        <option value="1">
                                            Chica: [1, 10] empleados
                                        </option>
                                        <option value="2">
                                            Mediana: [11, 100] empleados
                                        </option>
                                        <option value="3">
                                            Grande: [101, 1000+) empleados
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>

                            {showAlert &&
                            !(
                                formState.organizacion &&
                                formState.tipo &&
                                formState.empleados &&
                                formState.descripcion &&
                                formState.email &&
                                formState.web
                            ) ? (
                                <>
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShowAlert(false)}
                                        dismissible
                                    >
                                        {!(
                                            formState.organizacion &&
                                            formState.tipo &&
                                            formState.empleados &&
                                            formState.descripcion &&
                                            formState.email &&
                                            formState.web
                                        ) ? (
                                            <b>
                                                - Formulario incompleto, falta:{" "}
                                                <br />
                                            </b>
                                        ) : (
                                            ""
                                        )}
                                        {!formState.organizacion
                                            ? "Nombre de la Organización,"
                                            : ""}
                                        {!formState.tipo
                                            ? " Tipo de organización,"
                                            : ""}
                                        {!formState.empleados
                                            ? " Cantidad de Empleados,"
                                            : ""}
                                        {!formState.descripcion
                                            ? " Descripción,"
                                            : ""}
                                        {!formState.email ? " Email," : ""}
                                        {!formState.web ? " Página Web." : ""}
                                    </Alert>
                                </>
                            ) : (
                                ""
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                                disabled={waitAxios}
                            >
                                Cerrar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                disabled={waitAxios}
                            >
                                Guardar Cambios
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={showModalDelete}
                        onHide={handleCloseModalDelete}
                    >
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

                    <ToastNotificacionPush
                        mensaje={mensaje}
                        mostrar={mostrar}
                        tipo={tipo}
                    />
                </>
            )}
        </>
    );
};
