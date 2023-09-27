import React, { useEffect, useState } from "react";
import { getCantidadEgrePorAnio } from "../helpers/getCantidadEgrPorAnio";
import { getCantidadEgrPorMes } from "../helpers/getCantidadEgrPorMes";
import { getCantidadEgrPorSexo } from "../helpers/getCantidadEgrPorSexo";
import { getCantidadEgrPorLapso } from "../helpers/getCantidadEgrPorLapso";
import { getCantidadEgrPorCiudadNatal } from "../helpers/getCantidadEgrPorCiudadNatal";
import { Container } from "react-bootstrap";
import { TablaEgrePorAnio } from "../../sections/components/TablaEgrePorAnio";
import { TortaDistribucionEgrePorSexo } from "../../sections/components/TortaDistribucionEgrePorSexo";
import { TortaEgrConPostgrados } from "../../sections/components/TortaEgrConPostgrados";

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
                <TablaEgrePorAnio datos={data} />
                <TortaDistribucionEgrePorSexo datos={data} />
                <TortaEgrConPostgrados datos={data} />
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
