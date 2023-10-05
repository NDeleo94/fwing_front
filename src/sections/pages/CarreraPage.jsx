import Tab from "react-bootstrap/Tab";
import { useFetchEgresados } from "../../egresados/hooks/useFetchEgresados";
import { SearchPage } from "../../egresados/pages";
import { Loading } from "../../ui/components/Loading";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Analitics } from "../../egresados/components/Analitics";

export const CarreraPage = () => {
    const { data, loading } = useFetchEgresados();
    return loading ? (
        <Loading />
    ) : (
        <>
            <Row className="my-3">
                <h1>Carrera</h1>
            </Row>
            <hr />
            <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#search"
            >
                <Container fluid>
                    <Row>
                        <Col sm={3} className="bg-light py-2">
                            <ListGroup>
                                <ListGroup.Item action href="#search">
                                    Buscar Egresados
                                </ListGroup.Item>
                                <ListGroup.Item action href="#graphs">
                                    Gráficos
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={9}>
                            <Row className="ms-2">
                                <Tab.Content>
                                    <Tab.Pane
                                        eventKey="#search"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <SearchPage data={data} />
                                    </Tab.Pane>
                                    <Tab.Pane
                                        eventKey="#graphs"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <Analitics data={data} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Tab.Container>
        </>
    );
};
