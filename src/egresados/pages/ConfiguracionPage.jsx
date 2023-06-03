import { ConfiguracionEgresos } from "../components/ConfiguracionEgresos";
import { ConfiguracionDatosPersonales } from "../components/ConfiguracionDatosPersonales";
import { ConfiguracionHistorialLaboral } from "../components/ConfiguracionHistorialLaboral";
import { Link, Route, Routes } from "react-router-dom";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";

export const ConfiguracionPage = () => {
  return (
    <>
      <div className="my-3">
        <h1>Configuración</h1>
      </div>
      <hr />
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Container fluid>
          <Row>
            <Col sm={3} className="bg-light pt-2">
              <ListGroup>
                <ListGroup.Item action href="#link1">
                  Datos Personales
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Títulos
                </ListGroup.Item>
                <ListGroup.Item action href="#link3">
                  Historial Laboral
                </ListGroup.Item>
                <ListGroup.Item action href="#link4">
                  Privacidad
                </ListGroup.Item>
                <ListGroup.Item action href="#link5">
                  Administración
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <ConfiguracionDatosPersonales />
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <ConfiguracionEgresos />
                </Tab.Pane>
                <Tab.Pane eventKey="#link3">
                  <ConfiguracionHistorialLaboral />
                </Tab.Pane>
                <Tab.Pane eventKey="#link4">
                  ConfiguracionPrivacidad
                </Tab.Pane>
                <Tab.Pane eventKey="#link5">
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
