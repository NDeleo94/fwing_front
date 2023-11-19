import Logo from "../../../assets/imgs/Logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { useConfig } from "../../../auth/hooks/useConfig";
import { Alert, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { ToastNotificacionPush } from "../ToastNotificacionPush";
import { useNavigate } from "react-router";
import CreatableSelect from "react-select/creatable";
import { LoginContext } from "../../../context/LoginContext";
import { FormFoto } from "./components/FormFoto";
import { FormDataEgresado } from "./components/FormDataEgresado";
import { ModalFoto } from "./components/ModalFoto";

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
      .then(({ data }) => {
        setDatoEgresado(data);
        setFormState({
          ...formState,
          email: data.email || "",
          nacionalidad: data.nacionalidad || "",
          fecha_nac: data.fecha_nac || "",
          ciudad_natal: {
            label: data.ciudad_natal.ciudad || "",
            value: data.ciudad_natal.id || "",
          },
          ciudad_actual: {
            label: data.ciudad_actual.ciudad || "",
            value: data.ciudad_actual.id || "",
          },
          sexo: data.sexo || "",
        });
      })
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
  }, [actualizador]);
  /* FIN Prueba actualizador */
  const initialForm = {
    nombres: datoEgresado?.nombres || "",
    apellidos: datoEgresado?.apellidos || "",
    dni: datoEgresado?.dni || "",
    email: datoEgresado?.email || "",
    nacionalidad: datoEgresado?.nacionalidad || "",
    fecha_nac: datoEgresado?.fecha_nac || "",
    ciudad_natal: {
      label: datoEgresado?.ciudad_natal?.ciudad || "",
      value: datoEgresado?.ciudad_natal?.id || "",
    },
    ciudad_actual: {
      label: datoEgresado?.ciudad_actual?.ciudad || "",
      value: datoEgresado?.ciudad_actual?.id || "",
    },
    sexo: datoEgresado?.sexo || "",
  };

  const urlPerfilPhoto = () => {
    if (datoEgresado.imagen.length == 0) {
      return Logo;
    }
    if (datoEgresado.imagen[0]?.file) {
      return `${import.meta.env.VITE_URL_PHOTO}${datoEgresado.imagen[0].file}`;
    } else {
      return datoEgresado.imagen[0]?.url;
    }
  };

  const { formState, onInputChange, setFormState } = useForm(initialForm);

  const urlBase = import.meta.env.VITE_URL_LOCAL;
  const config = useConfig();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (EstaCompleto()) {
      formState.ciudad_natal.value
        ? (formState.ciudad_natal = formState.ciudad_natal.value)
        : (formState.ciudad_natal = formState.ciudad_natal.label);
      formState.ciudad_actual.value
        ? (formState.ciudad_actual = formState.ciudad_actual.value)
        : (formState.ciudad_actual = formState.ciudad_actual.label);

      const url = `${urlBase}/editar/egresados/${egresado.id}/`;
      axios
        .put(url, formState, config)
        .then(({ data }) => {
          console.log(data);
          Actualizar();
        })
        .catch(({ response }) => console.log(response.data));
    } else {
      setShowAlert(true);
    }
    setMessage(mensaje);
    setShow(true);
  };

  function EstaCompleto() {
    if (formState.ciudad_actual == null) {
      return false;
    }
    if (formState.ciudad_natal == null) {
      return false;
    }
    return (
      formState.email &&
      formState.nacionalidad &&
      formState.fecha_nac &&
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
    if (changed.ciudad_actual == null) {
      return false;
    }
    if (changed.ciudad_natal == null) {
      return false;
    }
    return (
      initial.email == changed.email &&
      initial.nacionalidad == changed.nacionalidad &&
      initial.fecha_nac == changed.fecha_nac &&
      initial.ciudad_natal.label == changed.ciudad_natal.label &&
      initial.ciudad_actual.label == changed.ciudad_actual.label &&
      initial.sexo == changed.sexo
    );
  }

  /* Inicio Input-Select */
  const createOption = (label, id) => ({
    label,
    value: id,
  });

  const [isLoadingSelect_natal, setIsLoadingSelect_natal] = useState(false);
  const [isLoadingSelect_actual, setIsLoadingSelect_actual] = useState(false);
  const [options, setOptions] = useState([]); // setea las opciones por defecto
  const handleCreateSelect_natal = (inputValue) => {
    setIsLoadingSelect_natal(true);
    setTimeout(() => {
      const newOption = createOption(inputValue); // crea la nueva opción
      setIsLoadingSelect_natal(false); // saca el loading
      setOptions((prev) => [...prev, newOption]); // lo agrega a las opciones de arriba
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
          <i className="bi bi-file-earmark-person"></i> Datos Personales
        </h3>
        <hr />
        <FormFoto
          egresado={egresado}
          tokenGoogle={tokenGoogle}
          urlPerfilPhoto={urlPerfilPhoto}
          handleDeletePhoto={handleDeletePhoto}
          handleUploadPhoto={handleUploadPhoto}
          handleUploadPhotoGoogle={handleUploadPhotoGoogle}
        />
        <hr />
        {/* react-bootstrap */}
        <FormDataEgresado
          egresado={egresado}
          formState={formState}
          onInputChange={onInputChange}
          isLoadingSelect_natal={isLoadingSelect_natal}
          isLoadingSelect_actual={isLoadingSelect_actual}
          handleCreateSelect_natal={handleCreateSelect_natal}
          handleCreateSelect_actual={handleCreateSelect_actual}
          options={options}
          showAlert={showAlert}
          handleSubmit={handleSubmit}
          NoHayCambios={NoHayCambios}
          initialForm={initialForm}
        />

        <ToastNotificacionPush mensaje={message} mostrar={show} />

        <ModalFoto
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleSubmitModal={handleShowModal}
          mensajeModal={mensajeModal}
          tipoModal={tipoModal}
          confirmarModal={confirmarModal}
        />
      </div>
    </>
  );
};
