import React, { useState } from "react";
import { useForm } from "../../egresados/hooks/useForm";
import { ToastNotificacionPush } from "../../egresados/components/ToastNotificacionPush";
import { useConfig } from "../../auth/hooks/useConfig";
import axios from "axios";

export const IngresarEgresadoForm = () => {
    const initialForm = {
        apellidos: "",
        nombres: "",
        dni: 0,
        email: "",
        ciclo_egreso: "",
        nacionalidad: "",
        ciudad_natal: "",
        ciudad_actual: "",
        sexo: "",
        carrera: 0,
    };
    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    const urlBase = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
        const url = `${urlBase}/crear/egresados/`;

        axios
            .post(url, formState, config)
            .then(({ data }) => {
                console.log(data);
                CallToast(mensajePositivo, "primary");
            })
            .catch(({ response }) => CallToast(mensajeNegativo, "danger"));
        onResetForm();
    };

    /* Notificacion push */
    const mensajePositivo = (
        <>
            <b>¡Egresado creado con éxito!</b>
        </>
    );
    const mensajeNegativo = (
        <>
            <b>Problemas con el servidor, intente nuevamente.</b>
        </>
    );
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState();
    const [tipo, setTipo] = useState();
    function CallToast(msj, tip) {
        setMensaje(msj);
        setTipo(tip);
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 5100);
    }
    /* Fin Notificacion push */

    return (
        <>
            <div className="container ">
                <article className="card-body mx-auto">
                    <h4 className="card-title mt-3 text-center">
                        Agregar Egresado
                    </h4>
                    <hr />
                    <h5>Datos Personales</h5>
                    <form>
                        <div className="row">
                            <div className="form-group input-group col">
                                <input
                                    className="form-control"
                                    placeholder="Apellidos"
                                    type="text"
                                    id="apellidoEgresado"
                                    name="apellidos"
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="form-group input-group col">
                                <input
                                    className="form-control"
                                    placeholder="Nombres"
                                    type="text"
                                    id="nombreEgresado"
                                    name="nombres"
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-person-vcard"></i>
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="DNI"
                                type="number"
                                id="dniEgresado"
                                name="dni"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-envelope"></i>
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Email address"
                                type="email"
                                id="emailEgresado"
                                name="email"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-balloon"></i>
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Fecha de Nacimiento"
                                type="date"
                                id="fechaNacimientoEgresado"
                                name="fecha_nac"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-globe"></i>
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Nacionalidad"
                                type="text"
                                id="nacionalidadEgresado"
                                name="nacionalidad"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-houses"></i>
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Localidad de nacimiento"
                                type="text"
                                id="localidadNacEgresado"
                                name="ciudad_natal"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-building"></i>
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Localidad Actual"
                                type="text"
                                id="localidadActualEgresado"
                                name="ciudad_actual"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-person-circle"></i>
                                </span>
                            </div>
                            <select
                                className="form-control"
                                name="sexo"
                                id="sexoEgresado"
                                onChange={onInputChange}
                                placeholder="Sexo"
                            >
                                <option value="" defaultValue="">
                                    Seleccionar Sexo
                                </option>
                                <option value="F">Femenino</option>
                                <option value="M">Masculino</option>
                            </select>
                        </div>

                        <hr />
                        <h5>Datos del Egreso</h5>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-mortarboard"></i>
                                </span>
                            </div>
                            <select
                                className="form-control"
                                name="carrera"
                                id="carreraEgresado"
                                onChange={onInputChange}
                                placeholder="Carrera"
                            >
                                <option value={"0"}>
                                    Seleccione una carrera...
                                </option>
                                <option value={"1"}>
                                    Ingeniería en Computación
                                </option>
                            </select>
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-calendar-check"></i>
                                </span>
                            </div>
                            <input
                                className="form-control"
                                placeholder="Fecha Egreso"
                                type="date"
                                id="fechaEgresoEgresado"
                                name="ciclo_egreso"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary my-2 d-grid mx-auto"
                                id="submitButton"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Crear Egresado
                            </button>
                        </div>
                    </form>
                </article>
                <ToastNotificacionPush
                    mensaje={mensaje}
                    mostrar={show}
                    tipo={tipo}
                />
            </div>
        </>
    );
};
