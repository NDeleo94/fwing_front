import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { ToastNotificacionPush } from "../ToastNotificacionPush";
import CreatableSelect from "react-select/creatable";
import { useConfig } from "../../../auth/hooks/useConfig";
import axios from "axios";
import Select from "react-select";
import { TablaHistorial } from "./components/TablaHistorial";
import { modalidad, seniority } from "./constants/options";

export const ConfiguracionHistorialLaboral = ({ egresado }) => {
  const [show, setShow] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [defaultOptionsPuestos, setDefaultOptionsPuestos] = useState([]);
  const [defaultOptionsOrganizaciones, setDefaultOptionsOrganizaciones] =
    useState([]);
  const [defaultOptionsCiudades, setDefaultOptionsCiudades] = useState([]);
  const baseUrl = import.meta.env.VITE_URL_LOCAL;
  const config = useConfig();

  /* Prueba actualizador */
  const [datoEgresado, setDatoEgresado] = useState(egresado);

  const [actualizador, setActualizador] = useState(false);
  function Actualizar() {
    setActualizador(!actualizador);
  }
  /* FIN Prueba actualizador */

  useEffect(() => {
    axios
      .get(`${baseUrl}/puestos/`)
      .then(({ data }) =>
        setDefaultOptionsPuestos(
          data.map((u) => ({
            value: u.id,
            label: u.puesto,
          }))
        )
      )
      .catch((error) => console.log(error));
    axios
      .get(`${baseUrl}/organizaciones/`)
      .then(({ data }) =>
        setDefaultOptionsOrganizaciones(
          data.map((f) => ({
            value: f.id,
            label: f.organizacion,
          }))
        )
      )
      .catch((error) => console.log(error));
    axios
      .get(`${baseUrl}/egresados/${egresado.id}`)
      .then(({ data }) => setDatoEgresado(data))
      .catch((error) => console.log(error));
    axios
      .get(`${baseUrl}/ciudades/`)
      .then(({ data }) => {
        setDefaultOptionsCiudades(
          data.map((u) => ({
            value: u.id,
            label: u.ciudad,
          }))
        );
      })
      .catch((error) => console.log(error));
  }, [actualizador]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setAddMode(true);
    setShowAlert(false);
    setEsActual(false);
    setValueOrganizacion();
    setValueCiudad();
    setValuePuesto();
    setValueModalidad();
    setValueNivel();
    onResetForm();
    setShow(true);
    setWaitAxios(false);
  };

  const [esActual, setEsActual] = useState(false);

  const initialForm = {
    usuario: egresado.id,
    puesto: "",
    organizacion: "",
    inicio: "",
    fin: "",
    ciudad: "",
    seniority: "",
    modalidad: "",
  };
  const { formState, onInputChange, onResetForm } = useForm(initialForm);

  const handleChangeActual = (event) => {
    if (event.target.checked) {
      formState.fin = null;
    }
    setEsActual((current) => !current);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setWaitAxios(true);
    /* Validación React */
    if (
      !!valueOrganizacion &&
      !!valuePuesto &&
      !!valueNivel &&
      !!valueModalidad &&
      !!valueCiudad &&
      formState.inicio &&
      (esActual || formState.fin) &&
      EsInicioAntesQueFin()
    ) {
      valuePuesto.value
        ? (formState.puesto = valuePuesto.value)
        : (formState.puesto = valuePuesto.label);
      valueOrganizacion.value
        ? (formState.organizacion = valueOrganizacion.value)
        : (formState.organizacion = valueOrganizacion.label);
      valueCiudad.value
        ? (formState.ciudad = valueCiudad.value)
        : (formState.ciudad = valueCiudad.label);
      formState.seniority = valueNivel.value;
      formState.modalidad = valueModalidad.value;
      /* post de agregar trabajo a egresado */
      if (addMode) {
        const url = `${baseUrl}/crear/actividades/`;
        axios
          .post(url, formState, config)
          .then(({ data }) => {
            console.log(data);
            setWaitAxios(false);
            Actualizar();
            CallToast(messagePositivo, "primary");
            setShow(false);
          })
          .catch(({ response }) => {
            setWaitAxios(false);
            console.log(response);
            CallToast(messageNegativo, "danger");
          });
      } else {
        const url = `${baseUrl}/editar/actividades/${formState.usuario}/`;
        formState.usuario = egresado.id;
        axios
          .put(url, formState, config)
          .then(({ data }) => {
            console.log(data);
            setWaitAxios(false);
            Actualizar();
            CallToast(messageChangedPositivo, "primary");
            setShow(false);
          })
          .catch(({ response }) => {
            setWaitAxios(false);
            console.log(response);
            CallToast(messageNegativo, "danger");
          });
      }
    } else {
      setShowAlert(true);
      setWaitAxios(false);
    }
  };

  /* Notificación Push */
  const [mostrar, setMostrar] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");
  const messagePositivo = (
    <>
      <b>¡Se agregó el nuevo trabajo!</b>
    </>
  );
  const messageChangedPositivo = (
    <>
      <b>¡Modificación exitosa!</b>
    </>
  );
  const messageNegativo = (
    <>
      <b>Problema con el servidor, intente nuevamente.</b>
    </>
  );
  function CallToast(mensaje, tipo) {
    setTipo(tipo);
    setMensaje(mensaje);
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

  const [isLoadingSelectPuesto, setIsLoadingSelectPuesto] = useState(false);
  const [isLoadingSelectOrganizacion, setIsLoadingSelectOrganizacion] =
    useState(false);
  const [isLoadingSelectCiudad, setIsLoadingSelectCiudad] = useState(false);

  const [valuePuesto, setValuePuesto] = useState();
  const [valueOrganizacion, setValueOrganizacion] = useState();
  const [valueCiudad, setValueCiudad] = useState();

  const handleCreateSelectPuesto = (inputValue) => {
    setIsLoadingSelectPuesto(true);
    setTimeout(() => {
      const newOption = createOption(inputValue); // crea la nueva opción
      setIsLoadingSelectPuesto(false); // saca el loading
      setDefaultOptionsPuestos((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
      setValuePuesto(newOption); // setea el valor (aqui va el formstate)
    }, 1000);
  };
  const handleCreateSelectOrganizacion = (inputValue) => {
    setIsLoadingSelectOrganizacion(true);
    setTimeout(() => {
      const newOption = createOption(inputValue); // crea la nueva opción
      setIsLoadingSelectOrganizacion(false); // saca el loading
      setDefaultOptionsOrganizaciones((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
      setValueOrganizacion(newOption); // setea el valor (aqui va el formstate)
    }, 1000);
  };
  const handleCreateSelectCiudad = (inputValue) => {
    setIsLoadingSelectCiudad(true);
    setTimeout(() => {
      const newOption = createOption(inputValue); // crea la nueva opción
      setIsLoadingSelectCiudad(false); // saca el loading
      setDefaultOptionsCiudades((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
      setValueCiudad(newOption); // setea el valor (aqui va el formstate)
    }, 1000);
  };
  /* Fin Select-input de carrera-facultad-universidad */

  /* Alert de validación */
  const [showAlert, setShowAlert] = useState(false);
  /* FIN Alert de validación */

  function EsInicioAntesQueFin() {
    let fechaInicio = new Date(formState.inicio);
    let fechaFin;
    if (esActual) {
      fechaFin = new Date();
    } else {
      fechaFin = new Date(formState.fin);
    }

    if (fechaInicio <= fechaFin) {
      return true;
    } else return false;
  }

  /* Select nivel de trabajo */
  const [valueNivel, setValueNivel] = useState();
  const [valueModalidad, setValueModalidad] = useState();
  /* Fin Select nivel de trabajo */

  /* botón Delete */
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [eliminarButtonDisabled, setEliminarButtonDisabled] = useState(false);
  const [toDelete, setToDelete] = useState();
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };
  const messageEliminado = (
    <>
      <b>La actividad laboral ha sido eliminada correctamente.</b>
    </>
  );
  const handleDelete = (e, trabajo) => {
    e.preventDefault();
    setToDelete(trabajo);
    setShowModalDelete(true);
  };
  const handleSubmitModalDelete = (event) => {
    event.preventDefault();
    setEliminarButtonDisabled(true);
    const url = `${baseUrl}/eliminar/actividades/${toDelete.id}/`;
    axios
      .delete(url, config)
      .then(({ data }) => {
        console.log(data);
        setEliminarButtonDisabled(false);
        setShowModalDelete(false);
        setToDelete([]);
        CallToast(messageEliminado, "primary");
        Actualizar();
      })
      .catch(({ response }) => {
        console.log(response);
        CallToast(messageNegativo, "danger");
        setShowModalDelete(false);
        setToDelete([]);
      });
  };
  /* FIN botón Delete */

  /* Botón Change Trabajo */
  const [waitAxios, setWaitAxios] = useState(false);
  const handleChangeActividad = (e, trabajo) => {
    e.preventDefault();
    setEsActual(false);
    setAddMode(false);
    formState.usuario = trabajo.id;
    formState.puesto = trabajo.puesto;
    formState.organizacion = trabajo.organizacion;
    formState.inicio = trabajo.inicio;
    formState.fin = trabajo?.fin;

    if (!trabajo.fin) {
      setEsActual(true);
      formState.fin = null;
    }
    setValueOrganizacion({
      label: trabajo.organizacion.organizacion,
      value: trabajo.organizacion.id,
    });
    setValueNivel(seniority.find((vv) => vv.value == trabajo.seniority));
    setValueModalidad(modalidad.find((vv) => vv.value == trabajo.modalidad));
    setValueCiudad({
      label: trabajo.ciudad.ciudad,
      value: trabajo.ciudad.id,
    });
    setValuePuesto({
      label: trabajo.puesto.puesto,
      value: trabajo.puesto.id,
    });
    setShow(true);
  };
  /* FIN Botón Change Trabajo */

  return (
    <>
      <div className="container-fluid mt-2 text-secondary">
        <h3>
          <i className="bi bi-hourglass-split"></i> Historial Laboral
        </h3>
        <hr />

        <Button variant="secondary" onClick={handleShow}>
          <i className="bi bi-plus-circle"></i> Agregar Trabajo
        </Button>

        {datoEgresado?.historial.length ? (
          <TablaHistorial
            historial={datoEgresado.historial}
            handleChangeActividad={handleChangeActividad}
            handleDelete={handleDelete}
          />
        ) : (
          "No hay historial"
        )}

        <ToastNotificacionPush
          mensaje={mensaje}
          mostrar={mostrar}
          tipo={tipo}
        />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {addMode ? "Agregar" : "Modificar"} Trabajo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formPuesto">
                <Form.Label>Puesto</Form.Label>
                <CreatableSelect
                  isClearable
                  isDisabled={isLoadingSelectPuesto}
                  isLoading={isLoadingSelectPuesto}
                  onChange={(newValue) => setValuePuesto(newValue)}
                  onCreateOption={handleCreateSelectPuesto}
                  options={defaultOptionsPuestos}
                  value={valuePuesto}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formOrganizacion">
                <Form.Label>Organizacion</Form.Label>
                <CreatableSelect
                  isClearable
                  isDisabled={isLoadingSelectOrganizacion}
                  isLoading={isLoadingSelectOrganizacion}
                  onChange={(newValue) => setValueOrganizacion(newValue)}
                  onCreateOption={handleCreateSelectOrganizacion}
                  options={defaultOptionsOrganizaciones}
                  value={valueOrganizacion}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCiudad">
                <Form.Label>Ciudad de la Organización</Form.Label>
                <CreatableSelect
                  isClearable
                  isDisabled={isLoadingSelectCiudad}
                  isLoading={isLoadingSelectCiudad}
                  onChange={(newValue) => setValueCiudad(newValue)}
                  onCreateOption={handleCreateSelectCiudad}
                  options={defaultOptionsCiudades}
                  value={valueCiudad}
                />
              </Form.Group>
              <div className="row">
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formFechaInicio">
                    <Form.Label>Inicio</Form.Label>
                    <Form.Control
                      type="date"
                      value={formState.inicio}
                      onChange={onInputChange}
                      name="inicio"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="formFechaFin">
                    <Form.Label>Fin</Form.Label>
                    <Form.Control
                      type={esActual ? "text" : "date"}
                      value={esActual ? "Actual" : formState.fin}
                      onChange={onInputChange}
                      name="fin"
                      disabled={esActual}
                      required={!esActual}
                    />
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="¿Es actual?"
                      name="fin"
                      onChange={handleChangeActual}
                      checked={esActual}
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Nivel Laboral</Form.Label>
                <Select
                  options={seniority}
                  value={valueNivel}
                  onChange={(newValue) => setValueNivel(newValue)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Modalidad</Form.Label>
                <Select
                  options={modalidad}
                  value={valueModalidad}
                  onChange={(newValue) => setValueModalidad(newValue)}
                />
              </Form.Group>
            </Form>
            {showAlert &&
            !(
              formState.inicio &&
              valuePuesto &&
              valueOrganizacion &&
              valueCiudad &&
              valueModalidad &&
              valueNivel &&
              (esActual || formState.fin) &&
              EsInicioAntesQueFin()
            ) ? (
              <>
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  {!(
                    formState.inicio &&
                    valuePuesto &&
                    valueOrganizacion &&
                    valueCiudad &&
                    valueModalidad &&
                    valueNivel &&
                    (esActual || formState.fin)
                  ) ? (
                    <b>
                      - Formulario incompleto, falta: <br />
                    </b>
                  ) : (
                    ""
                  )}
                  {!formState.inicio ? "Inicio de trabajo," : ""}
                  {!valuePuesto ? " Puesto laboral," : ""}
                  {!valueOrganizacion ? " Organizacion," : ""}
                  {!valueCiudad ? " Ciudad," : ""}
                  {!valueModalidad ? " Modalidad," : ""}
                  {!valueNivel ? " Nivel," : ""}
                  {!(formState.fin || esActual) ? " Fin de Trabajo." : ""}
                  {!(
                    formState.inicio &&
                    valuePuesto &&
                    valueOrganizacion &&
                    valueCiudad &&
                    valueModalidad &&
                    valueNivel &&
                    (esActual || formState.fin)
                  ) ? (
                    <br />
                  ) : (
                    ""
                  )}
                  {!EsInicioAntesQueFin() ? (
                    <>
                      <b>- ¡Fechas incorrectas/nulas!</b>
                    </>
                  ) : (
                    ""
                  )}
                </Alert>
              </>
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={waitAxios}
            >
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={waitAxios}
            >
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
          <Modal.Header closeButton>
            <Modal.Title>¿Eliminar actividad laboral?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Desea eliminar la siguiente actividad laboral? <br />
            <b>"{toDelete?.puesto?.puesto}"</b> en{" "}
            <b>{toDelete?.organizacion?.organizacion}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseModalDelete}
              disabled={eliminarButtonDisabled}
            >
              Cerrar
            </Button>
            <Button
              type="submit"
              onClick={handleSubmitModalDelete}
              variant="danger"
              disabled={eliminarButtonDisabled}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
