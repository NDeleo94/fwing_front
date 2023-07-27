import React, { useContext, useState } from "react";
import { TablaEgresados } from "./TablaEgresados";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { DataContext } from "../../context/DataContext";
import { useForm } from "../../egresados/hooks/useForm";
import { convertirFecha } from "../../egresados/helpers/manejoFecha";

function tiene(obj, key, value) {
    try {
        return obj[key].toLowerCase().includes(value.toLowerCase());
    } catch (e) {
        return false;
    }
}

function despuesDe(obj, value) {
    try {
        if (
            value.split("-")[0] >
            obj.split("-")[0]
        ) {
            return false;
        } else if (
            value.split("-")[0] ==
            obj.split("-")[0]
        ) {
            if (
                value.split("-")[1] > obj.split("-")[1]
            ) {
                return false;
            } else if (
                value.split("-")[1] == obj.split("-")[1]
            ) {
                if (
                    value.split("-")[2] >
                    obj.split("-")[2]
                ) {
                    return false;
                }
            }
        }
        return true;
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
        nacionalidad: "",
        desde: "",
        hasta: "",
        sexo: "",
        seLogueo: false,
        tieneEmail: false,
    };
    const { formState, onInputChange, onResetForm, setFormState } =
        useForm(initialForm);

    const [egresados, setEgresados] = useState(data); // copia exacta de data
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const egresadosFiltrados = data.filter((egresado) => {
            let deberiaEstar = true;
            let ciclo_egreso_following;
            egresado.egresos.map((egre) => {
                if (egre.carrera.following) {
                    ciclo_egreso_following = egre.ciclo_egreso;
                }
            });

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

            if (formState.desde !== "") {
                deberiaEstar =
                    deberiaEstar && despuesDe(ciclo_egreso_following, formState.desde);
            }

            if (formState.hasta !== "") {
                deberiaEstar =
                    deberiaEstar && !despuesDe(ciclo_egreso_following, formState.hasta);
            }

            if (formState.tieneEmail) {
                deberiaEstar = deberiaEstar && egresado.email == "";
            }

            if (formState.seLogueo) {
                deberiaEstar = deberiaEstar && !egresado.last_login;
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

    /* function NoHayCambios(initial, changed) {
        return (
            initial.ciudad_actual == formState.ciudad_actual &&
            initial.ciudad_natal == formState.ciudad_natal &&
            initial.nombre == changed.nombre &&
            initial.apellido == changed.apellido &&
            initial.desde == changed.desde &&
            initial.hasta == changed.hasta &&
            initial.sexo == changed.sexo
        );
    } */
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
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.apellido}
                                        onChange={onInputChange}
                                        name="apellido"
                                    />
                                </Form.Group>
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
                                    <Form.Label>Ciudad Actual</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.ciudad_actual}
                                        onChange={onInputChange}
                                        name="ciudad_actual"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ciudad Natal</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.ciudad_natal}
                                        onChange={onInputChange}
                                        name="ciudad_natal"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nacionalidad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState.nacionalidad}
                                        onChange={onInputChange}
                                        name="nacionalidad"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Row>
                                        <Col>
                                            <Form.Label>Desde</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={formState.desde}
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
                                <Form.Group className="mb-3">
                                    <Form.Label>Sexo</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="sexo"
                                        value={formState.sexo}
                                        onChange={onInputChange}
                                    >
                                        <option disabled>
                                            Elija una opción...
                                        </option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Check
                                    type="switch"
                                    id="custom-switch2"
                                    label="Mostrar sólo egresados NO logueados"
                                    name="seLogueo"
                                    checked={formState.seLogueo}
                                    onChange={() =>
                                        setFormState({
                                            ...formState,
                                            seLogueo: !formState.seLogueo,
                                        })
                                    }
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch2"
                                    label="Mostrar sólo egresados SIN e-mail"
                                    name="tieneEmail"
                                    checked={formState.tieneEmail}
                                    onChange={() =>
                                        setFormState({
                                            ...formState,
                                            tieneEmail: !formState.tieneEmail,
                                        })
                                    }
                                />
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
                Egresados encontrados: {egresados.length}
                <br />
                <Container fluid>
                    <table className="table table-hover responsive">
                        <thead>
                            <tr>
                                <td>Apellidos</td>
                                <td>Nombres</td>
                                <td>Sexo</td>
                                <td>Fecha de egreso</td>
                                <td>E-mail</td>
                                <td>Último acceso</td>
                                <td>Ciudad Actual</td>
                                <td>Ciudad Natal</td>
                                <td>Nacionalidad</td>
                                <td>DNI</td>
                                <td>Domicilio</td>
                                <td>Fecha de Nacimiento</td>
                            </tr>
                        </thead>
                        <tbody>
                            {egresados.map((eg) => (
                                <tr key={eg.id}>
                                    <td>{eg.apellidos}</td>
                                    <td>{eg.nombres}</td>
                                    <td>{eg.sexo}</td>
                                    <td>
                                        {
                                            eg.egresos[eg.egresos.length - 1]
                                                ?.ciclo_egreso
                                        }
                                    </td>
                                    <td>{eg.email}</td>
                                    <td>
                                        {eg.last_login?.split("-")[0]}-
                                        {eg.last_login?.split("-")[1]}
                                    </td>
                                    <td>{eg.ciudad_actual?.ciudad}</td>
                                    <td>{eg.ciudad_natal?.ciudad}</td>
                                    <td>{eg.nacionalidad}</td>
                                    <td>{eg.dni}</td>
                                    <td>{eg.domicilio}</td>
                                    <td>{eg.fecha_nac}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            </Container>
        </>
    );
};
