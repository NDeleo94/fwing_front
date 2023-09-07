import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "../components/GoogleButton";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useForm } from "../../egresados/hooks/useForm";
import { LinkedInButton } from "../components/LinkedInButton";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { setIsLogged, setUser, setToken } = useContext(LoginContext);
  const [waitAxios, setWaitAxios] = useState(false);

  const urlBase = import.meta.env.VITE_URL_LOCAL;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    onResetForm();
    setShowAlert(false);
    setValidated(false);
    setShow(true);
    setWaitAxios(false);
    setForgotPassword(false);
  };

  const onLogin = (e) => {
    handleSubmit(e);
    setWaitAxios(true);
    if (formState.username && formState.password) {
      Loguearse();
    }
  };

  function Loguearse() {
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
          response.json().then((data) => {
            setToken(data.token);
            setUser(data.user);
            setIsLogged(true);
            setWaitAxios(false);
            navigate("/home", {
              replace: true,
            });
          });
        } else {
          response.json().then((data) => {
            console.error("Error:", data.error);
            setWaitAxios(false);
            setShowAlert(true);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setWaitAxios(false);
      });
  }

  const enterPulsed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      Loguearse();
    }
  };

  const initialForm = {
    username: "",
    password: "",
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm);

  const [showAlert, setShowAlert] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Iniciar Sesión</h1>
        <hr />
        <Button variant="success" onClick={handleShow}>
          <i className="bi bi-key-fill"></i> Iniciar sesión con contraseña
        </Button>

        <hr />
        <GoogleButton />
        <hr />
        <LinkedInButton />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {forgotPassword ? (
            <>
              <Modal.Title>¿Olvidaste tu contraseña?</Modal.Title>
            </>
          ) : (
            <Modal.Title>Ingresar a Following</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {forgotPassword ? (
            <>
              Ingresa tu e-mail y te enviaremos un link de recuperación.
              <br />
              <br />
              <Form.Group className="mb-3" controlId="formFacultad">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="username"
                  value={formState.username}
                  name="username"
                  onChange={onInputChange}
                  required
                />
              </Form.Group>
              <br />
              <a
                onClick={() => setForgotPassword(false)}
                className="text-reset"
              >
                <span style={{ fontSize: "10pt" }}>
                  <p className="text-end">Volver</p>
                </span>
              </a>
            </>
          ) : (
            <>
              <Form noValidate validated={validated} onSubmit={onLogin}>
                <Form.Group className="mb-3" controlId="formFacultad">
                  <Form.Label>E-mail o DNI</Form.Label>
                  <Form.Control
                    type="username"
                    value={formState.username}
                    name="username"
                    onChange={onInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUniversidad">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={formState.password}
                    name="password"
                    onChange={onInputChange}
                    onKeyDown={enterPulsed}
                    required
                  />
                </Form.Group>
              </Form>
              {showAlert ? (
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  <b>¡Usuario o Contraseña incorrectas!</b>
                </Alert>
              ) : (
                ""
              )}
              <br />
              <a onClick={() => setForgotPassword(true)} className="text-reset">
                <span className="mb-3 mb-md-0" style={{ fontSize: "10pt" }}>
                  <p className="text-end">¿Olvidaste tu contraseña?</p>
                </span>
              </a>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {forgotPassword ? (
            <Button variant="success" onClick={onLogin} disabled={waitAxios}>
              Enviar enlace
            </Button>
          ) : (
            <Button variant="success" onClick={onLogin} disabled={waitAxios}>
              Ingresar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
