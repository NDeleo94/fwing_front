import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useConfig } from "../../auth/hooks/useConfig";
import { ToastNotificacionPush } from "./ToastNotificacionPush";

export const ConfiguracionPrivacidad = ({ egresado }) => {
    const { privacidad } = egresado;
    const initialForm = {
        apellidos: privacidad?.apellidos,
        certificado: privacidad?.certificado,
        ciudad_actual: privacidad?.ciudad_actual,
        ciudad_natal: privacidad?.ciudad_natal,
        dni: privacidad?.dni,
        domicilio: privacidad?.domicilio,
        email: privacidad?.email,
        fecha_nac: privacidad?.fecha_nac,
        usuario: egresado.id,
        nacionalidad: privacidad?.nacionalidad,
        nombres: privacidad?.nombres,
        sexo: privacidad?.sexo,
    };
    console.log(initialForm);
    const [formState, setFormState] = useState(initialForm);

    function handleChange(atributo) {
        atributo.forEach((elemento) => {
            if (formState[elemento] == true) {
                formState[elemento] = false;
            } else {
                formState[elemento] = true;
            }
        });
    }
    const urlBase = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
        let url = `${urlBase}/crear/privacidades/`;
        axios
            .post(url, formState, config)
            .then(({ data }) => {
                console.log(data);
                CallToast(mensaje1, "primary");
            })
            .catch(({ response }) => {
                console.log(response.data);
                CallToast(mensaje2, "danger");
            });
    };

    /* Notif push */
    const [mensaje, setMensaje] = useState();
    const [tipo, setTipo] = useState();
    const [show, setShow] = useState(false);

    let mensaje1 = (
        <>
            <b>¡Su cambio de privacidad fue agregado con éxito!</b>
        </>
    );
    let mensaje2 = (
        <>
            <b>Problemas con el servidor, intente nuevamente.</b>
        </>
    );

    function CallToast(mensaje, tipo) {
        setMensaje(mensaje);
        setTipo(tipo);
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 5100);
    }
    /* Fin Notif push */

    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h3>
                    <i className="bi bi-file-earmark-lock2"></i> Privacidad
                </h3>
                <hr />
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Ocultar mi fecha de nacimiento y edad"
                        defaultChecked={formState.fecha_nac}
                        onChange={() => handleChange(["fecha_nac"])}
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch2"
                        label="Ocultar mi ciudad actual"
                        name="ciudad_actual"
                        defaultChecked={formState.ciudad_actual}
                        onChange={() => handleChange(["ciudad_actual"])}
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch3"
                        label="Ocultar mi correo electrónico"
                        name="email"
                        defaultChecked={formState.email}
                        onChange={() => handleChange(["email"])}
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch4"
                        label="Ocultar mi sexo"
                        name="sexo"
                        defaultChecked={formState.sexo}
                        onChange={() => handleChange(["sexo"])}
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch5"
                        label="Ocultar mi ciudad natal y nacionalidad"
                        name="ciudad_natal"
                        defaultChecked={formState.ciudad_natal}
                        onChange={() => {
                            handleChange(["nacionalidad", "ciudad_natal"]);
                        }}
                    />
                    <div className="col-12 my-4 d-grid">
                        <Button type="submit" onClick={handleSubmit}>
                            Guardar cambios
                        </Button>
                    </div>
                </Form>
            </div>
            <ToastNotificacionPush
                mensaje={mensaje}
                mostrar={show}
                tipo={tipo}
            />
        </>
    );
};
