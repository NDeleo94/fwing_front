import React, { useEffect, useState } from "react";
import { useConfig } from "../../../auth/hooks/useConfig";
import axios from "axios";
import { Alert, Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { Loading } from "../../../ui/components/Loading";
import { useForm } from "../../../egresados/hooks/useForm";
import { ToastNotificacionPush } from "../../../egresados/components/ToastNotificacionPush";
import { TablaPuestos } from "./components/TablaPuestos";
import { ModalEditPuestos } from "./components/ModalEditPuestos";
import { ModalDeletePuestos } from "./components/ModalDeletePuestos";
import {
  messageChangedPositivo,
  messageEliminado,
  messageNegativo,
  messagePositivo,
} from "../../constants/messages";

export const AdminPuestos = () => {
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_URL_LOCAL;
  const config = useConfig();
  const [actualizador, setActualizador] = useState(false);
  const [organizaciones, setOrganizaciones] = useState([]);
  const actualizar = () => {
    setActualizador((a) => !a);
    setLoading(true);
    /*setChoosed(false);
        setValue(""); */
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}/puestos/`)
      .then(({ data }) => {
        setOrganizaciones(data);
        if (data) {
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
    /* axios
            .get(`${baseUrl}/ciudades/`)
            .then(({ data }) => {
                setOptionsCities(
                    data.map((u) => ({
                        value: u.id,
                        label: u.ciudad,
                    }))
                );
            })
            .catch((error) => console.log(error)); */
  }, [actualizador]);

  /* Modal agregar/editar organizacion */
  const [show, setShow] = useState(false);
  const [addMode, setAddMode] = useState(true);
  const [waitAxios, setWaitAxios] = useState(false);
  const initialForm = {
    searchText: "",
    id: 0,
    puesto: "",
    descripcion: "",
  };
  const [showAlert, setShowAlert] = useState(false);
  const { formState, onInputChange, onResetForm } = useForm(initialForm);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setAddMode(true);
    setShow(true);
    onResetForm();
    setShowAlert(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setWaitAxios(true);
    /* controlar que todo esté bien */
    if (formState.puesto && formState.descripcion) {
      if (addMode) {
        const url = `${baseUrl}/crear/puestos/`;
        console.log(formState);
        axios
          .post(url, formState, config)
          .then(({ data }) => {
            console.log(data);
            CallToast(messagePositivo("Puesto de trabajo"), "primary");
            actualizar();
            setShow(false);
            setWaitAxios(false);
          })
          .catch(({ response }) => {
            CallToast(messageNegativo, "danger");
            console.log(response);
            setWaitAxios(false);
          });
      } else {
        const url = `${baseUrl}/editar/puestos/${formState.id}/`;
        console.log(formState);
        axios
          .put(url, formState, config)
          .then(({ data }) => {
            console.log(data);
            setWaitAxios(false);
            actualizar();
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
  const handleChangeOrganizacion = (e, o) => {
    e.preventDefault();
    setAddMode(false);
    setShowAlert(false);
    formState.id = o.id;
    formState.puesto = o.puesto;
    formState.descripcion = o.descripcion || "";
    setShow(true);
  };
  /* Fin Modal agregar/editar organizacion */

  /* Modal Eliminar organización */
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };
  const [toDelete, setToDelete] = useState();
  const [eliminarButtonDisabled, setEliminarButtonDisabled] = useState(false);
  const handleSubmitModalDelete = () => {
    event.preventDefault();
    setEliminarButtonDisabled(true);
    const url = `${baseUrl}/eliminar/puestos/${toDelete.id}/`;
    axios
      .delete(url, config)
      .then(({ data }) => {
        console.log(data);
        setEliminarButtonDisabled(false);
        setShowModalDelete(false);
        setToDelete([]);
        CallToast(messageEliminado, "primary");
        actualizar();
      })
      .catch(({ response }) => {
        console.log(response);
        CallToast(messageNegativo, "danger");
        setShowModalDelete(false);
        setToDelete([]);
      });
  };
  const handleDelete = (e, org) => {
    e.preventDefault();
    setToDelete(org);
    setShowModalDelete(true);
  };
  /* FinModal Eliminar organización */

  /* Notificación Push */
  const [mostrar, setMostrar] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  function CallToast(mensaje, tipo) {
    setTipo(tipo);
    setMensaje(mensaje);
    setMostrar(true);
    setTimeout(() => {
      setMostrar(false);
    }, 5100);
  }
  /* FIN Notificación Push */

  const [filteredOrganizations, setFilteredOrganizations] = useState([]);

  useEffect(() => {
    const value = formState.searchText;
    let updatedData = [];
    let aux = [];
    /* setTextSearched(searchText); */
    if (value.length) {
      const filterFirstName =
        organizaciones &&
        organizaciones.filter((item) => {
          const filter = item.puesto
            .toLowerCase()
            .includes(value.toLowerCase());

          return filter ? filter : null;
        });

      /* const filterLastName =
                egresados &&
                egresados.filter((item) => {
                    const filter = item.apellidos
                        .toLowerCase()
                        .includes(value.toLowerCase());

                    return filter ? filter : null;
                });

            const result = filterFirstName
                ? filterFirstName.concat(filterLastName)
                : aux; */
      updatedData = filterFirstName.reduce((acc, item) => {
        if (!acc.includes(item)) {
          acc.push(item);
        }
        return acc;
      }, []);
      setFilteredOrganizations(updatedData);
    } else {
      setFilteredOrganizations(organizaciones);
    }
  }, [organizaciones, formState.searchText]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container-fluid mt-2 text-secondary">
            <h3>
              <i className="bi bi-person-workspace"></i> Puestos de Trabajo
            </h3>
            <hr />

            <Button variant="secondary" onClick={handleShow}>
              <i className="bi bi-plus-circle"></i> Agregar Puesto
            </Button>
            {filteredOrganizations.length ? (
              <Form className="my-3">
                <input
                  type="text"
                  placeholder="Busca un Puesto de Trabajo"
                  className="form-control"
                  name="searchText"
                  autoComplete="off"
                  value={formState.searchText}
                  onChange={onInputChange}
                />
              </Form>
            ) : null}

            {filteredOrganizations.length ? (
              <TablaPuestos
                puestos={filteredOrganizations}
                handleChangeOrganizacion={handleChangeOrganizacion}
                handleDelete={handleDelete}
              />
            ) : (
              "No hay puestos"
            )}
          </div>

          <ModalEditPuestos
            show={show}
            handleClose={handleClose}
            formState={formState}
            onInputChange={onInputChange}
            addMode={addMode}
            handleSubmit={handleSubmit}
            showAlert={showAlert}
            waitAxios={waitAxios}
          />

          <ModalDeletePuestos
            showModalDelete={showModalDelete}
            handleCloseModalDelete={handleCloseModalDelete}
            eliminarButtonDisabled={eliminarButtonDisabled}
            toDelete={toDelete}
            handleSubmitModalDelete={handleSubmitModalDelete}
          />

          <ToastNotificacionPush
            mensaje={mensaje}
            mostrar={mostrar}
            tipo={tipo}
          />
        </>
      )}
    </>
  );
};
