import { Button, Col, Row, Table } from "react-bootstrap";

export const TablaPuestos = ({
  puestos,
  handleChangeOrganizacion,
  handleDelete,
}) => {
  const filteredOrganizations = puestos;
  return (
    <Table responsive>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre del Puesto</th>
          <th scope="col">Descripción</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrganizations?.map((o, index) => (
          <tr key={o.id}>
            <th scope="row">{index + 1}</th>
            <td>{o.puesto}</td>
            <td>{o?.descripcion}</td>
            <td>
              <Row>
                <Col>
                  <Button
                    variant="outline-secondary"
                    className="my-1"
                    onClick={(e) => {
                      handleChangeOrganizacion(e, o);
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="outline-danger"
                    className="my-1"
                    onClick={(e) => handleDelete(e, o)}
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
