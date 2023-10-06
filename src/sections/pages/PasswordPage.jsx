import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../egresados/hooks/useForm";
import { Button, Form } from "react-bootstrap";
import { ToastNotificacionPush } from "../../egresados/components/ToastNotificacionPush";
import axios from "axios";

export const PasswordPage = () => {
    const { token } = useParams();
    console.log(token);
    const baseUrl = import.meta.env.VITE_URL_LOCAL;

    const initialForm = {
        newPassword: "",
        repeatPassword: "",
    };
    const { formState, onInputChange } = useForm(initialForm);

    const navigate = useNavigate();

    const toLoginPage = () => {
        navigate("/login", {
            replace: true,
        });
    };
    const [waitAxios, setWaitAxios] = useState(false);

    /* Botón de "actualizar contraseña" */
    const onSubmit = () => {
        console.log(formState);
        if (formState?.repeatPassword == "" || formState?.newPassword == "") {
            CallToast("Debe llenar todos los campos", "warning");
            return;
        }
        if (!(formState?.newPassword === formState?.repeatPassword)) {
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

        if (!validarPassword(formState?.newPassword)) {
            CallToast(
                "La nueva contraseña no cumple con los requisitos mencionados",
                "warning"
            );
            return;
        }

        let url = `${baseUrl}/new-password/`;
        axios
            .post(
                url,
                {
                    new_password: formState.newPassword,
                },
                {
                    headers: { Authorization: `Token ${token}` },
                }
            )
            .then(({ data }) => {
                CallToast(
                    "¡Contraseña cambiada! Cambiando a vista de Logueo",
                    "success"
                );
                setTimeout(() => {
                    toLoginPage();
                }, 2000);
            })
            .catch(({ response }) => {
                if (response.data.error == "Invalid url") {
                    CallToast(`token de url inexistente o vencido`, "danger");
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
    /* FIN Botón de "actualizar contraseña" */

    /* TOAST */
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
        setMessageToast(refuerzo);
        setTypeToast(type);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5100);
    };
    /* FIN Toast */
    /* FIN TOAST */

    return (
        <>
            <div className="mt-3">
                <b>
                    La nueva contraseña debe tener al menos 8 caracteres
                    alfanuméricos, 1 mayúscula, 1 minúscula y 1 caracter
                    especial
                </b>
            </div>
            <Form /* onSubmit={onSubmit} */ className="my-4">
                <Form.Group className="mb-3" controlId="formFacultad">
                    <Form.Label>Ingrese su nueva contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={formState.newPassword}
                        name="newPassword"
                        onChange={onInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUniversidad">
                    <Form.Label>Repita su nueva contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={formState.repeatPassword}
                        name="repeatPassword"
                        onChange={onInputChange}
                        required
                    />
                </Form.Group>
                <Button
                    variant="success"
                    onClick={onSubmit}
                    disabled={waitAxios}
                >
                    Actualizar contraseña
                </Button>
            </Form>

            <ToastNotificacionPush
                mensaje={messageToast}
                mostrar={showToast}
                tipo={typeToast}
            />
        </>
    );
};
