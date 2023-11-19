import { Button, Col, Form, Image, Row } from "react-bootstrap";

export const FormFoto = ({
  egresado,
  tokenGoogle,
  urlPerfilPhoto,
  handleDeletePhoto,
  handleUploadPhoto,
  handleUploadPhotoGoogle,
}) => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <div className="row">
            <Col className="text-center" xs={12} md={3}>
              <div className="card-header">
                <Image
                  src={urlPerfilPhoto()}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  thumbnail
                />
              </div>
            </Col>

            <Col xs={12} md={9}>
              <Row>
                <Form.Label>¿Desea cambiar su foto de perfil?</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  id="imagenPerfil"
                  name="imagenPerfil"
                />
              </Row>
              <Row className="my-2 justify-content-end">
                <Col className="justify-content-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDeletePhoto}
                    disabled={egresado.imagen.length == 0}
                  >
                    Eliminar Foto
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={handleUploadPhotoGoogle}
                    disabled={!tokenGoogle}
                  >
                    Usar Foto Google
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="sm"
                    onClick={(event) => {
                      handleUploadPhoto(event);
                    }}
                  >
                    ¡Subir foto!
                  </Button>
                </Col>
              </Row>
            </Col>
          </div>
        </Form.Group>
      </Form>

      {!tokenGoogle ? (
        <div style={{ fontSize: "8pt" }}>
          ** Para usar la foto de Google, necesita iniciar sesión con su cuenta
          vinculada a Gmail.
        </div>
      ) : null}
    </>
  );
};
