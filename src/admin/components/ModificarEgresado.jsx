import Logo from "../../assets/imgs/Logo.png";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useConfig } from "../../auth/hooks/useConfig";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { Loading } from "../../ui/components/Loading";
import { useForm } from "../../egresados/hooks/useForm";
import { ToastNotificacionPush } from "../../egresados/components/ToastNotificacionPush";

export const ModificarEgresado = () => {
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();
    const baseUrl = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();
    const initialForm = {
        id: "",
        nombres: "",
        apellidos: "",
        dni: "",
        email: "",
        nacionalidad: "",
        fecha_nac: "",
        ciudad_natal: "",
        ciudad_actual: "",
        domicilio: "",
        sexo: "",
        imagen: [
            {
                file: "",
                url: "",
            },
        ],
    };
    const { formState, setFormState, onInputChange } = useForm(initialForm);

    useEffect(() => {
        axios
            .get(`${baseUrl}/egresados/`)
            .then(({ data }) => {
                setOptions(
                    data.map((u) => ({
                        value: u.id,
                        label: `${u.apellidos}, ${u.nombres}`,
                    }))
                );
                setLoading(false);
                setEgresados(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const [egresados, setEgresados] = useState([]); // contiene la data
    const [choosed, setChoosed] = useState(); // trae el id del egresado elegido
    const [disabledButtonSearch, setDisabledButtonSearch] = useState(false); // para evitar sobreconsultas
    const [photo, setPhoto] = useState();
    const [original, setOriginal] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (value.value == choosed) {
            setDisabledButtonSearch(false);
        } else {
            setDisabledButtonSearch(true);
        }
        setChoosed(value.value);
        setOriginal(formState);
    };
    useEffect(() => {
        setDisabledButtonSearch(false);
        setFormState(egresados.find((a) => a.id == choosed));
        setSelect_actual(
            defaultOptionsSelect_ciudades.find(
                (element) => element.label == formState?.ciudad_actual
            )
        );
        setSelect_natal(
            defaultOptionsSelect_ciudades.find(
                (element) => element.label == formState?.ciudad_natal
            )
        );
    }, [choosed]);

    useEffect(() => {
        setPhoto(urlPerfilPhoto());
    }, [formState?.imagen]);

    const urlPerfilPhoto = () => {
        if (formState?.imagen[0]?.file) {
            return `${import.meta.env.VITE_URL_PHOTO}${
                formState.imagen[0].file
            }`;
        }
        if (formState?.imagen[0]?.url) {
            return formState.imagen[0]?.url;
        }

        return Logo;
    };

    /* Create Selected funciones */
    const createOption = (label, id) => ({
        label,
        value: id,
    });
    // Aquí hay que traer la info del back
    const defaultOptionsSelect_ciudades = [
        // opciones por defecto
        createOption("Yerba Buena, Tucumán", 11),
        createOption("Trancas, Tucumán", 12),
        createOption("Salta, Salta", 13),
        createOption("San Miguel de Tucuman", 15),
        createOption(`${initialForm.ciudad_natal}`, 25),
        createOption(`${initialForm.ciudad_actual}`, 35),
    ];
    const [isLoadingSelect_natal, setIsLoadingSelect_natal] = useState(false);
    const [isLoadingSelect_actual, setIsLoadingSelect_actual] = useState(false);
    const [optionsCities, setOptionsCities] = useState(
        defaultOptionsSelect_ciudades
    ); // setea las opciones por defecto
    const [select_natal, setSelect_natal] = useState(
        defaultOptionsSelect_ciudades.find(
            (element) => element.label == initialForm.ciudad_natal
        )
    );
    const [select_actual, setSelect_actual] = useState(
        defaultOptionsSelect_ciudades.find(
            (element) => element.label == initialForm.ciudad_actual
        )
    );
    const handleCreateSelect_natal = (inputValue) => {
        setIsLoadingSelect_natal(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelect_natal(false); // saca el loading
            setOptionsCities((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setSelect_natal(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    const handleCreateSelect_actual = (inputValue) => {
        setIsLoadingSelect_actual(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelect_actual(false); // saca el loading
            setOptions((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setSelect_actual(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    /* FIN Create Selected funciones */

    /* Notificación Push */
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const mensaje = (
        <>
            <b>¡Cambios guardados!</b>
            {` `}Actualizando perfil...
        </>
    );
    /* Fin Notificación Push */

    /* Funciones para modificar foto */
    // Subir foto de local:
    const [photoFile, setPhotoFile] = useState();
    const handleUploadPhoto = (event) => {
        event.preventDefault();
        if (!event.target.form[0].files[0]) {
            setMessage(<>¡Debe elegir una imagen!</>);
            setShow(true);
            setTimeout(function () {
                setShow(false);
            }, 5100);
            return;
        }
        setPhotoFile(event.target.form[0].files[0]);
        handleShowModal(
            "¿Desea que la imagen elegida sea su nueva foto de perfil?",
            "primary",
            "Confirmar"
        );
        setDisabledButtonUploadPhoto(true);
    };
    // Eliminar Foto
    const handleDeletePhoto = () => {
        setDisabledButtonDeletedPhoto(true);
        handleShowModal(
            "¿Desea eliminar su foto de perfil? En su lugar se pondrá el logo de Following.",
            "danger",
            "Eliminar"
        );
    };

    /* Modales para confirmar eliminar o cambiar foto */
    const [showModal, setShowModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState();
    const [tipoModal, setTipoModal] = useState();
    const [confirmarModal, setConfirmarModal] = useState();
    const [disabledButtonUploadPhoto, setDisabledButtonUploadPhoto] =
        useState(false);
    const [disabledButtonDeletedPhoto, setDisabledButtonDeletedPhoto] =
        useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (mensaje, tipo, confirmar) => {
        setMensajeModal(mensaje);
        setTipoModal(tipo);
        setConfirmarModal(confirmar);
        setShowModal(true);
    };

    const handleSubmitModal = () => {
        if (tipoModal == "danger") {
            const url = `${baseUrl}/eliminar/imagenes/${formState.id}/`;
            axios
                .delete(url, config)
                .then(({ data }) => {
                    console.log(data);
                    setDisabledButtonDeletedPhoto(false);
                    setMessage(<>¡Foto eliminada con éxito!</>);
                    setShow(true);
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                })
                .catch(({ response }) => console.log(response.data));
        }
        if (tipoModal == "primary") {
            const url = `${baseUrl}/crear/imagenes/`;
            const formData = new FormData();
            formData.append("file", photoFile);
            formData.append("url", null);
            formData.append("usuario", formState.id);
            formData.append("perfil", true);

            axios
                .post(url, formData, config)
                .then(({ data }) => {
                    console.log(data);
                    setDisabledButtonUploadPhoto(false);
                    setMessage(<>¡Foto agregada con éxito!</>);
                    setShow(true);
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                })
                .catch(({ response }) => console.log(response.data));
        }
        setShowModal(false);
    };
    /* Fin modales para confirmar eliminar o cambiar foto */
    /* FIN Funciones para modificar foto */

    /* Botón para enviar cambios */
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState)

        if (EstaCompleto()) {
            /* select_natal.value
                ? (formState.ciudad_natal = select_natal.value)
                : (formState.ciudad_natal = select_natal.label);
            select_actual.value
                ? (formState.ciudad_actual = select_actual.value)
                : (formState.ciudad_actual = select_actual.label); */

            const url = `${baseUrl}/egresados/${formState.id}/`;
            axios
                .put(url, formState, config)
                .then(({ data }) => {
                    console.log(data);
                    setMessage(mensaje);
                    setShow(true);
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                })
                .catch(({ response }) => {console.log(response.data)
                    setMessage(<>{response.data.detail}</>);
                    setShow(true);
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                });
        } else {
            /* setShowAlert(true); */
        }
    };
    function EstaCompleto() {
        return (
            formState.nombres &&
            formState.apellidos &&
            formState.dni &&
            formState.email &&
            formState.nacionalidad &&
            formState.fecha_nac &&
            /* select_actual &&
            select_natal && */
            formState.domicilio &&
            formState.sexo
        );
    }
    function SeCambioAlgo(original, formState) {
        return (
            original?.nombres == formState?.nombres &&
            original?.apellidos == formState?.apellidos &&
            original?.dni == formState?.dni &&
            original?.email == formState?.email &&
            original?.nacionalidad == formState?.nacionalidad &&
            original?.fecha_nac == formState?.fecha_nac &&
            original?.sexo == formState?.sexo &&
            original?.domicilio == formState?.domicilio
        );
    }
    /* FIN Botón para enviar cambios */

    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <h5>Buscar Egresado:</h5>
                        <Select
                            options={options}
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                        <div className="col-12 mt-2 d-grid">
                            <Button
                                type="submit"
                                onClick={handleSearch}
                                disabled={!value || disabledButtonSearch}
                            >
                                Buscar
                            </Button>
                        </div>
                        <hr />
                    </>
                )}
                {choosed && (
                    <>
                        <Form>
                            <Form.Group className="mb-3">
                                <div className="row">
                                    <Col className="text-center" xs={12} md={3}>
                                        <div className="card-header">
                                            <Image
                                                src={photo}
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                                thumbnail
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={12} md={9}>
                                        <Row>
                                            <Form.Label>
                                                Cambiar la foto de perfil:
                                            </Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                id="imagenPerfil"
                                                name="imagenPerfil"
                                            />
                                        </Row>
                                        <Row className="my-2 justify-content-end">
                                            <Col className="justify-content-end">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={handleDeletePhoto}
                                                    disabled={
                                                        formState?.imagen
                                                            .length == 0 ||
                                                        disabledButtonDeletedPhoto
                                                    }
                                                >
                                                    Eliminar Foto
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button
                                                    size="sm"
                                                    onClick={(event) => {
                                                        handleUploadPhoto(
                                                            event
                                                        );
                                                    }}
                                                    disabled={
                                                        disabledButtonUploadPhoto
                                                    }
                                                >
                                                    ¡Subir foto!
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </div>
                            </Form.Group>
                        </Form>

                        <hr />
                        {/* react-bootstrap */}
                        <Form>
                            <div className="row mx-0">
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formApellidos"
                                    >
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formState?.apellidos}
                                            onChange={onInputChange}
                                            name="apellidos"
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formNombres"
                                    >
                                        <Form.Label>Nombres</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formState?.nombres}
                                            onChange={onInputChange}
                                            name="nombres"
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formTipoDNI"
                                    >
                                        <Form.Label>
                                            Tipo de Documento
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value="Documento Nacional de Identidad"
                                            disabled
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formDNI"
                                    >
                                        <Form.Label>
                                            Número de Documento
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formState?.dni}
                                            onChange={onInputChange}
                                            name="dni"
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formEmail"
                                >
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={formState?.email}
                                        onChange={onInputChange}
                                        name="email"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formNacionalidad"
                                >
                                    <Form.Label>Nacionalidad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState?.nacionalidad}
                                        onChange={onInputChange}
                                        name="nacionalidad"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formFechaNacimiento"
                                >
                                    <Form.Label>Fecha de Nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formState?.fecha_nac}
                                        onChange={onInputChange}
                                        name="fecha_nac"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="formPrueba"
                                >
                                    <Form.Label>Ciudad Natal</Form.Label>
                                    <CreatableSelect
                                        isClearable
                                        isDisabled={isLoadingSelect_natal}
                                        isLoading={isLoadingSelect_natal}
                                        onChange={(newValue) =>
                                            setSelect_natal(newValue)
                                        }
                                        onCreateOption={
                                            handleCreateSelect_natal
                                        }
                                        options={optionsCities}
                                        value={select_natal}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="formCiudadActual"
                                >
                                    <Form.Label>Ciudad Actual</Form.Label>
                                    <CreatableSelect
                                        isClearable
                                        isDisabled={isLoadingSelect_actual}
                                        isLoading={isLoadingSelect_actual}
                                        onChange={(newValue) =>
                                            setSelect_actual(newValue)
                                        }
                                        onCreateOption={
                                            handleCreateSelect_actual
                                        }
                                        options={optionsCities}
                                        value={select_actual}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formDomicilio"
                                >
                                    <Form.Label>Domicilio</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formState?.domicilio}
                                        onChange={onInputChange}
                                        name="domicilio"
                                        required
                                    />
                                </Form.Group>
                                <div className="col-12">
                                    <Form.Label>Sexo</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        required
                                        name="sexo"
                                        value={formState?.sexo}
                                        onChange={onInputChange}
                                    >
                                        <option>Elija una opción...</option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                        <option value="O">
                                            Prefiero no decirlo...
                                        </option>
                                    </Form.Select>
                                </div>
                            </div>
                            {/* {showAlert &&
                    !(
                        formState.email &&
                        formState.nacionalidad &&
                        formState.fecha_nac &&
                        formState.domicilio &&
                        formState.sexo &&
                        select_actual &&
                        select_natal
                    ) ? (
                        <>
                            <Container fluid className="my-3">
                                <Alert
                                    variant="danger"
                                    onClose={() => setShowAlert(false)}
                                    dismissible
                                >
                                    <b>
                                        Formulario incompleto, falta: <br />
                                    </b>
                                    {!formState.email ? "E-mail," : ""}
                                    {!formState.nacionalidad
                                        ? " Nacionalidad,"
                                        : ""}
                                    {!formState.fecha_nac
                                        ? " Fecha de Nacimiento,"
                                        : ""}
                                    {!formState.domicilio ? " Domicilio," : ""}
                                    {!formState.sexo ? " Sexo," : ""}
                                    {!select_natal ? " Ciudad Natal," : ""}
                                    {!select_actual ? " Ciudad Actual." : "."}
                                </Alert>
                            </Container>
                        </>
                    ) : (
                        ""
                    )} */}
                            <div className="col-12 my-4 d-grid">
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={SeCambioAlgo(original, formState)}
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Form>

                        <ToastNotificacionPush
                            mensaje={message}
                            mostrar={show}
                        />

                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Confirmar cambio de Foto
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{mensajeModal}</Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseModal}
                                >
                                    Cerrar
                                </Button>
                                <Button
                                    variant={tipoModal}
                                    onClick={handleSubmitModal}
                                >
                                    {confirmarModal}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )}
            </div>
        </>
    );
};
