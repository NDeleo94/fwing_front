import React from "react";
import { Badge, Button, Col, Row, Table } from "react-bootstrap";

export const TablaEgresos = ({ egresos, handleEdit, handleDelete }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th scope="col">Matrícula</th>
          <th scope="col">Año de Egreso</th>
          <th scope="col">Carrera</th>
          <th scope="col">Facultad</th>
          <th scope="col">Universidad</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {egresos.map((egre) => (
          <tr key={egre.id}>
            <th scope="row">
              {egre.matricula ? egre.matricula : "--"}
              {egre.postgrado && (
                <>
                  <Badge pill bg="warning" text="dark">
                    POSTGRADO
                  </Badge>
                </>
              )}
            </th>
            <td>{egre.ciclo_egreso.split("-")[0]}</td>
            <td>{egre.carrera.carrera}</td>
            <td>{egre.carrera.facultad.facultad}</td>
            <td>
              {egre.carrera.facultad.universidad.acronimo
                ? egre.carrera.facultad.universidad.acronimo
                : egre.carrera.facultad.universidad.universidad}{" "}
            </td>
            <td>
              {!egre.carrera.following ? (
                <>
                  <Row>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="m-1"
                        onClick={(event) => {
                          handleEdit(event, egre);
                        }}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-danger"
                        className="m-1"
                        onClick={(event) => {
                          handleDelete(event, egre);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <b className="mx-auto">*</b>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
