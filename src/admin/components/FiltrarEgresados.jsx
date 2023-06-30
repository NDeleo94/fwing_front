import React, { useContext, useState } from "react";
import { TablaEgresados } from "./TablaEgresados";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { DataContext } from "../../context/DataContext";
import { useForm } from "../../egresados/hooks/useForm";

export const FiltrarEgresados = () => {
    const { data } = useContext(DataContext);
    const initialForm = {
        nombre: "",
        apellido: "",
        ciudad_natal: "",
        ciudad_actual: "",
        desde: "",
        hasta: "",
        sexo: "",
    };
    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    const [toFilter, setToFilter] = useState(); // formState al momento de clickear el filtro
    const [egresados, setEgresados] = useState(data); // copia exacta de data
    const [filteredEgresados, setFilteredEgresados] = useState(); // resultado final
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setFilteredEgresados(egresados);
        console.log(egresados);
        console.log(filteredEgresados);
        setTimeout(() => {
            console.log(filteredEgresados);
            setToFilter(formState);
            console.log(toFilter);
            FiltrarNombre(toFilter.nombre);
            FiltrarApellido(toFilter.apellido);
            setLoading(false);
        }, 10000);
    };

    function FiltrarNombre(nombre) {
        console.log("filtrarNombre");
        console.log(nombre);
        if (nombre == "") {
            return;
        }
        console.log(filteredEgresados);
        let aux = filteredEgresados.filter((item) => {
            const filter = item.nombres
                .toLowerCase()
                .includes(nombre.toLowerCase());

            return filter ? filter : null;
        });

        setFilteredEgresados(aux);
        console.log(aux);
    }

    function FiltrarApellido(apellido) {
        console.log("filtrarApellido");
        if (apellido == "") {
            return;
        }
        console.log(filteredEgresados);
        let aux = filteredEgresados.filter((item) => {
            const filter = item.apellidos
                .toLowerCase()
                .includes(apellido.toLowerCase());

            return filter ? filter : null;
        });

        setFilteredEgresados(aux);
        console.log(filteredEgresados);
    }

    const handleClean = (event) => {
        event.preventDefault();
        onResetForm();
        setLoading(false);
    };

    function NoHayCambios(initial, changed) {
        return (
            initial.ciudad_actual == formState.ciudad_actual &&
            initial.ciudad_natal == formState.ciudad_natal &&
            initial.nombre == changed.nombre &&
            initial.apellido == changed.apellido &&
            initial.desde == changed.desde &&
            initial.hasta == changed.hasta &&
            initial.sexo == changed.sexo
        );
    }

    return (
        <>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>Filtrar Egresados</Card.Title>
                        <hr />
                        <Container fluid>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.nombre}
                                        onChange={onInputChange}
                                        name="nombre"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.apellido}
                                        onChange={onInputChange}
                                        name="apellido"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>ciudad_natal</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.ciudad_natal}
                                        onChange={onInputChange}
                                        name="ciudad_natal"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>ciudad_actual</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.ciudad_actual}
                                        onChange={onInputChange}
                                        name="ciudad_actual"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Row>
                                        <Col>
                                            <Form.Label>Desde</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={formState.inicio}
                                                onChange={onInputChange}
                                                name="desde"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label>Hasta</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={formState.hasta}
                                                onChange={onInputChange}
                                                name="hasta"
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="sexo"
                                    value={formState.sexo}
                                    onChange={onInputChange}
                                >
                                    <option>Elija una opción...</option>
                                    <option value="F">Femenino</option>
                                    <option value="M">Masculino</option>
                                </Form.Select>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="mt-3"
                                >
                                    Filtrar Egresados
                                </Button>
                                <Button
                                    type="button"
                                    className="mt-3 ms-3"
                                    variant="secondary"
                                    onClick={handleClean}
                                >
                                    Limpiar Filtro
                                </Button>
                            </Form>
                        </Container>
                    </Card.Body>
                </Card>

                {filteredEgresados?.lenght}
                <br />
                {JSON.stringify(filteredEgresados)}

                <TablaEgresados />
            </Container>
        </>
    );
};
