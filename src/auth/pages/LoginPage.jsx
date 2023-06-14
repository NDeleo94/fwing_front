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
  const { setIsLogged } = useContext(LoginContext);

  const urlBase = import.meta.env.VITE_URL_LOCAL;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onLogin = (e) => {
    e.preventDefault();
    console.log(formState);
    const url = `${urlBase}/login/`;
    const postData = formState;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          response.json().then(() => {
            setIsLogged(true);
            navigate("/home", {
              replace: true,
            });
          });
        } else {
          response.json().then((data) => {
            console.error("Error:", data.error);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const initialForm = {
    username: "",
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
                type="username"
                value={formState.username}
                name="username"
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
