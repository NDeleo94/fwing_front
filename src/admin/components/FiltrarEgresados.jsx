import React from "react";
import { FiltroDeEgresado } from "./FiltroDeEgresado";
import { TablaEgresados } from "./TablaEgresados";
import { Container } from "react-bootstrap";

export const FiltrarEgresados = () => {
    return (
        <>
            <Container fluid>
                <FiltroDeEgresado />
                <TablaEgresados />
            </Container>
        </>
    );
};
