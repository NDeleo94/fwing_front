import { Button, Col, Row, Table } from "react-bootstrap";
import { modalidad, seniority } from "../constants/options";

export const TablaHistorial = ({
  historial,
  handleChangeActividad,
  handleDelete,
}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Puesto</th>
          <th scope="col">Organización</th>
          <th scope="col">Ciudad</th>
          <th scope="col">Seniority</th>
          <th scope="col">Modalidad</th>
          <th scope="col">Inicio</th>
          <th scope="col">Fin</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {historial.map((egre, index) => (
          <tr key={egre.id}>
            <th scope="row">{index + 1}</th>
            <td>{egre.puesto.puesto}</td>
            <td>{egre.organizacion.organizacion}</td>
            <td>{egre.ciudad?.ciudad}</td>
            <td>
              {seniority.map((s) => {
                if (s.value == egre.seniority) {
                  return `${s.label}`;
                }
              })}
            </td>
            <td>
              {modalidad.map((s) => {
                if (s.value == egre.modalidad) {
                  return `${s.label}`;
                }
              })}
            </td>
            <td>{egre.inicio}</td>
            <td>{egre.fin ? egre.fin : "Actual"}</td>
            <td>
              <Row>
                <Col>
                  <Button
                    variant="outline-secondary"
                    className="my-1"
                    onClick={(e) => {
                      handleChangeActividad(e, egre);
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="outline-danger"
                    className="my-1"
                    onClick={(e) => handleDelete(e, egre)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </Col>
              </Row>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
