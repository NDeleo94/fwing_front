import React, { Fragment, useEffect } from "react";
import { Image } from "react-bootstrap";
import Logo from "../../../../assets/imgs/Logo.png";
import { Link } from "react-router-dom";

export const EgresadosEnCiudad = ({ ciudad }) => {
    let urlRandom = [...ciudad[3]];

    for (let i = urlRandom.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [urlRandom[i], urlRandom[j]] = [urlRandom[j], urlRandom[i]];
    }

    return (
        <div className="text-center">
            Ciudad: {ciudad[0]}
            <br />
            Cantidad de ingenieros: {ciudad[2]}
            <br />
            {urlRandom.map((foto, index) => (
                <Fragment key={index}>
                    {index < 3 && ( // aquí pongo el límite para que me muestre solo 3 egresados por ciudad
                        <>
                            <Link to={`/perfil/${ciudad[3].id}`}>
                                <Image
                                    src={
                                        ciudad[3].length < 4 // Para evitar que se repitan fotos si hay menos de 4 ingenieros en esa ciudad
                                            ? foto.url == "Logo" // Corrijo para que pueda aparecer el logo
                                                ? Logo
                                                : foto.url
                                            : urlRandom[index] == "Logo"
                                                ? Logo
                                                : urlRandom[index]
                                    }
                                    style={{
                                        width: "45px",
                                        height: "auto",
                                    }}
                                    thumbnail
                                    className={
                                        index == 0 || index == 2 ? "" : "m-1"
                                    }
                                />
                            </Link>
                        </>
                    )}
                </Fragment>
            ))}
        </div>
    );
};
