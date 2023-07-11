import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/imgs/Logo.png";
import { Image } from "react-bootstrap";
import { LoginContext } from "../../context/LoginContext";

export const PerfilEgresadoCard = ({
    nombres,
    egresos,
    ciudad_natal,
    imagen,
    privacidad,
}) => {
    const { user } = useContext(LoginContext);
    const [primeraCarrera, setPrimeraCarrera] = useState(null);
    const [privacity, setPrivacity] = useState(null);

    useEffect(() => {
        if (egresos) {
            setPrimeraCarrera(egresos[egresos.length - 1].carrera.carrera);
        }
        if (!privacidad) {
            setPrivacity({ ciudad_natal: true });
        } else {
            setPrivacity(privacidad);
        }
    }, [egresos]);

    const urlPerfilPhoto = () => {
        if (imagen.length == 0) {
            return Logo;
        }
        if (imagen[0]?.file) {
            return `${import.meta.env.VITE_URL_PHOTO}${imagen[0].file}`;
        } else {
            return imagen[0]?.url;
        }
    };
    return (
        <>
            <div className="card border-primary mb-3">
                <div className="card-header">
                    <Image
                        src={urlPerfilPhoto()}
                        style={{ width: "100%", height: "auto" }}
                        thumbnail
                    />
                </div>
                <div className="card-body text-center">
                    <h3 className="card-title text-primary">{nombres}</h3>
                    <h4 className="card-title">{primeraCarrera}</h4>
                    {(privacity?.ciudad_natal || user?.is_admin) && (
                        <h5
                            className={
                                !privacity?.ciudad_natal
                                    ? "card-title text-bg-danger"
                                    : "card-title"
                            }
                        >
                            {ciudad_natal}
                        </h5>
                    )}
                </div>
            </div>
        </>
    );
};

/* {privacidad?.ciudad_natal && user?.is_admin ? (
                        <h5
                            className={
                                !privacidad?.ciudad_natal
                                    ? "card-title"
                                    : "card-title text-bg-danger"
                            }
                        >
                            {ciudad_natal}
                        </h5>
                    ) : (
                        ""
                    )} */
