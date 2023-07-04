import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { DataContext } from "../../context/DataContext";
import Select from "react-select";
import { useConfig } from "../../auth/hooks/useConfig";
import axios from "axios";

export const Administradores = () => {
    const { data } = useContext(DataContext);
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
        setShow(true);
    };
    /* Select input */
    const baseUrl = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();
    useEffect(() => {
        axios
            .get(`${baseUrl}/egresados/`)
            .then(({ data }) =>
                setOptions(
                    data.map((u) => ({
                        value: u.id,
                        label: `${u.apellidos} ${u.nombres}`,
                    }))
                )
            )
            .catch((error) => console.log(error));
    }, []);
    const [options, setOptions] = useState([]);
    const handleSubmit = () => {};
    /* FIN Select input */
    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h3>Administradores</h3>
                <hr />
                <Button variant="secondary" onClick={handleShow}>
                    <i class="bi bi-person-add"></i> Agregar Administrador
                </Button>
                <Table responsive>
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>{/* egresados.map({(map)=>{map.}} */}</tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Administrador </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Selecciona un egresado <Select options={options} />
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
            </div>
        </>
    );
};
