import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "../hooks/useForm";

export const ConfiguracionPrivacidad = () => {
  const initialForm = {
    puesto: "",
    organizacion: "",
    inicio: "",
    fin: "",
  };
  const { formState, onInputChange } = useForm(initialForm);

  return (
    <>
      <div className="container-fluid mt-2 text-secondary">
        <h3><i className="bi bi-file-earmark-lock2"></i> Privacidad</h3>
        <hr />
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Ocultar mi fecha de nacimiento y edad"
            name="fin"
          />
          <Form.Check
            type="switch"
            id="custom-switch2"
            label="Ocultar mi ciudad actual"
            name="fin"
          />
          <Form.Check
            type="switch"
            id="custom-switch3"
            label="Ocultar mi correo electrónico"
            name="fin"
          />
          <div className="col-12 my-4 d-grid">
            <Button
              type="submit"
            >
              Guardar cambios
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
