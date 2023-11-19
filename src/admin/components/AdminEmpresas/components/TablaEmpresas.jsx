import { Button, Col, Row, Table } from "react-bootstrap";

export const TablaEmpresas = ({
  empresas,
  handleChangeOrganizacion,
  handleDelete,
}) => {
  const filteredOrganizations = empresas;
  function tipoOrganizacion(t) {
    if (t == "e") return `Pública`;
    if (t == "p") return `Privada`;
    if (t == "i") {
      return `Independiente`;
    } else {
      return `Sin Información`;
    }
  }

  function cantidadEmpleados(c) {
    if (c == 1) return `[1, 10]`;
    if (c == 2) return `[11, 100]`;
    if (c == 3) {
      return `[101, 1000+)`;
    } else {
      return `Sin Información`;
    }
  }
  return (
    <Table responsive>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Organización</th>
          <th scope="col">Descripción</th>
          <th scope="col">Tipo</th>
          <th scope="col">email</th>
          <th scope="col">Web</th>
          <th scope="col">Cantidad de Empleados</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrganizations?.map((o, index) => (
          <tr key={o.id}>
            <th scope="row">{index + 1}</th>
            <td>{o.organizacion}</td>
            <td>{o?.descripcion}</td>
            <td>{tipoOrganizacion(o?.tipo)}</td>
            <td>{o?.email}</td>
            <td>{o?.web}</td>
            <td>{cantidadEmpleados(o?.empleados)}</td>
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
