import { ConfiguracionEgresos } from "../components/ConfiguracionEgresos";
import { ConfiguracionDatosPersonales } from "../components/ConfiguracionDatosPersonales";
import { ConfiguracionHistorialLaboral } from "../components/ConfiguracionHistorialLaboral";
import { Link, Route, Routes } from "react-router-dom";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";

export const ConfiguracionPage = ({ egresado }) => {
  return (
    <>
      <Row className="my-3">
        <h1>Configuración</h1>
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
                <ListGroup.Item action href="#administracion">
                  Administración
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="#datosPersonales">
                  <ConfiguracionDatosPersonales egresado={egresado} />
                </Tab.Pane>
                <Tab.Pane eventKey="#titulos">
                  <ConfiguracionEgresos egresado={egresado} />
                </Tab.Pane>
                <Tab.Pane eventKey="#historialLaboral">
                  <ConfiguracionHistorialLaboral />
                </Tab.Pane>
                <Tab.Pane eventKey="#privacidad">
                  ConfiguracionPrivacidad
                </Tab.Pane>
                <Tab.Pane eventKey="#administracion">
                  ConfiguracionAdministración
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </>
  );
};
