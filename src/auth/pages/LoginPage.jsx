import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "../components/GoogleButton";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useForm } from "../../egresados/hooks/useForm";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { setIsLogged, setUser, setToken } = useContext(LoginContext);

    const urlBase = import.meta.env.VITE_URL_LOCAL;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        onResetForm();
        setShowAlert(false);
        setValidated(false);
        setShow(true);
    };

    const onLogin = (e) => {
        handleSubmit(e);
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
                        navigate("/home", {
                            replace: true,
                        });
                    });
                } else {
                    response.json().then((data) => {
                        console.error("Error:", data.error);
                        setShowAlert(true);
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
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
                    Ingresar con contraseña
                </Button>

                <hr />
                <GoogleButton />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ingresar a Following</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
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
                        <Form.Group
                            className="mb-3"
                            controlId="formUniversidad"
                        >
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
