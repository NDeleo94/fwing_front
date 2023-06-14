import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "../components/GoogleButton";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useForm } from "../../egresados/hooks/useForm";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { isLogged, setIsLogged } = useContext(LoginContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onLogin = () => {
    setIsLogged(true);
    handleClose;
    navigate("/home", {
      replace: true,
    });
  };

  const initialForm = {
    email: "",
    password: "",
  };

  const { formState, onInputChange } = useForm(initialForm);

  return (
    <>
      <div className="container mt-5">
        <h1>Iniciar Sesión</h1>
        <hr />
        <Button variant="success" onClick={handleShow}>
          Ingresar con e-mail
        </Button>

        <hr />
        <GoogleButton />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingresar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFacultad">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={formState.email}
                name="email"
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUniversidad">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={formState.password}
                name="password"
                onChange={onInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={onLogin}>
            Ingresar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
