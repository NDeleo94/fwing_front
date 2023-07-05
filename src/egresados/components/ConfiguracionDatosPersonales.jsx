import Logo from "../../assets/imgs/Logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { useConfig } from "../../auth/hooks/useConfig";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { ToastNotificacionPush } from "./ToastNotificacionPush";
import { useNavigate } from "react-router";
import CreatableSelect from "react-select/creatable";
import { LoginContext } from "../../context/LoginContext";

export const ConfiguracionDatosPersonales = ({ egresado }) => {
    const { tokenGoogle } = useContext(LoginContext);

    const navigate = useNavigate();

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

            const url = `${urlBase}/egresados/${egresado.id}/`;
            axios
                .put(url, formState, config)
                .then(({ data }) => console.log(data))
                .catch(({ response }) => console.log(response.data));
            setShow(true);
            setTimeout(function () {
                navigate(`/perfil/${egresado.id}`);
            }, 3000);
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
            formState.domicilio &&
            formState.sexo
        );
    }

    /* Notificación Push */
    const [show, setShow] = useState(false);
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
            initial.domicilio == changed.domicilio &&
            initial.sexo == changed.sexo
        );
    }

    /* Inicio Input-Select */
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
    const [options, setOptions] = useState(defaultOptionsSelect_ciudades); // setea las opciones por defecto
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

    const [showAlert, setShowAlert] = useState(false);
    /* Subir foto */
    const handleUploadPhoto = (event) => {
        event.preventDefault();
        const url = `${urlBase}/crear/imagenes/`;
        const formData = new FormData();
        formData.append("file", event.target.form[0].files[0]);
        formData.append("url", null);
        formData.append("usuaro", egresado.id);
        formData.append("perfil", true);
        console.log(formData.get("file"));
        console.log(event.target.form[0].files[0]);

        /* axios
            .post(url, formData, config)
            .then(({ data }) => console.log(data))
            .catch(({ response }) => console.log(response.data)); */
        /* const photo = {
            url: null,
            usuario: egresado.id,
            file: null,
            perfil: true,
        };
        photo.file = event.target.form[0].files[0] */
    };
    const handleDeletePhoto = () => {
        // si hay foto
        // verificar borrado
        const url = `${urlBase}/eliminar/imagenes/${egresado.id}/`;
        axios
            .delete(url, config)
            .then(({ data }) => console.log(data))
            .catch(({ response }) => console.log(response.data));
    };
    const handleUploadPhotoGoogle = () => {
        if (!!tokenGoogle) {
            const url = `${urlBase}/crear/imagenes/`;
            const photo = {
                url: tokenGoogle,
                usuario: egresado.id,
                file: null,
                perfil: true,
            };
            axios
                .post(url, photo, config)
                .then(({ data }) => console.log(data))
                .catch(({ response }) => console.log(response.data));
        } else {
            console.log("no se puede ya que no se inició sesión con google");
        }
    };
    console.log(egresado);
    /* Fin Subir foto */
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
                            <div className="col-3">
                                <div className="card-header">
                                    <img
                                        src={Logo}
                                        className="img-thumbnail"
                                        alt="Following"
                                    />
                                </div>
                            </div>
                            <div className="col-9">
                                <Row>
                                    <Form.Label>
                                        ¿Desea cambiar su foto de perfil?
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/png, image/jpeg"
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
                                        >
                                            Eliminar Foto
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            onClick={handleUploadPhotoGoogle}
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
                            </div>
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
                <ToastNotificacionPush mensaje={mensaje} mostrar={show} />
            </div>
        </>
    );
};
