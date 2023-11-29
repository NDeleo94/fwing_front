import React, { useEffect, useState } from "react";
import { useConfig } from "../../auth/hooks/useConfig";
import axios from "axios";
import { Alert, Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { Loading } from "../../ui/components/Loading";
import { useForm } from "../../egresados/hooks/useForm";
import { ToastNotificacionPush } from "../../egresados/components/ToastNotificacionPush";

export const AdminPuestos = () => {
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
            .get(`${baseUrl}/puestos/`)
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
    }, [actualizador, organizaciones]);

    /* Modal agregar/editar organizacion */
    const [show, setShow] = useState(false);
    const [addMode, setAddMode] = useState(true);
    const [waitAxios, setWaitAxios] = useState(false);
    const initialForm = {
        searchText: "",
        id: 0,
        puesto: "",
        descripcion: "",
    };
    const [showAlert, setShowAlert] = useState(false);
    const { formState, onInputChange, onResetForm } = useForm(initialForm);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setAddMode(true);
        setShow(true);
        onResetForm();
        setShowAlert(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setWaitAxios(true);
        /* controlar que todo esté bien */
        if (formState.puesto && formState.descripcion) {
            if (addMode) {
                const url = `${baseUrl}/crear/puestos/`;
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
                const url = `${baseUrl}/editar/puestos/${formState.id}/`;
                console.log(formState);
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
        formState.puesto = o.puesto;
        formState.descripcion = o.descripcion || "";
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
        const url = `${baseUrl}/eliminar/puestos/${toDelete.id}/`;
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
            <b>¡Se agregó el nuevo Puesto de Trabajo!</b>
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

    const [filteredOrganizations, setFilteredOrganizations] = useState([])

    useEffect(() => {
        const value = formState.searchText;
        let updatedData = [];
        let aux = [];
        /* setTextSearched(searchText); */
        if (value.length) {
            const filterFirstName =
                organizaciones &&
                organizaciones.filter((item) => {
                    const filter = item.puesto
                        .toLowerCase()
                        .includes(value.toLowerCase());

                    return filter ? filter : null;
                });

            /* const filterLastName =
                egresados &&
                egresados.filter((item) => {
                    const filter = item.apellidos
                        .toLowerCase()
                        .includes(value.toLowerCase());

                    return filter ? filter : null;
                });

            const result = filterFirstName
                ? filterFirstName.concat(filterLastName)
                : aux; */
            updatedData = filterFirstName.reduce((acc, item) => {
                if (!acc.includes(item)) {
                    acc.push(item);
                }
                return acc;
            }, []);
            setFilteredOrganizations(updatedData);
        } else {
            setFilteredOrganizations(organizaciones);
        }
    }, [organizaciones, formState.searchText]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="container-fluid mt-2 text-secondary">
                        <h3>
                            <i className="bi bi-person-workspace"></i> Puestos
                            de Trabajo
                        </h3>
                        <hr />

                        <Button variant="secondary" onClick={handleShow}>
                            <i className="bi bi-plus-circle"></i> Agregar Puesto
                        </Button>
                        <Form className="my-3">
                            <input
                                type="text"
                                placeholder="Busca un Puesto de Trabajo"
                                className="form-control"
                                name="searchText"
                                autoComplete="off"
                                value={formState.searchText}
                                onChange={onInputChange}
                            />
                        </Form>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre del Puesto</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrganizations?.map((o, index) => (
                                    <tr key={o.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{o.puesto}</td>
                                        <td>{o?.descripcion}</td>
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
                                {addMode ? "Agregar" : "Modificar"} puesto
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formPuesto"
                                >
                                    <Form.Label>Nombre del Puesto:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.puesto}
                                        onChange={onInputChange}
                                        name="puesto"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formDescrpPuesto"
                                >
                                    <Form.Label>Descripción:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.descripcion}
                                        onChange={onInputChange}
                                        name="descripcion"
                                    />
                                </Form.Group>
                            </Form>

                            {showAlert &&
                            !(formState.puesto && formState.descripcion) ? (
                                <>
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShowAlert(false)}
                                        dismissible
                                    >
                                        {!(
                                            formState.puesto &&
                                            formState.descripcion
                                        ) ? (
                                            <b>
                                                - Formulario incompleto, falta:{" "}
                                                <br />
                                            </b>
                                        ) : (
                                            ""
                                        )}
                                        {!formState.puesto
                                            ? "Nombre del puesto,"
                                            : ""}
                                        {!formState.descripcion
                                            ? " Descripción,"
                                            : ""}
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
                            <Modal.Title>
                                ¿Eliminar Puesto de Trabajo?
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Desea eliminar el siguiente puesto de trabajo?{" "}
                            <br />
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
