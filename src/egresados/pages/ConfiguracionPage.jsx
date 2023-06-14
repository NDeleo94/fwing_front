import { ConfiguracionEgresos } from "../components/ConfiguracionEgresos";
import { ConfiguracionDatosPersonales } from "../components/ConfiguracionDatosPersonales";
import { ConfiguracionHistorialLaboral } from "../components/ConfiguracionHistorialLaboral";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";
import { ConfiguracionPrivacidad } from "../components/ConfiguracionPrivacidad";
import { IngresarUsuarioForm } from "./IngresarUsuarioForm";

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
              </ListGroup>
              <hr />
              Administración
              <ListGroup>
                <ListGroup.Item action href="#agregarEgresado">
                  Agregar Egresado
                </ListGroup.Item>
                <ListGroup.Item action href="#administrarEgresados">
                  Administrar Egresados
                </ListGroup.Item>
                <ListGroup.Item action href="#administrarEmpresas">
                  Administrar Empresas
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
                  <ConfiguracionHistorialLaboral egresado={egresado} />
                </Tab.Pane>
                <Tab.Pane eventKey="#privacidad">
                  <ConfiguracionPrivacidad />
                </Tab.Pane>
                <Tab.Pane eventKey="#agregarEgresado">
                  <IngresarUsuarioForm />
                </Tab.Pane>
                <Tab.Pane eventKey="#administrarEgresados">
                  administrar Egresados
                </Tab.Pane>
                <Tab.Pane eventKey="#administrarEmpresas">
                  Administrar Empresas
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </>
  );
};
