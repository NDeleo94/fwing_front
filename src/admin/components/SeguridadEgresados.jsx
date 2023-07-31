import React from "react";
import { Button, Form } from "react-bootstrap";

export const SeguridadEgresados = ({ egresado }) => {
    console.log(egresado);
    return (
        <>
            <div className="container-fluid mt-2 text-secondary">
                <h3>
                    <i className="bi bi-shield-lock"></i> Seguridad
                </h3>
                <hr />
                <h5>Cambiar e-mail</h5>
                <Form>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Correo Electrónico Actual</Form.Label>
                        <Form.Control
                            type="email"
                            /* value={formState?.email}
                            onChange={onInputChange} */
                            name="email"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail2">
                        <Form.Label>Correo Electrónico Nuevo</Form.Label>
                        <Form.Control
                            type="email"
                            /* value={formState?.email}
                            onChange={onInputChange} */
                            name="email"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail3">
                        <Form.Label>Repita Correo Electrónico Nuevo</Form.Label>
                        <Form.Control
                            type="email"
                            /* value={formState?.email}
                            onChange={onInputChange} */
                            name="email"
                            required
                        />
                    </Form.Group>
                    <div className="col-12 my-4 d-grid">
                        <Button
                            type="submit"
                            /* onClick={handleSubmit}
                                    disabled={SeCambioAlgo(original, formState)} */
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </Form>
                <hr />
                <h5>Cambiar contraseña</h5>
                <Form>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Contraseña Actual</Form.Label>
                        <Form.Control
                            type="email"
                            /* value={formState?.email}
                            onChange={onInputChange} */
                            name="email"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail2">
                        <Form.Label>Contraseña Nueva</Form.Label>
                        <Form.Control
                            type="email"
                            /* value={formState?.email}
                            onChange={onInputChange} */
                            name="email"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail3">
                        <Form.Label>Repita Contraseña Nueva</Form.Label>
                        <Form.Control
                            type="email"
                            /* value={formState?.email}
                            onChange={onInputChange} */
                            name="email"
                            required
                        />
                    </Form.Group>
                    <div className="col-12 my-4 d-grid">
                        <Button
                            type="submit"
                            /* onClick={handleSubmit}
                                    disabled={SeCambioAlgo(original, formState)} */
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};
