import React, { useEffect, useState } from "react";
import Logo from "../../assets/imgs/Logo.png";
import { Link } from "react-router-dom";

export const EgresadoCard = ({
    id,
    nombres,
    apellidos,
    ciudad_natal,
    historial,
    fecha_nac,
    imagen,
}) => {
    const [edad, setEdad] = useState("");
    useEffect(() => {
        if (fecha_nac) {
            let anio = fecha_nac.split("-");
            setEdad(2023 - anio[0]);
        }
    }, []);

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
            <div className="col animate__animated animate__fadeIn">
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col-4 d-grid mx-auto">
                            <img
                                src={urlPerfilPhoto()}
                                style={{ width: "100%", height: "auto" }}
                                className="card-img"
                                alt="superhero"
                            />
                        </div>

                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">{`${apellidos}, ${nombres}`}</h5>
                                <p className="card-text">
                                    {ciudad_natal && (
                                        <>
                                            de {ciudad_natal.ciudad} <br />
                                        </>
                                    )}
                                    {edad} años
                                    <br />
                                    {historial.lenght > 0 &&
                                        `Trabajó en: ${historial[0].organizacion.organizacion} `}
                                </p>
                                <Link to={`/perfil/${id}`}>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                    >
                                        Más...
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
