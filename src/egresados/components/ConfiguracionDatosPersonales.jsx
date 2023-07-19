import Logo from "../../assets/imgs/Logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { useConfig } from "../../auth/hooks/useConfig";
import { Alert, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { ToastNotificacionPush } from "./ToastNotificacionPush";
import { useNavigate } from "react-router";
import CreatableSelect from "react-select/creatable";
import { LoginContext } from "../../context/LoginContext";

export const ConfiguracionDatosPersonales = ({ egresado }) => {
    const { tokenGoogle } = useContext(LoginContext);

    const navigate = useNavigate();
    /* Prueba actualizador */
    const [datoEgresado, setDatoEgresado] = useState(egresado);

    const [actualizador, setActualizador] = useState(false);
    function Actualizar() {
        setActualizador(!actualizador);
    }
    useEffect(() => {
        axios
            .get(`${urlBase}/egresados/${egresado.id}`)
            .then(({ data }) => setDatoEgresado(data))
            .catch((error) => console.log(error));
        axios
            .get(`${urlBase}/ciudades/`)
            .then(({ data }) => {
                setOptions(
                    data.map((u) => ({
                        value: u.id,
                        label: u.ciudad,
                    }))
                );
            })
            .catch((error) => console.log(error));
            console.log(options)
    }, [actualizador]);
    /* FIN Prueba actualizador */
    const initialForm = {
        nombres: egresado.nombres || "",
        apellidos: egresado.apellidos || "",
        dni: egresado.dni || "",
        email: egresado.email || "",
        nacionalidad: egresado.nacionalidad || "",
        fecha_nac: egresado.fecha_nac || "",
        ciudad_natal: egresado.ciudad_natal || "",
        ciudad_actual: egresado.ciudad_actual || "",
        domicilio: egresado.domicilio || "",
        sexo: egresado.sexo || "",
    };

    const urlPerfilPhoto = () => {
        if (datoEgresado.imagen.length == 0) {
            return Logo;
        }
        if (datoEgresado.imagen[0]?.file) {
            return `${import.meta.env.VITE_URL_PHOTO}${
                datoEgresado.imagen[0].file
            }`;
        } else {
            return datoEgresado.imagen[0]?.url;
        }
    };

    const { formState, onInputChange } = useForm(initialForm);

    const urlBase = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (EstaCompleto()) {
            select_natal.value
                ? (formState.ciudad_natal = select_natal.value)
                : (formState.ciudad_natal = select_natal.label);
            select_actual.value
                ? (formState.ciudad_actual = select_actual.value)
                : (formState.ciudad_actual = select_actual.label);

            const url = `${urlBase}/editar/egresados/${egresado.id}/`;
            axios
                .put(url, formState, config)
                .then(({ data }) => console.log(data))
                .catch(({ response }) => console.log(response.data));
            setMessage(mensaje);
            setShow(true);
            Actualizar();
        } else {
            setShowAlert(true);
        }
    };
    function EstaCompleto() {
        return (
            formState.email &&
            formState.nacionalidad &&
            formState.fecha_nac &&
            select_actual &&
            select_natal &&
            /* formState.domicilio && */
            formState.sexo
        );
    }

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

    function NoHayCambios(initial, changed) {
        return (
            initial.email == changed.email &&
            initial.nacionalidad == changed.nacionalidad &&
            initial.fecha_nac == changed.fecha_nac &&
            initial.ciudad_actual == select_actual?.label &&
            initial.ciudad_natal == select_natal?.label &&
            /* initial.domicilio == changed.domicilio && */
            initial.sexo == changed.sexo
        );
    }

    /* Inicio Input-Select */
    const createOption = (label, id) => ({
        label,
        value: id,
    });
    // Aquí hay que traer la info del back
    /* const defaultOptionsSelect_ciudades = [
        // opciones por defecto
        createOption("Yerba Buena, Tucumán", 11),
        createOption("Trancas, Tucumán", 12),
        createOption("Salta, Salta", 13),
        createOption("San Miguel de Tucuman", 15),
        createOption(`${initialForm.ciudad_natal}`, 25),
        createOption(`${initialForm.ciudad_actual}`, 35),
    ]; */
    const [isLoadingSelect_natal, setIsLoadingSelect_natal] = useState(false);
    const [isLoadingSelect_actual, setIsLoadingSelect_actual] = useState(false);
    const [options, setOptions] = useState([]); // setea las opciones por defecto
    const [select_natal, setSelect_natal] = useState(
        options?.find(
            (element) => element.label == initialForm.ciudad_natal
        )
    );
    const [select_actual, setSelect_actual] = useState(
        options?.find(
            (element) => element.label == initialForm.ciudad_actual
        )
    );
    const handleCreateSelect_natal = (inputValue) => {
        setIsLoadingSelect_natal(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelect_natal(false); // saca el loading
            setOptions((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
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
    /* Fin Input-Select */

    // Show Alert
    const [showAlert, setShowAlert] = useState(false);

    /* Subir foto */
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
    };
    // Eliminar Foto:
    const handleDeletePhoto = () => {
        handleShowModal(
            "¿Desea eliminar su foto de perfil? En su lugar se pondrá el logo de Following.",
            "danger",
            "Eliminar"
        );
    };
    // Subir la foto de Google:
    const handleUploadPhotoGoogle = () => {
        handleShowModal(
            "¿Desea que su foto de perfil sea la de su cuenta asociada a Google?",
            "success",
            "Confirmar"
        );
    };
    /* Fin Subir foto */

    /* Modales para confirmar eliminar o cambiar foto */
    const [showModal, setShowModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState();
    const [tipoModal, setTipoModal] = useState();
    const [confirmarModal, setConfirmarModal] = useState();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (mensaje, tipo, confirmar) => {
        setMensajeModal(mensaje);
        setTipoModal(tipo);
        setConfirmarModal(confirmar);
        setShowModal(true);
    };

    const handleSubmitModal = () => {
        if (tipoModal == "success") {
            const url = `${urlBase}/crear/imagenes/`;
            const photo = {
                url: tokenGoogle,
                usuario: egresado.id,
                file: null,
                perfil: true,
            };
            axios
                .post(url, photo, config)
                .then(({ data }) => {
                    Actualizar();
                    console.log(data);
                })
                .catch(({ response }) => console.log(response.data));
        }
        if (tipoModal == "danger") {
            const url = `${urlBase}/eliminar/imagenes/${egresado.id}/`;
            axios
                .delete(url, config)
                .then(({ data }) => {
                    Actualizar();
                    console.log(data);
                })
                .catch(({ response }) => console.log(response.data));
        }
        if (tipoModal == "primary") {
            const url = `${urlBase}/crear/imagenes/`;
            const formData = new FormData();
            formData.append("file", photoFile);
            formData.append("url", null);
            formData.append("usuario", egresado.id);
            formData.append("perfil", true);

            axios
                .post(url, formData, config)
                .then(({ data }) => {
                    Actualizar();
                    console.log(data);
                })
                .catch(({ response }) => console.log(response.data));
        }
        setShowModal(false);
    };
    /* Fin modales para confirmar eliminar o cambiar foto */
    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h3>
                    <i className="bi bi-file-earmark-person"></i> Datos
                    Personales
                </h3>
                <hr />
                <Form>
                    <Form.Group className="mb-3">
                        <div className="row">
                            <Col className="text-center" xs={12} md={3}>
                                <div className="card-header">
                                    <Image
                                        src={urlPerfilPhoto()}
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
                                        ¿Desea cambiar su foto de perfil?
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
                                                egresado.imagen.length == 0
                                            }
                                        >
                                            Eliminar Foto
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            onClick={handleUploadPhotoGoogle}
                                            disabled={!tokenGoogle}
                                        >
                                            Usar Foto Google
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            size="sm"
                                            onClick={(event) => {
                                                handleUploadPhoto(event);
                                            }}
                                        >
                                            ¡Subir foto!
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                    </Form.Group>
                </Form>
                {!tokenGoogle ? (
                    <div style={{ fontSize: "8pt" }}>
                        ** Para usar la foto de Google, necesita iniciar sesión
                        con su cuenta vinculada a Gmail.
                    </div>
                ) : (
                    ""
                )}
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
                                    disabled
                                    value={egresado.apellidos}
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
                                    disabled
                                    value={egresado.nombres}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group
                                className="mb-3"
                                controlId="formTipoDNI"
                            >
                                <Form.Label>Tipo de Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    value="Documento Nacional de Identidad"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3" controlId="formDNI">
                                <Form.Label>Número de Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={egresado.dni}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                value={formState.email}
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
                                value={formState.nacionalidad}
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
                                value={formState.fecha_nac}
                                onChange={onInputChange}
                                name="fecha_nac"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPrueba">
                            <Form.Label>Ciudad Natal</Form.Label>
                            <CreatableSelect
                                isClearable
                                isDisabled={isLoadingSelect_natal}
                                isLoading={isLoadingSelect_natal}
                                onChange={(newValue) =>
                                    setSelect_natal(newValue)
                                }
                                onCreateOption={handleCreateSelect_natal}
                                options={options}
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
                                onCreateOption={handleCreateSelect_actual}
                                options={options}
                                value={select_actual}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDomicilio">
                            <Form.Label>Domicilio</Form.Label>
                            <Form.Control
                                type="text"
                                value={formState.domicilio}
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
                                value={formState.sexo}
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
                    {showAlert &&
                    !(
                        formState.email &&
                        formState.nacionalidad &&
                        formState.fecha_nac &&
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
                    )}
                    <div className="col-12 my-4 d-grid">
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={NoHayCambios(initialForm, formState)}
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </Form>

                <ToastNotificacionPush mensaje={message} mostrar={show} />

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar cambio de Foto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{mensajeModal}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                        <Button variant={tipoModal} onClick={handleSubmitModal}>
                            {confirmarModal}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
