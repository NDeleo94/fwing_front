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
                <div className="card border-secondary pb-2 px-2">
                    <TablaEgrePorAnio datos={data} />
                </div>
                <Row className="mt-2">
                    <Col>
                        <div className="card border-secondary pb-2">
                            <TortaDistribucionEgrePorSexo datos={data} />
                        </div>
                    </Col>
                    <Col>
                        <TortaEgrConPostgrados datos={data} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TablaTiempoPromedioByNivel datos={data} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TablaDistribEgrByNivelActual datos={data} />
                    </Col>
                </Row>
                <div>Analitics</div>
                egresados de 2017: {c},
                <br />
                egresados de diciembre 1998: {m},
                <br />
                egresados varones : {sexo[0]},
                <br />
                egresados mujeres : {sexo[1]}
                <br />
                egresados entre mayo 2011 y agosto 2020 : {lapso}
                <br />
            </Container>
        </>
    );
};
