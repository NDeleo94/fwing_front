import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "../hooks/useForm";
import { ToastNotificacionPush } from "./ToastNotificacionPush";
import CreatableSelect from "react-select/creatable";
import Alert from "react-bootstrap/Alert";

export const ConfiguracionEgresos = ({ egresado }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        onResetForm();
        setValueCarrera();
        setValueFacultad();
        setValueUniversidad();
        setShowAlert(false);
        setShow(true);
    };

    const initialForm = {
        matricula: "",
        ciclo_egreso: "",
        carrera: "",
        facultad: "",
        universidad: "",
    };
    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    const handleSubmit = (event) => {
        event.preventDefault();

        /* Validación React */
        if (
            formState.ciclo_egreso &&
            !!valueUniversidad &&
            !!valueFacultad &&
            !!valueCarrera
        ) {
            formState.ciclo_egreso = `${formState.ciclo_egreso}-01-01`;
            valueCarrera.value
                ? (formState.carrera = valueCarrera.value)
                : (formState.carrera = valueCarrera.label);
            valueFacultad.value
                ? (formState.facultad = valueFacultad.value)
                : (formState.facultad = valueFacultad.label);
            valueUniversidad.value
                ? (formState.universidad = valueUniversidad.value)
                : (formState.universidad = valueUniversidad.label);
            CallToast();
            setShow(false);
            /* post de agregar egreso a egresado */
        } else {
            setShowAlert(true);
        }
    };

    function NoHayCambios(initial, changed) { // No está funcionando pero no interfiere en la destreza del componente
        return (
            initial.matricula == changed.matricula &&
            initial.ciclo_egreso == changed.ciclo_egreso &&
            !!valueCarrera &&
            !!valueFacultad &&
            !!valueUniversidad
        );
    }

    /* Notificación Push */
    const [mostrar, setMostrar] = useState(false);
    const message = (
        <>
            <b>¡Se agregó el nuevo título!</b>
        </>
    );
    function CallToast() {
        setMostrar(true);
        setTimeout(() => {
            setMostrar(false);
        }, 5100);
    }
    /* Fin Notificación Push */

    /* Inicio Select-input de carrera-facultad-universidad */
    const createOption = (label, id) => ({
        label,
        value: id,
    });

    // Aquí hay que traer la info del back
    const defaultOptionsCarreras = [
        createOption("Ingeniería en Computación", 11),
        createOption("Ingeniería Química", 12),
        createOption("Arquitectura", 13),
        createOption("Licenciatura en Historia", 15),
        createOption("Licenciatura en Nutrición", 115),
    ];
    const defaultOptionsFacultades = [
        createOption("Facultad de Ciencias Exactas y Tecnología", 21),
        createOption("Facultad de Arquitectura y Urbanismo", 22),
        createOption("Facultad de Filosofía y Letras", 23),
        createOption("Facultad de Santo Tomás de Aquino", 25),
        createOption("Facultad Tecnológica Regional Tucumán", 125),
    ];
    const defaultOptionsUniversidades = [
        createOption("Universidad Nacional de Tucumán", 31),
        createOption("Universidad del Norte de Santo Tomás de Aquino", 32),
        createOption("Universidad Regional Tucumán", 33),
        createOption("Universidad del Siglo XXI", 35),
    ];
    const [isLoadingSelectCarrera, setIsLoadingSelectCarrera] = useState(false);
    const [isLoadingSelectFacultad, setIsLoadingSelectFacultad] =
        useState(false);
    const [isLoadingSelectUniversidad, setIsLoadingSelectUniversidad] =
        useState(false);
    const [optionsCarreras, setOptionsCarreras] = useState(
        defaultOptionsCarreras
    );
    const [optionsFacultades, setOptionsFacultades] = useState(
        defaultOptionsFacultades
    );
    const [optionsUniversidades, setOptionsUniversidades] = useState(
        defaultOptionsUniversidades
    );
    const [valueCarrera, setValueCarrera] = useState();
    const [valueFacultad, setValueFacultad] = useState();
    const [valueUniversidad, setValueUniversidad] = useState();
    const handleCreateSelectCarrera = (inputValue) => {
        setIsLoadingSelectCarrera(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelectCarrera(false); // saca el loading
            setOptionsCarreras((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setValueCarrera(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    const handleCreateSelectFacultad = (inputValue) => {
        setIsLoadingSelectFacultad(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelectFacultad(false); // saca el loading
            setOptionsFacultades((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setValueFacultad(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    const handleCreateSelectUniversidad = (inputValue) => {
        setIsLoadingSelectUniversidad(true);
        setTimeout(() => {
            const newOption = createOption(inputValue); // crea la nueva opción
            setIsLoadingSelectUniversidad(false); // saca el loading
            setOptionsUniversidades((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
            setValueUniversidad(newOption); // setea el valor (aqui va el formstate)
        }, 1000);
    };
    /* Fin Select-input de carrera-facultad-universidad */

    const [showAlert, setShowAlert] = useState(false);

    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h3>Egresos</h3>
                <hr />

                <Button variant="secondary" onClick={handleShow}>
                    Agregar Egreso
                </Button>

                <Table responsive>
                    <thead>
                        <tr>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Año de Egreso</th>
                            <th scope="col">Carrera</th>
                            <th scope="col">Facultad</th>
                            <th scope="col">Universidad</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {egresado.egresos.map((egre) => (
                            <tr key={egre.id}>
                                <th scope="row">
                                    {egre.matricula ? egre.matricula : "--"}
                                </th>
                                <td>{egre.ciclo_egreso.split("-")[0]}</td>
                                <td>{egre.carrera.carrera}</td>
                                <td>{egre.carrera.facultad.facultad}</td>
                                <td>
                                    {egre.carrera.facultad.universidad.acronimo}
                                </td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <ToastNotificacionPush mensaje={message} mostrar={mostrar} />

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Egreso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                        <Form.Label>Año de Egreso</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formState.ciclo_egreso}
                                            onChange={onInputChange}
                                            name="ciclo_egreso"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Group
                                className="mb-3"
                                controlId="formUniversidad"
                            >
                                <Form.Label>Universidad</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    isDisabled={isLoadingSelectUniversidad}
                                    isLoading={isLoadingSelectUniversidad}
                                    onChange={(newValue) =>
                                        setValueUniversidad(newValue)
                                    }
                                    onCreateOption={
                                        handleCreateSelectUniversidad
                                    }
                                    options={optionsUniversidades}
                                    value={valueUniversidad}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formFacultad"
                            >
                                <Form.Label>Facultad</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    isDisabled={
                                        isLoadingSelectFacultad ||
                                        !valueUniversidad
                                    }
                                    isLoading={isLoadingSelectFacultad}
                                    onChange={(newValue) =>
                                        setValueFacultad(newValue)
                                    }
                                    onCreateOption={handleCreateSelectFacultad}
                                    options={optionsFacultades}
                                    value={valueFacultad}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formCarrera"
                            >
                                <Form.Label>Carrera</Form.Label>
                                <CreatableSelect
                                    isClearable
                                    isDisabled={
                                        isLoadingSelectCarrera ||
                                        !valueFacultad ||
                                        !valueUniversidad
                                    }
                                    isLoading={isLoadingSelectCarrera}
                                    onChange={(newValue) =>
                                        setValueCarrera(newValue)
                                    }
                                    onCreateOption={handleCreateSelectCarrera}
                                    options={optionsCarreras}
                                    value={valueCarrera}
                                />
                            </Form.Group>
                        </Form>
                        {showAlert &&
                        !(
                            formState.ciclo_egreso &&
                            valueUniversidad &&
                            valueFacultad &&
                            valueCarrera
                        ) ? (
                            <>
                                <Alert
                                    variant="danger"
                                    onClose={() => setShowAlert(false)}
                                    dismissible
                                >
                                    <b>
                                        Formulario incompleto, falta: <br />
                                    </b>
                                    {!formState.ciclo_egreso
                                        ? "Año de Egreso,"
                                        : ""}
                                    {!valueUniversidad ? " Universidad," : ""}
                                    {!valueFacultad ? " Facultad," : ""}
                                    {!valueCarrera ? " Carrera." : "."}
                                </Alert>
                            </>
                        ) : (
                            ""
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={NoHayCambios(initialForm, formState)}
                        >
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
