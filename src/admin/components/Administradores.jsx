import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { DataContext } from "../../context/DataContext";
import Select from "react-select";
import { useConfig } from "../../auth/hooks/useConfig";
import axios from "axios";
import { ToastNotificacionPush } from "../../egresados/components/ToastNotificacionPush";

export const Administradores = () => {
    const { data } = useContext(DataContext);
    const [actualizador, setActualizador] = useState(false);
    function Actualizar() {
        setActualizador(!actualizador);
    }
    const [egresados, setEgresados] = useState([]);
    useEffect(() => {
        if (data) {
            setEgresados(data);
        }
    }, []);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setValue("");
        setShow(true);
    };
    /* Select input */
    const [value, setValue] = useState();
    const baseUrl = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();
    useEffect(() => {
        axios
            .get(`${baseUrl}/egresados/`)
            .then(({ data }) =>
                setOptions(
                    data.map((u) => ({
                        value: u.id,
                        label: `${u.apellidos}, ${u.nombres}`,
                    }))
                )
            )
            .catch((error) => console.log(error));
    }, [actualizador]);
    const [options, setOptions] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value == "" || value == null) {
            console.log("elija un egresado");
        } else {
            AgregarEliminarAdmin("agregar", value.value);
            handleClose();
        }
    };
    const [toDelete, setToDelete] = useState([]);
    const handleDelete = (event, egresado) => {
        event.preventDefault();
        setToDelete(egresado);
        setShowDeleteConfirm(true);
    };
    const handleDeleteConfirm = (event) => {
        event.preventDefault();
        AgregarEliminarAdmin("eliminar", toDelete.id);
        setShowDeleteConfirm(false);
    };

    function AgregarEliminarAdmin(funcion, idEgresado) {
        const url = `${baseUrl}/editar/egresados/${idEgresado}/`;
        let formState = egresados.find((egresado) => egresado.id == idEgresado);
        if (formState) {
            if (funcion == "agregar") {
                formState.is_admin = true;
            }
            if (funcion == "eliminar") {
                formState.is_admin = false;
            }
            axios
                .put(url, formState, config)
                .then(({ data }) => {
                    CallToast(funcion);
                    setTimeout(() => {
                        Actualizar();
                    }, 2000);
                })
                .catch(({ response }) => CallToast("problema"));
        } else {
            console.log("no se encontró egresado");
        }
    }
    /* FIN Select input */

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [mensaje, setMensaje] = useState();
    const handleCloseDeleteConfirm = () => {
        setShowDeleteConfirm(false);
    };

    /* push mensajes */
    const [showPush, setShowPush] = useState(false);
    const [type, setType] = useState();
    let mensajeAdminCreadoExito = (
        <>
            <b>¡Se ha creado el admin exitosamente!</b>
        </>
    );
    let mensajeAdminEliminadoExito = (
        <>
            <b>¡Se ha eliminado el admin exitosamente!</b>
        </>
    );
    let mensajeAdminProblema = (
        <>
            <b>Se encontraron problemas con el servidor, intente nuevamente.</b>
        </>
    );
    function CallToast(tipo) {
        if (tipo == "eliminar") {
            setMensaje(mensajeAdminEliminadoExito);
            setType("primary");
        }
        if (tipo == "agregar") {
            setMensaje(mensajeAdminCreadoExito);
            setType("primary");
        }
        if (tipo == "problema") {
            setMensaje(mensajeAdminProblema);
            setType("danger");
        }
        setShowPush(true);
        setTimeout(() => {
            setShowPush(false);
        }, 5100);
    }
    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h3>
                    <i className="bi bi-controller"></i> Administradores
                </h3>
                <hr />
                <Button variant="secondary" onClick={handleShow}>
                    <i className="bi bi-person-add"></i> Agregar Administrador
                </Button>
                <Table responsive className="mt-3">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {egresados.map((egresado) =>
                            egresado.is_admin == true ? (
                                <tr key={egresado.id}>
                                    <td>
                                        {egresado.apellidos}, {egresado.nombres}
                                    </td>
                                    <td>{egresado.email}</td>
                                    <td>
                                        <Button
                                            variant="outline-danger"
                                            className=" my-1"
                                            onClick={(event) => {
                                                handleDelete(event, egresado);
                                            }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ) : (
                                ""
                            )
                        )}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Administrador </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Selecciona un egresado
                        <Select
                            options={options}
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button type="submit" onClick={handleSubmit}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={showDeleteConfirm}
                    onHide={handleCloseDeleteConfirm}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Administrador</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Confirmar eliminación del siguiente administrador:
                        <br />
                        <b>
                            {toDelete?.apellidos}, {toDelete?.nombres}
                        </b>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseDeleteConfirm}
                        >
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            variant="danger"
                            onClick={handleDeleteConfirm}
                        >
                            Eliminar{" "}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastNotificacionPush
                    mensaje={mensaje}
                    mostrar={showPush}
                    tipo={type}
                />
            </div>
        </>
    );
};
