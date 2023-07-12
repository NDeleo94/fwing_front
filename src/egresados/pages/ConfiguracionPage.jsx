import { ConfiguracionEgresos } from "../components/ConfiguracionEgresos";
import { ConfiguracionDatosPersonales } from "../components/ConfiguracionDatosPersonales";
import { ConfiguracionHistorialLaboral } from "../components/ConfiguracionHistorialLaboral";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";
import { ConfiguracionPrivacidad } from "../components/ConfiguracionPrivacidad";
import { IngresarEgresadoForm } from "../../admin/components/IngresarEgresadoForm";
import { Loading } from "../../ui/components/Loading";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useFetchEgresadosById } from "../hooks/useFetchEgresadosById";
import { FiltrarEgresados } from "../../admin/components/FiltrarEgresados";
import { Administradores } from "../../admin/components/Administradores";
import { EnviarEmails } from "../../admin/components/EnviarEmails";
import { ModificarEgresado } from "../../admin/components/ModificarEgresado";

export const ConfiguracionPage = () => {
    const { user } = useContext(LoginContext);
    const { data, loading } = useFetchEgresadosById(user.id);

    return loading ? (
        <Loading />
    ) : (
        <>
            <Row className="my-3">
                <h1><i className="bi bi-house-gear"></i> Configuración</h1>
            </Row>
            <hr />
            <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#datosPersonales"
            >
                <Container fluid>
                    <Row>
                        <Col sm={3} className="bg-light py-2">
                            <ListGroup>
                                <ListGroup.Item action href="#datosPersonales">
                                    Datos Personales
                                </ListGroup.Item>
                                <ListGroup.Item action href="#titulos">
                                    Títulos
                                </ListGroup.Item>
                                <ListGroup.Item action href="#historialLaboral">
                                    Historial Laboral
                                </ListGroup.Item>
                                <ListGroup.Item action href="#privacidad">
                                    Privacidad
                                </ListGroup.Item>
                            </ListGroup>
                            <hr />
                            {user.is_admin ? (
                                <>
                                    Administración
                                    <ListGroup>
                                        <ListGroup.Item
                                            action
                                            href="#agregarEgresado"
                                        >
                                            Agregar Egresado
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            action
                                            href="#modificarEgresado"
                                        >
                                            Modificar Egresado
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            action
                                            href="#filtrarEgresados"
                                        >
                                            Filtrar Egresados
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            action
                                            href="#administrarEgresados"
                                        >
                                            Egresados
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            action
                                            href="#administrarEmpresas"
                                        >
                                            Empresas
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            action
                                            href="#administradores"
                                        >
                                            Administradores
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            action
                                            href="#enviarEmails"
                                        >
                                            Enviar e-mails
                                        </ListGroup.Item>
                                    </ListGroup>
                                </>
                            ) : (
                                ""
                            )}
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#datosPersonales" mountOnEnter unmountOnExit>
                                    <ConfiguracionDatosPersonales
                                        egresado={data}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#titulos" mountOnEnter unmountOnExit>
                                    <ConfiguracionEgresos egresado={data} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#historialLaboral" mountOnEnter unmountOnExit>
                                    <ConfiguracionHistorialLaboral
                                        egresado={data}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#privacidad" mountOnEnter unmountOnExit>
                                    <ConfiguracionPrivacidad egresado={data} />
                                </Tab.Pane>
                                {user.is_admin ? (
                                    <>
                                        <Tab.Pane eventKey="#agregarEgresado" mountOnEnter unmountOnExit>
                                            <IngresarEgresadoForm />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#modificarEgresado" mountOnEnter unmountOnExit>
                                        <ModificarEgresado />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#filtrarEgresados" mountOnEnter unmountOnExit>
                                            <FiltrarEgresados />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#administrarEgresados" mountOnEnter unmountOnExit>
                                            administrar Egresados
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#administrarEmpresas" mountOnEnter unmountOnExit>
                                            Administrar Empresas
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#administradores" mountOnEnter unmountOnExit>
                                            <Administradores />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#enviarEmails" mountOnEnter unmountOnExit>
                                            <EnviarEmails />
                                        </Tab.Pane>
                                    </>
                                ) : (
                                    ""
                                )}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Container>
            </Tab.Container>
        </>
    );
};
