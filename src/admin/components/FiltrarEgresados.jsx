import React, { useContext, useState } from "react";
import { TablaEgresados } from "./TablaEgresados";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { DataContext } from "../../context/DataContext";
import { useForm } from "../../egresados/hooks/useForm";

function tiene(obj, key, value) {
    try {
        return obj[key].toLowerCase().includes(value.toLowerCase());
    } catch (e) {
        return false;
    }
}

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
        const egresadosFiltrados = data.filter((egresado) => {
            let deberiaEstar = true;

            if (formState.nombre !== "") {
                deberiaEstar =
                    deberiaEstar &&
                    tiene(egresado, "nombres", formState.nombre);
            }

            if (formState.apellido !== "") {
                deberiaEstar =
                    deberiaEstar &&
                    tiene(egresado, "apellidos", formState.apellido);
            }

            if (formState.ciudad_natal !== "") {
                deberiaEstar =
                    deberiaEstar &&
                    tiene(egresado, "ciudad_natal", formState.ciudad_natal);
            }

            if (formState.ciudad_actual !== "") {
                deberiaEstar =
                    deberiaEstar &&
                    tiene(egresado, "ciudad_actual", formState.ciudad_actual);
            }

            if (formState.sexo !== "") {
                deberiaEstar =
                    deberiaEstar && tiene(egresado, "sexo", formState.sexo);
            }

            return deberiaEstar;
        });

        setEgresados(egresadosFiltrados);
        setLoading(false);
    };

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
                            <Form onSubmit={handleSubmit}>
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

                {egresados?.length}
                <br />

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>nombres</td>
                            <td>apellidos</td>
                            <td>ciudad_natal</td>
                            <td>ciudad_actual</td>
                        </tr>
                    </thead>
                    <tbody>
                        {egresados.map((eg) => (
                            <tr>
                                <td>{eg.nombres}</td>
                                <td>{eg.apellidos}</td>
                                <td>{eg.ciudad_natal}</td>
                                <td>{eg.ciudad_actual}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <TablaEgresados />
            </Container>
        </>
    );
};
