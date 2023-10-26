import React, { useEffect, useState } from "react";
import { getCantidadEgrePorAnio } from "../helpers/getCantidadEgrPorAnio";
import { getCantidadEgrPorMes } from "../helpers/getCantidadEgrPorMes";
import { getCantidadEgrPorSexo } from "../helpers/getCantidadEgrPorSexo";
import { getCantidadEgrPorLapso } from "../helpers/getCantidadEgrPorLapso";
import { getCantidadEgrPorCiudadNatal } from "../helpers/getCantidadEgrPorCiudadNatal";
import { Col, Container, Row } from "react-bootstrap";
import { TablaEgrePorAnio } from "../../sections/components/TablaEgrePorAnio";
import { TortaDistribucionEgrePorSexo } from "../../sections/components/TortaDistribucionEgrePorSexo";
import { TortaEgrConPostgrados } from "../../sections/components/TortaEgrConPostgrados";
import { TablaTiempoPromedioByNivel } from "../../sections/components/TablaTiempoPromedioByNivel";
import { TablaDistribEgrByNivelActual } from "../../sections/components/TablaDistribEgrByNivelActual";

export const Analitics = ({ data }) => {
    const [c, setC] = useState(0);
    const [m, setM] = useState(0);
    const [sexo, setSexo] = useState([0, 0]);
    const [lapso, setLapso] = useState(0);
    const [ciudad, setCiudad] = useState([]);
    useEffect(() => {
        setC(getCantidadEgrePorAnio(data, 2017));
        setM(getCantidadEgrPorMes(data, 12, 1998));
        setSexo(getCantidadEgrPorSexo(data));
        setLapso(getCantidadEgrPorLapso(data, 2011, 5, 2020, 8));
        setCiudad(getCantidadEgrPorCiudadNatal(data));
    }, []);

    return (
        <>
            <Container fluid className="my-2">
                <div className="card text-center">
                    <div className="card-header">
                        Egresados de Ingeniería en Computación por Año
                    </div>
                    <div className="card-body pb-2 px-2">
                        <TablaEgrePorAnio datos={data} />
                    </div>
                </div>
                <Row className="mt-2">
                    <Col>
                        <div className="card text-center pb-2">
                            <div className="card-header">
                                Egresados de Ingeniería en Computación por Sexo
                            </div>
                            <TortaDistribucionEgrePorSexo datos={data} />
                        </div>
                    </Col>
                    <Col>
                        <div className="card text-center pb-2">
                            <div className="card-header">
                                Egresados de Ingeniería en Computación con
                                Postgrados
                            </div>
                            <TortaEgrConPostgrados datos={data} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="card text-center my-2">
                            <div className="card-header">
                                Duración de trabajo promedio (en días) respecto
                                al Nivel de trabajo
                            </div>
                            <div className="card-body pb-2 px-2">
                                <TablaTiempoPromedioByNivel datos={data} />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="card text-center my-2">
                            <div className="card-header">
                                Distribución histórica porcentual de Ingenieros
                                según nivel laboral
                            </div>
                            <div className="pb-2">
                                <TablaDistribEgrByNivelActual datos={data} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
