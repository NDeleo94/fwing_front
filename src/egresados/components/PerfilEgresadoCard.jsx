import React, { useEffect, useState } from "react";
import Logo from "../../assets/imgs/Logo.png";
import { Image } from "react-bootstrap";

export const PerfilEgresadoCard = ({
    nombres,
    egresos,
    ciudad_natal,
    imagen,
}) => {
    const [primeraCarrera, setPrimeraCarrera] = useState(null);

    useEffect(() => {
        if (egresos) {
            setPrimeraCarrera(egresos[egresos.length - 1].carrera.carrera);
        }
    }, [egresos]);

    const urlPerfilPhoto = () => {
        if (imagen.length == 0) {
            return Logo;
        }
        if (imagen[0]?.file) {
            return `${import.meta.env.VITE_URL_PHOTO}${
                imagen[0].file
            }`;
        } else {
            return imagen[0]?.url;
        }
    };

    return (
        <>
            <div className="card border-primary mb-3">
                <div className="card-header">
                    <Image src={urlPerfilPhoto()} thumbnail />
                </div>
                <div className="card-body text-center">
                    <h3 className="card-title text-primary">{nombres}</h3>
                    <h4 className="card-title">{primeraCarrera}</h4>
                    <h5 className="card-title">{ciudad_natal}</h5>
                </div>
            </div>
        </>
    );
};
