import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { ToastNotificacionPush } from "./ToastNotificacionPush";
import { LoginContext } from "../../context/LoginContext";
import { useConfig } from "../../auth/hooks/useConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SeguridadEgresados = ({ egresado }) => {
    const { user, setUser, setToken, tokenGoogle } = useContext(LoginContext);

    const navigate = useNavigate();

    const onLogout = () => {
        setUser(null);
        setToken(null);
        navigate("/login", {
            replace: true,
        });
    };

    const baseUrl = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();

    const initialState = {
        oldMail: "",
        newMail: "",
        newMailRepeat: "",
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
    };
    const { formState, onInputChange } = useForm(initialState);
    const [changeEmailBtnDisabled, setChangeEmailBtnDisabled] = useState(false);
    const [changePassBtnDisabled, setChangePassBtnDisabled] = useState(false);
    useEffect(() => {
        if (
            formState.oldMail == "" &&
            formState.newMail == "" &&
            formState.newMailRepeat == ""
        ) {
            setChangeEmailBtnDisabled(true);
        } else {
            setChangeEmailBtnDisabled(false);
        }

        if (
            formState.oldPassword == "" &&
            formState.newPassword == "" &&
            formState.newPasswordRepeat == ""
        ) {
            setChangePassBtnDisabled(true);
        } else {
            setChangePassBtnDisabled(false);
        }
    }, [formState]);

    const handleChangeMail = () => {
        console.log(formState);
        if (formState?.oldMail != egresado.email) {
            CallToast("El email actual ingresado es incorrecto", "warning");
            return;
        }
        if (
            formState?.oldMail == "" ||
            formState?.newMail == "" ||
            formState?.newMailRepeat == ""
        ) {
            CallToast("Debe llenar todos los campos", "warning");
            return;
        }
        if (validarEmail(formState?.newMail)) {
            CallToast("Debe ingresar un e-mail válido", "warning");
            return;
        }
        if (!(formState?.newMail === formState?.newMailRepeat)) {
            CallToast("Los emails nuevos deben ser idénticos", "warning");
            return;
        }

        let url = `${baseUrl}/change-email/`;
        axios
            .post(
                url,
                { old_email: formState.oldMail, new_email: formState.newMail },
                config
            )
            .then(({ data }) => {
                CallToast("¡E-mail cambiado! Cerrando sesión...", "success");
                setTimeout(() => {
                    onLogout();
                }, 2000);
            })
            .catch(({ response }) => {
                CallToast(`Problema: ${response.data.error}`, "danger");
            });
    };

    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return !regex.test(email);
    };

    const handleChangePassword = () => {
        console.log(formState);
        if (
            formState?.oldPassword == "" ||
            formState?.newPassword == "" ||
            formState?.newPasswordRepeat == ""
        ) {
            CallToast("Debe llenar todos los campos", "warning");
            return;
        }
        if (!(formState?.newPassword === formState?.newPasswordRepeat)) {
            CallToast("Las nuevas contraseñas deben ser idénticas", "warning");
            return;
        }
        if (formState.newPassword.length < 8) {
            CallToast(
                "La nueva contraseña debe tener al menos 8 caracteres alfanuméricos",
                "warning"
            );
            return;
        }
        if (formState?.oldPassword === formState?.newPassword) {
            CallToast(
                "La nueva contraseña no debe ser la misma que la contraseña actual",
                "warning"
            );
            return;
        }
        if (!validarPassword(formState?.newPassword)) {
            CallToast(
                "La nueva contraseña no cumple con los requisitos mencionados",
                "warning"
            );
            return;
        }

        let url = `${baseUrl}/change-password/`;
        axios
            .post(
                url,
                {
                    old_password: formState.oldPassword,
                    new_password: formState.newPassword,
                },
                config
            )
            .then(({ data }) => {
                CallToast(
                    "¡Contraseña cambiada! Cerrando sesión...",
                    "success"
                );
                setTimeout(() => {
                    onLogout();
                }, 2000);
            })
            .catch(({ response }) => {
                if (response.data.error == "Invalid old password") {
                    CallToast(`Contraseña actual incorrecta`, "danger");
                } else {
                    CallToast(`Problema: ${response.data.error}`, "danger");
                }
            });
    };

    const validarPassword = (p) => {
        const longitudMinima = 8;
        const contieneMayuscula = /[A-Z]/.test(p);
        const contieneMinuscula = /[a-z]/.test(p);
        const contieneNumero = /[0-9]/.test(p);
        const contieneCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(
            p
        );

        const esValida =
            p.length >= longitudMinima &&
            contieneMayuscula &&
            contieneMinuscula &&
            contieneNumero &&
            contieneCaracterEspecial;

        return esValida;
    };

    /* Toast */
    const [messageToast, setMessageToast] = useState("second");
    const [showToast, setShowToast] = useState(false);
    const [typeToast, setTypeToast] = useState("primary");
    const CallToast = (message, type) => {
        let refuerzo = (
            <>
                <b>{message}</b>
            </>
        );
        setChangeEmailBtnDisabled(true);
        setChangePassBtnDisabled(true);
        setMessageToast(refuerzo);
        setTypeToast(type);
        setShowToast(true);
        setTimeout(() => {
            !changeEmailBtnDisabled && setChangeEmailBtnDisabled(false);
            !changePassBtnDisabled && setChangePassBtnDisabled(false);
            setShowToast(false);
        }, 5100);
    };
    /* FIN Toast */

    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h3>
                    <i className="bi bi-shield-lock"></i> Seguridad
                </h3>
                <hr />
                <h5>Cambiar e-mail</h5>
                <div style={{ fontSize: "8pt" }} className="mb-3">
                    Para que se pueda acceder con Google, debe vincular una
                    cuenta con acceso Gmail (ej. egresado@gmail.com)
                </div>
                <Form onSubmit={handleChangeMail}>
                    <Form.Group className="mb-3" controlId="formEmailSecurity">
                        <Form.Label>Correo Electrónico Actual</Form.Label>
                        <Form.Control
                            type="email"
                            value={formState?.oldMail}
                            onChange={onInputChange}
                            name="oldMail"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail2">
                        <Form.Label>Correo Electrónico Nuevo</Form.Label>
                        <Form.Control
                            type="email"
                            value={formState?.newMail}
                            onChange={onInputChange}
                            name="newMail"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail3">
                        <Form.Label>Repita Correo Electrónico Nuevo</Form.Label>
                        <Form.Control
                            type="email"
                            value={formState?.newMailRepeat}
                            onChange={onInputChange}
                            name="newMailRepeat"
                            required
                        />
                    </Form.Group>
                    <div className="col-12 my-4 d-grid">
                        <Button
                            onClick={handleChangeMail}
                            disabled={changeEmailBtnDisabled}
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </Form>
                <hr />
                {!tokenGoogle ? (
                    <>
                        <h5>Cambiar contraseña</h5>
                        <div style={{ fontSize: "8pt" }} className="mb-3">
                            La nueva contraseña debe tener al menos 8 caracteres
                            alfanuméricos, 1 mayúscula, 1 minúscula y 1 caracter
                            especial
                        </div>
                        <Form onSubmit={handleChangePassword}>
                            <Form.Group
                                className="mb-3"
                                controlId="formPassword"
                            >
                                <Form.Label>Contraseña Actual</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={formState?.oldPassword}
                                    onChange={onInputChange}
                                    name="oldPassword"
                                    required
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formPassword2"
                            >
                                <Form.Label>Contraseña Nueva</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={formState?.newPassword}
                                    onChange={onInputChange}
                                    name="newPassword"
                                    required
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formPassword3"
                            >
                                <Form.Label>Repita Contraseña Nueva</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={formState?.newPasswordRepeat}
                                    onChange={onInputChange}
                                    name="newPasswordRepeat"
                                    required
                                />
                            </Form.Group>
                            <div className="col-12 my-4 d-grid">
                                <Button
                                    onClick={handleChangePassword}
                                    disabled={changePassBtnDisabled}
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Form>
                    </>
                ) : (
                    <div style={{ fontSize: "8pt" }} className="mb-3">
                        La interfaz de cambio de contraseña está inhabilitada
                        porque accedió a Following con Google/LinkedIn
                    </div>
                )}
            </div>

            <ToastNotificacionPush
                mensaje={messageToast}
                mostrar={showToast}
                tipo={typeToast}
            />
        </>
    );
};
