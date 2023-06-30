import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import Logo from "../../assets/imgs/Logo.png";

export const ToastNotificacionPush = ({ mensaje, mostrar, tipo = "primary" }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(mostrar);
    }, [mostrar]);

    return (
        <>
            <ToastContainer className="p-3 position-fixed bottom-0 end-0">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={5000}
                    autohide
                    bg={tipo}
                >
                    <Toast.Header>
                        <img
                            src={Logo}
                            alt=""
                            width="20"
                            height="20"
                            className="d-inline-block align-text-top"
                        />
                        <strong className="me-auto">Following</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body className="text-white">{mensaje}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};
