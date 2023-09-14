import React, { useEffect, useState } from "react";
import { useForm } from "../../egresados/hooks/useForm";
import { ToastNotificacionPush } from "../../egresados/components/ToastNotificacionPush";
import { useConfig } from "../../auth/hooks/useConfig";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { Button, Form, Modal } from "react-bootstrap";

export const IngresarEgresadoForm = () => {
    const initialForm = {
        apellidos: "",
        nombres: "",
        dni: 0,
        email: "",
        fecha_nac: "",
        ciclo_egreso: "",
        nacionalidad: "",
        ciudad_natal: "",
        ciudad_actual: "",
        sexo: "",
        carrera: 0,
    };
    const { formState, onInputChange, onResetForm, setFormState } =
        useForm(initialForm);

    const urlBase = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();

    const handleSubmit = (e) => {
        e.preventDefault();
        setWaitAxios(true);
        console.log(formState);
        if (
            formState.apellidos &&
            formState.nombres &&
            formState.dni &&
            formState.fecha_nac &&
            formState.nacionalidad &&
            formState.sexo &&
            formState.carrera &&
            formState.ciclo_egreso
        ) {
            const url = `${urlBase}/crear/egresados/`;
            formState.ciudad_natal.value
                ? (formState.ciudad_natal = formState.ciudad_natal.value)
                : (formState.ciudad_natal = formState.ciudad_natal.label);
            formState.ciudad_actual.value
                ? (formState.ciudad_actual = formState.ciudad_actual.value)
                : (formState.ciudad_actual = formState.ciudad_actual.label);
            axios
                .post(url, formState, config)
                .then(({ data }) => {
                    console.log(data);
                    CallToast(mensajePositivo, "primary");
                    onResetForm();
                    setWaitAxios(false);
                })
                .catch(({ response }) => {
                    CallToast(mensajeNegativo, "danger");
                    console.log(response);
                    setWaitAxios(false);
                });
        } else {
            CallToast(mensajeFaltanDatos, "danger");
            setWaitAxios(false);
        }
    };

    useEffect(() => {
        axios
            .get(`${urlBase}/ciudades/`)
            .then(({ data }) => {
                setOptionsCities(
                    data.map((u) => ({
                        value: u.id,
                        label: u.ciudad,
                    }))
                );
            })
            .catch((error) => console.log(error));
    }, []);

    /* Create Selected funciones */
    const createOption = (label, id) => ({
        label,
        value: id,
    });

    const [isLoadingSelect_natal, setIsLoadingSelect_natal] = useState(false);
    const [isLoadingSelect_actual, setIsLoadingSelect_actual] = useState(false);
    const [optionsCities, setOptionsCities] = useState(); // setea las opciones por defecto

    const handleCreateSelect_natal = (inputValue) => {
        setIsLoadingSelect_natal(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelect_natal(false); // saca el loading
            setOptionsCities((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setFormState({
                ...formState,
                ciudad_natal: newOption,
            }); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    const handleCreateSelect_actual = (inputValue) => {
        setIsLoadingSelect_actual(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelect_actual(false); // saca el loading
            setOptions((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setFormState({
                ...formState,
                ciudad_actual: newOption,
            }); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    /* FIN Create Selected funciones */

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
    const mensajeFaltanDatos = (
        <>
            <b>Por favor, complete todos los datos</b>
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

    const [waitAxios, setWaitAxios] = useState(false);

    /* Botón agregar egresados desde siu */
    const [showModal, setShowModal] = useState(false);
    const [aceptarButtonDisabled, setAceptarButtonDisabled] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleSiu = () => {
        setAceptarButtonDisabled(false);
        setShowModal(true);
    };
    const handleSubmitModal = () => {
        setAceptarButtonDisabled(true);

        const url = `${urlBase}/siu/`;
        axios
            .post(url, config)
            .then(({ data }) => {
                setAceptarButtonDisabled(false);
                console.log(data);
            })
            .catch(({ response }) => {
                setAceptarButtonDisabled(false);
                console.log(response);
            });
    };
    /* FIN Botón agregar egresados desde siu */
    return (
        <>
            <div className="container ">
                <h4 className="card-title mt-3 text-center">
                    Agregar Egresado SIU Guaraní
                </h4>
                <div className="col-12 mt-2 d-grid">
                    <Button type="submit" onClick={handleSiu}>
                        Agregar Egresados desde SIU Guaraní
                    </Button>
                </div>
                <hr />
                <article className="card-body mx-auto">
                    <h4 className="card-title mt-3 text-center">
                        Agregar Egresado Manualmente
                    </h4>
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
                                    value={formState.apellidos}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="form-group input-group col">
                                <input
                                    className="form-control"
                                    placeholder="Nombres"
                                    value={formState.nombres}
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
                                value={formState.dni}
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
                                value={formState.email}
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
                                value={formState.fecha_nac}
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
                                value={formState.nacionalidad}
                                type="text"
                                id="nacionalidadEgresado"
                                name="nacionalidad"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-person-circle"></i>
                                </span>
                            </div>
                            <select
                                className="form-control"
                                name="sexo"
                                id="sexoEgresado"
                                value={formState.sexo}
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
                        <Form.Label>Ciudad Natal</Form.Label>
                        <CreatableSelect
                            isClearable
                            isDisabled={isLoadingSelect_natal}
                            isLoading={isLoadingSelect_natal}
                            onChange={(newValue) =>
                                setFormState({
                                    ...formState,
                                    ciudad_natal: newValue,
                                })
                            }
                            onCreateOption={handleCreateSelect_natal}
                            options={optionsCities}
                            value={formState?.ciudad_natal}
                        />

                        <Form.Label>Ciudad Actual</Form.Label>
                        <CreatableSelect
                            isClearable
                            isDisabled={isLoadingSelect_actual}
                            isLoading={isLoadingSelect_actual}
                            onChange={(newValue) =>
                                setFormState({
                                    ...formState,
                                    ciudad_actual: newValue,
                                })
                            }
                            onCreateOption={handleCreateSelect_actual}
                            options={optionsCities}
                            value={formState?.ciudad_actual}
                        />

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
                                value={formState.carrera}
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
                                value={formState.ciclo_egreso}
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
                                disabled={waitAxios}
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Egresados desde Siu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Desea actualizar la Base de Datos de Following con nuevos
                    egresados de SIU Guaraní?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmitModal}
                        variant="success"
                        disabled={aceptarButtonDisabled}
                    >
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
