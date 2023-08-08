import Logo from "../../assets/imgs/Logo.png";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useConfig } from "../../auth/hooks/useConfig";
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    Image,
    Modal,
    Row,
} from "react-bootstrap";
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
        sexo: "",
        imagen: [
            {
                file: "",
                url: "",
            },
        ],
        matricula: "",
        ciclo_egreso: "",
        id_egreso: "",
    };
    const modelFormFollowing = {
        matricula: "",
        ciclo_egreso: "",
        carrera: 1,
        facultad: 1,
        universidad: 1,
        postgrado: false,
    };
    const { formState, setFormState, onInputChange } = useForm(initialForm);
    const [actualizador, setActualizador] = useState(false);
    const actualizar = () => {
        setLoading(true);
        setActualizador((a) => !a);
        setChoosed(false);
        setValue("");
    };

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
        axios
            .get(`${baseUrl}/ciudades/`)
            .then(({ data }) => {
                setOptionsCities(
                    data.map((u) => ({
                        value: u.id,
                        label: u.ciudad,
                    }))
                );
            })
            .catch((error) => console.log(error));
    }, [actualizador]);

    const [egresados, setEgresados] = useState([]); // contiene la data
    const [choosed, setChoosed] = useState(); // trae el id del egresado elegido
    const [disabledButtonSearch, setDisabledButtonSearch] = useState(false); // para evitar sobreconsultas
    const [photo, setPhoto] = useState();
    const [original, setOriginal] = useState([]);
    const [egresadoBuscado, setEgresadoBuscado] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (value.value == choosed) {
            setDisabledButtonSearch(false);
        } else {
            setDisabledButtonSearch(true);
        }
        setChoosed(value.value);
    };
    useEffect(() => {
        setDisabledButtonSearch(false);
        egresados.map((a) => {
            if (a.id == choosed) {
                console.log(a);
                let ciclo_egreso_following;
                let matricula_following;
                let id_egreso_following;
                a.egresos.map((egre) => {
                    if (egre.carrera.following) {
                        id_egreso_following = egre.id;
                        ciclo_egreso_following = egre.ciclo_egreso;
                        matricula_following = egre.matricula;
                    }
                });
                setFormState({
                    ...formState,
                    id: a.id,
                    apellidos: a.apellidos,
                    nombres: a.nombres,
                    ciudad_actual: {
                        label: a.ciudad_actual?.ciudad,
                        value: a.ciudad_actual?.id,
                    },
                    ciudad_natal: {
                        label: a.ciudad_natal?.ciudad,
                        value: a.ciudad_natal?.id,
                    },
                    email: a.email,
                    fecha_nac: a.fecha_nac,
                    dni: a.dni,
                    nacionalidad: a.nacionalidad,
                    sexo: a.sexo,
                    imagen: {
                        file: a?.imagen[0]?.file,
                        url: a?.imagen[0]?.url,
                    },
                    matricula: matricula_following,
                    ciclo_egreso: ciclo_egreso_following,
                    id_egreso: id_egreso_following,
                });
                setOriginal({
                    ...formState,
                    matricula: matricula_following,
                    id_egreso: id_egreso_following,
                    ciclo_egreso: ciclo_egreso_following,
                    id: a.id,
                    apellidos: a.apellidos,
                    nombres: a.nombres,
                    ciudad_actual: {
                        label: a.ciudad_actual?.ciudad,
                        value: a.ciudad_actual?.id,
                    },
                    ciudad_natal: {
                        label: a.ciudad_natal?.ciudad,
                        value: a.ciudad_natal?.id,
                    },
                    email: a.email,
                    fecha_nac: a.fecha_nac,
                    dni: a.dni,
                    nacionalidad: a.nacionalidad,
                    sexo: a.sexo,
                    imagen: {
                        file: a?.imagen[0]?.file,
                        url: a?.imagen[0]?.url,
                    },
                });
            }
        });
    }, [choosed]);

    useEffect(() => {
        setPhoto(urlPerfilPhoto());
    }, [formState.imagen]);

    const urlPerfilPhoto = () => {
        if (formState?.imagen?.file) {
            return `${import.meta.env.VITE_URL_PHOTO}${formState.imagen.file}`;
        }

        if (formState?.imagen?.url) {
            return formState.imagen?.url;
        }

        return Logo;
    };

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

    /* Notificación Push */
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const mensaje2 = (
        <>
            <b>¡Cambios guardados!</b>
            {` `}Actualizando perfil...
        </>
    );
    const [tipo, setTipo] = useState("");
    /* Fin Notificación Push */

    /* Funciones para modificar foto */
    // Subir foto de local:
    const [photoFile, setPhotoFile] = useState();
    const handleUploadPhoto = (event) => {
        event.preventDefault();
        if (!event.target.form[0].files[0]) {
            setMessage(<>¡Debe elegir una imagen!</>);
            setTipo("danger");
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
                    setTipo("primary");
                    setShow(true);
                    actualizar();
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                })
                .catch(({ response }) => {
                    console.log(response.data);
                    setDisabledButtonDeletedPhoto(false);
                    setMessage(
                        <>
                            <b>{response.data}</b>
                        </>
                    );
                    setTipo("danger");
                    setShow(true);
                    actualizar();
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                });
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
                    setTipo("primary");
                    setShow(true);
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                })
                .catch(({ response }) => {
                    console.log(response.data);
                    setDisabledButtonUploadPhoto(false);
                    setMessage(
                        <>
                            <b>{response.data}</b>
                        </>
                    );
                    setTipo("danger");
                    setShow(true);
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                });
        }
        setShowModal(false);
    };
    /* Fin modales para confirmar eliminar o cambiar foto */
    /* FIN Funciones para modificar foto */

    /* Botón para enviar cambios  de datos personales*/
    const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        if (EstaCompleto()) {
            formState.ciudad_natal.value
                ? (formState.ciudad_natal = formState.ciudad_natal.value)
                : (formState.ciudad_natal = formState.ciudad_natal.label);
            formState.ciudad_actual.value
                ? (formState.ciudad_actual = formState.ciudad_actual.value)
                : (formState.ciudad_actual = formState.ciudad_actual.label);

            const url = `${baseUrl}/editar/egresados/${formState.id}/`;
            let formDatosPersonales = {
                id: formState.id,
                nombres: formState.nombres,
                apellidos: formState.apellidos,
                dni: formState.dni,
                email: formState.email,
                nacionalidad: formState.nacionalidad,
                fecha_nac: formState.fecha_nac,
                ciudad_natal: formState.ciudad_natal,
                ciudad_actual: formState.ciudad_actual,
                sexo: formState.sexo,
            };

            axios
                .put(url, formDatosPersonales, config)
                .then(({ data }) => {
                    console.log(data);
                    setMessage(mensaje2);
                    setTipo("primary");
                    setShow(true);
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                    actualizar();
                })
                .catch(({ response }) => {
                    console.log(response.data);
                    setMessage(<>{response.data.detail}</>);
                    setTipo("danger");
                    setShow(true);
                    setTimeout(function () {
                        setShow(false);
                    }, 5100);
                });
        } else {
            setShowAlert(true);
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
            formState.sexo &&
            formState.ciudad_actual &&
            formState.ciudad_natal
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
            original?.ciudad_actual?.label == formState?.ciudad_actual?.label &&
            original?.ciudad_natal?.label == formState?.ciudad_natal?.label
        );
    }
    /* FIN Botón para enviar cambios */

    /* Botón para enviar cambios en datos de seguimiento */
    const [showAlertFollowing, setShowAlertFollowing] = useState(false);
    const [waitAxiosDatosDeEgreso, setWaitAxiosDatosDeEgreso] = useState(false);
    const handleSubmitFollowing = (event) => {
        event.preventDefault();
        setWaitAxiosDatosDeEgreso(true);

        if (EstaCompletoFollowing()) {
            const url = `${baseUrl}/editar/egresos/${formState.id_egreso}/`;
            let formDatosFollowing = {
                ...modelFormFollowing,
                matricula: formState.matricula || "",
                ciclo_egreso: formState.ciclo_egreso,
                usuario: formState.id,
            };
            console.log(formDatosFollowing);

            axios
                .put(url, formDatosFollowing, config)
                .then(({ data }) => {
                    console.log(data);
                    CallToast(messagePositivo, "primary");
                    setWaitAxiosDatosDeEgreso(false);
                    actualizar();
                })
                .catch(({ response }) => {
                    console.log(response);
                    setWaitAxiosDatosDeEgreso(false);
                    CallToast(messageNegativo, "danger");
                });
        } else {
            setWaitAxiosDatosDeEgreso(false);
            CallToast("¡Falta fecha de egreso!", "danger");
        }
    };
    function EstaCompletoFollowing() {
        return formState.ciclo_egreso;
    }
    function SeCambioAlgoFollowing(original, formState) {
        return (
            original?.matricula == formState?.matricula &&
            original?.ciclo_egreso == formState?.ciclo_egreso
        );
    }
    /* FIN Botón para enviar cambios en datos de seguimiento */

    /* Eliminar Egresado */
    const [waitAxiosDelete, setWaitAxiosDelete] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setWaitAxiosDelete(false);
    };
    function CallToast(mensaje, tipo) {
        setTipo(tipo);
        setMessage(mensaje);
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 5100);
    }
    const messageEliminado = (
        <>
            <b>El egresado ha sido eliminado correctamente.</b>
        </>
    );
    const messagePositivo = (
        <>
            <b>El egresado ha sido modificado correctamente.</b>
        </>
    );
    const messageNegativo = (
        <>
            <b>Problema con el servidor, intente nuevamente.</b>
        </>
    );
    const handleSubmitModalDelete = (event) => {
        event.preventDefault();

        const url = `${baseUrl}/eliminar/egresados/${choosed}/`;
        axios
            .delete(url, config)
            .then(({ data }) => {
                console.log(data);
                CallToast(messageEliminado, "primary");
                setShowModalDelete(false);
                setWaitAxiosDelete(false);
                actualizar();
            })
            .catch(({ response }) => {
                console.log(response);
                CallToast(messageNegativo, "danger");
                setShowModalDelete(false);
                setWaitAxiosDelete(false);
            });
    };

    const handleDelete = () => {
        setShowModalDelete(true);
        setWaitAxiosDelete(true);
    };
    /* FIN Eliminar Egresado */
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
                        <h4>Foto de perfil:</h4>
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
                        <h4>Datos personales:</h4>
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
                                            setFormState({
                                                ...formState,
                                                ciudad_natal: newValue,
                                            })
                                        }
                                        onCreateOption={
                                            handleCreateSelect_natal
                                        }
                                        options={optionsCities}
                                        value={formState?.ciudad_natal}
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
                                            setFormState({
                                                ...formState,
                                                ciudad_actual: newValue,
                                            })
                                        }
                                        onCreateOption={
                                            handleCreateSelect_actual
                                        }
                                        options={optionsCities}
                                        value={formState?.ciudad_actual}
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
                            {showAlert &&
                            !(
                                formState.email &&
                                formState.nombres &&
                                formState.apellidos &&
                                formState.dni &&
                                formState.nacionalidad &&
                                formState.fecha_nac &&
                                formState.sexo &&
                                formState.ciudad_actual &&
                                formState.ciudad_natal
                            ) ? (
                                <>
                                    <Container fluid className="my-3">
                                        <Alert
                                            variant="danger"
                                            onClose={() => setShowAlert(false)}
                                            dismissible
                                        >
                                            <b>
                                                Formulario incompleto, falta:{" "}
                                                <br />
                                            </b>
                                            {!formState.email ? "E-mail," : ""}
                                            {!formState.nombres
                                                ? " Nombres,"
                                                : ""}
                                            {!formState.apellidos
                                                ? " Apellidos,"
                                                : ""}
                                            {!formState.dni ? " DNI," : ""}
                                            {!formState.nacionalidad
                                                ? " Nacionalidad,"
                                                : ""}
                                            {!formState.fecha_nac
                                                ? " Fecha de Nacimiento,"
                                                : ""}
                                            {!formState.sexo ? " Sexo," : ""}
                                            {!formState.ciudad_natal
                                                ? " Ciudad Natal,"
                                                : ""}
                                            {!formState.ciudad_actual
                                                ? " Ciudad Actual."
                                                : "."}
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
                                    disabled={SeCambioAlgo(original, formState)}
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </Form>
                        <hr />
                        <h4>Datos de Seguimiento:</h4>
                        <Form>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formMatricula"
                                    >
                                        <Form.Label>Matrícula</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formState.matricula}
                                            onChange={onInputChange}
                                            name="matricula"
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formAnioEgreso"
                                    >
                                        <Form.Label>Fecha de Egreso</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={formState.ciclo_egreso}
                                            onChange={onInputChange}
                                            name="ciclo_egreso"
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                        <div className="col-12 mb-4 d-grid">
                            <Button
                                type="submit"
                                onClick={handleSubmitFollowing}
                                disabled={
                                    SeCambioAlgoFollowing(
                                        original,
                                        formState
                                    ) || waitAxiosDatosDeEgreso
                                }
                            >
                                Guardar cambios
                            </Button>
                        </div>
                        <hr />
                        <h4>Eliminar Egresado:</h4>
                        <div className="col-12 mb-4 d-grid">
                            <Button
                                type="submit"
                                variant="danger"
                                onClick={handleDelete}
                                disabled={waitAxiosDelete}
                            >
                                <strong>Eliminar Egresado</strong>
                            </Button>
                        </div>
                    </>
                )}

                <ToastNotificacionPush
                    mensaje={message}
                    mostrar={show}
                    tipo={tipo}
                />

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

                <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminar Egresado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Realmente desea eliminar a:
                        <br />
                        <b>
                            {formState.apellidos}, {formState.nombres}
                        </b>{" "}
                        ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseModalDelete}
                        >
                            Cerrar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleSubmitModalDelete}
                        >
                            <strong>Eliminar</strong>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
