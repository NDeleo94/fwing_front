import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useConfig } from "../../auth/hooks/useConfig";
import { ToastNotificacionPush } from "./ToastNotificacionPush";

export const ConfiguracionPrivacidad = ({ egresado }) => {

    console.log("desde CONFIGURACION_PRIVACIDAD");

    const { privacidad } = egresado;
    const initialForm = {
        /* apellidos: privacidad?.apellidos, */
        /* certificado: privacidad?.certificado, */
        ciudad_actual: privacidad?.ciudad_actual,
        ciudad_natal: privacidad?.ciudad_natal,
        /* dni: privacidad?.dni, */
        /* domicilio: privacidad?.domicilio, */
        email: privacidad?.email,
        fecha_nac: privacidad?.fecha_nac,
        /* usuario: egresado.id, */
        /* nacionalidad: privacidad?.nacionalidad, */
        /* nombres: privacidad?.nombres, */
        sexo: privacidad?.sexo,
    };
    const atributos = [
        "fecha_nac",
        "ciudad_actual",
        "ciudad_natal",
        "email",
        "sexo",
    ];

    const [formState, setFormState] = useState(initialForm);

    /* Botón guardar */
    const urlBase = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();
    const [disabledButton, setDisabledButton] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledButton(true);
        let formToSend = {
            ...formState,
            apellidos: true,
            certificado: true,
            dni: true,
            domicilio: true,
            usuario: egresado.id,
            nacionalidad: formState.ciudad_natal,
            nombres: true,
        };
        let url = `${urlBase}/crear/privacidades/`;
        axios
            .post(url, formToSend, config)
            .then(({ data }) => {
                console.log(data);
                setDisabledButton(false);
                CallToast(mensaje1, "primary");
            })
            .catch(({ response }) => {
                console.log(response.data);
                setDisabledButton(false);
                CallToast(mensaje2, "danger");
            });
    };
    /* Fin Botón guardar */

    /* Notif push */
    // Creo variables para usar el toast
    const [mensaje, setMensaje] = useState();
    const [tipo, setTipo] = useState();
    const [show, setShow] = useState(false);
    // Mensajes para mostrar
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
    // Call Toast
    function CallToast(mensaje, tipo) {
        setMensaje(mensaje);
        setTipo(tipo);
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 5100);
    }
    /* Fin Notif push */

    /* Cargar mostrandoTodo y ocultandoTodo */
    const [mostrandoTodo, setMostrandoTodo] = useState(true);
    const [ocultandoTodo, setOcultandoTodo] = useState(true);

    const formStateString = JSON.stringify(formState)
    useEffect(() => {
        let cantidad = 0;
        atributos.forEach((elemento) => {
            if (formState[elemento] == true) {
                cantidad++;
            }
        });
        if (cantidad == 0) {
            setOcultandoTodo(true);
            setMostrandoTodo(false);
        }
        if (cantidad == atributos.length) {
            setMostrandoTodo(true);
            setOcultandoTodo(false);
        }
        if (0 < cantidad && cantidad < atributos.length) {
            setOcultandoTodo(false);
            setMostrandoTodo(false);
        }
    }, [formStateString]);
    /* FIN cargar mostrandoTodo y ocultandoTodo */

    function mostrarTodo() {
        atributos.forEach((elemento) => {
            setFormState(prev=>({...prev,[elemento]:true}))
        });
    }
    function ocultarTodo() {
        atributos.forEach((elemento) => {
            setFormState(prev=>({...prev,[elemento]:false}))
        });
    }

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
                        id="custom-switch11"
                        label="Mostrar todo"
                        checked={mostrandoTodo}
                        onChange={() => mostrarTodo()}
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch12"
                        label="Ocultar todo"
                        checked={ocultandoTodo}
                        onChange={() => ocultarTodo()}
                    />
                    <hr />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Mostrar mi fecha de nacimiento y edad"
                        checked={formState.fecha_nac}
                        onChange={() =>
                            setFormState({
                                ...formState,
                                fecha_nac: !formState.fecha_nac,
                            })
                        }
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch2"
                        label="Mostrar mi ciudad actual"
                        name="ciudad_actual"
                        checked={formState.ciudad_actual}
                        onChange={() =>
                            setFormState({
                                ...formState,
                                ciudad_actual: !formState.ciudad_actual,
                            })
                        }
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch3"
                        label="Mostrar mi correo electrónico"
                        name="email"
                        checked={formState.email}
                        onChange={() =>
                            setFormState({
                                ...formState,
                                email: !formState.email,
                            })
                        }
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch4"
                        label="Mostrar mi sexo"
                        name="sexo"
                        checked={formState.sexo}
                        onChange={() =>
                            setFormState({
                                ...formState,
                                sexo: !formState.sexo,
                            })
                        }
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch5"
                        label="Mostrar mi ciudad natal y nacionalidad"
                        name="ciudad_natal"
                        checked={formState.ciudad_natal}
                        onChange={() =>
                            setFormState({
                                ...formState,
                                ciudad_natal: !formState.ciudad_natal,
                            })
                        }
                    />
                    <div className="col-12 my-4 d-grid">
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={disabledButton}
                        >
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
