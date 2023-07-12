import Logo from "../../assets/imgs/Logo.png";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useConfig } from "../../auth/hooks/useConfig";
import { Button, Col, Form, Image, Row } from "react-bootstrap";import CreatableSelect from "react-select/creatable";


export const ModificarEgresado = () => {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();
    const baseUrl = import.meta.env.VITE_URL_LOCAL;
    const config = useConfig();

    useEffect(() => {
        axios
            .get(`${baseUrl}/egresados/`)
            .then(({ data }) =>
                setOptions(
                    data.map((u) => ({
                        value: u.id,
                        label: `${u.apellidos}, ${u.nombres}`,
                    }))
                )
            )
            .catch((error) => console.log(error));
    }, []);

    const urlPerfilPhoto = () => {
        /* if (egresado.imagen.length == 0) {
            return Logo;
        }
        if (egresado.imagen[0]?.file) {
            return `${import.meta.env.VITE_URL_PHOTO}${
                egresado.imagen[0].file
            }`;
        } else {
            return egresado.imagen[0]?.url;
        } */
    };

    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h5>Buscar Egresado:</h5>
                <Select
                    options={options}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
                <div className="col-12 mt-2 d-grid">
                    <Button
                        type="submit"
                        /* onClick={handleSubmit} */
                        disabled={!value}
                    >
                        Buscar
                    </Button>
                </div>
                <hr />
                <Form>
                    <Form.Group className="mb-3">
                        <div className="row">
                            <Col className="text-center" xs={12} md={3}>
                                <div className="card-header">
                                    <Image
                                        src={Logo}
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
                                            /* onClick={/* console } */
                                            /* disabled={
                                                egresado.imagen.length == 0
                                            } */
                                        >
                                            Eliminar Foto
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            size="sm"
                                            /* onClick={(event) => {
                                                handleUploadPhoto(event);
                                            }} */
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
                                    /* value={egresado.apellidos} */
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
                                    /* value={egresado.nombres} */
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
                                    value="Documento Nacional de Identidad"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3" controlId="formDNI">
                                <Form.Label>Número de Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    
                                    /* value={egresado.dni} */
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                /* value={formState.email}
                                onChange={onInputChange} */
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
                                /* value={formState.nacionalidad}
                                onChange={onInputChange} */
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
                                /* value={formState.fecha_nac}
                                onChange={onInputChange} */
                                name="fecha_nac"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPrueba">
                            <Form.Label>Ciudad Natal</Form.Label>
                            <CreatableSelect
                                isClearable
                                /* isDisabled={isLoadingSelect_natal}
                                isLoading={isLoadingSelect_natal}
                                onChange={(newValue) =>
                                    setSelect_natal(newValue)
                                }
                                onCreateOption={handleCreateSelect_natal}
                                options={options}
                                value={select_natal} */
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formCiudadActual"
                        >
                            <Form.Label>Ciudad Actual</Form.Label>
                            <CreatableSelect
                                isClearable
                                /* isDisabled={isLoadingSelect_actual}
                                isLoading={isLoadingSelect_actual}
                                onChange={(newValue) =>
                                    setSelect_actual(newValue)
                                }
                                onCreateOption={handleCreateSelect_actual}
                                options={options}
                                value={select_actual} */
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDomicilio">
                            <Form.Label>Domicilio</Form.Label>
                            <Form.Control
                                type="text"
                                /* value={formState.domicilio}
                                onChange={onInputChange} */
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
                                /* value={formState.sexo}
                                onChange={onInputChange} */
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
                            /* onClick={handleSubmit}
                            disabled={NoHayCambios(initialForm, formState)} */
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};
