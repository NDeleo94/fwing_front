import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { getCiudadesByActividadActual } from "../../helpers/getCiudadesByActividadActual";
import { getArrayForMapamundi } from "../../helpers/getArrayForMapamundi";
import { Image } from "react-bootstrap";
import Logo from "../../../assets/imgs/Logo.png";

export const Mapa = () => {
    const urlBase = import.meta.env.VITE_URL_LOCAL;
    const keyBingMaps = import.meta.env.VITE_KEY_BING_MAPS;
    const urlBingMaps = import.meta.env.VITE_URL_BING_MAPS;

    const [actividadesActuales, setActividadesActuales] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [coordenadasSimples, setCoordenadasSimples] = useState([0, 0]);
    const [arrayCompleto, setArrayCompleto] = useState([]);

    useEffect(() => {
        axios
            .get(`${urlBase}/mapamundi/`)
            .then(({ data }) => {
                setActividades(data);
                let actActual = [];
                data.map((a) => {
                    if (!a.fin) {
                        actActual = [...actActual, a];
                    }
                });
                setActividadesActuales(actActual);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (actividadesActuales) {
            setArrayCompleto(getArrayForMapamundi(actividadesActuales));
        }
    }, [actividadesActuales]);

    return (
        <>
            <MapContainer
                center={[30, 0]}
                zoom={2}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "600px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {arrayCompleto.map((ciudad) => (
                    <>
                        <Marker position={ciudad[1]}>
                            <Popup>
                                <div className="text-center">
                                    Ciudad: {ciudad[0]}
                                    <br />
                                    Cantidad de ingenieros: {ciudad[2]}
                                    <br />
                                    {ciudad[3].map((foto, index) => (
                                        <>
                                            {index < 3 && ( // aquí pongo el límite para que me muestre solo 3 egresados por ciudad
                                                <>
                                                    <Image
                                                        src={
                                                            ciudad[3].length < 4 // Para evitar que se repitan fotos si hay menos de 4 ingenieros en esa ciudad
                                                                ? foto == "Logo" // Corrijo para que pueda aparecer el logo
                                                                    ? Logo
                                                                    : foto
                                                                : ciudad[3][
                                                                      Math.floor(
                                                                          Math.random() *
                                                                              ciudad[3]
                                                                                  .length
                                                                      )
                                                                  ] == "Logo"
                                                                ? Logo
                                                                : ciudad[3][ // En caso de que haya más de 3 ingenieros, los elige al azar de forma independiente (pueden repetirse)
                                                                      Math.floor(
                                                                          Math.random() *
                                                                              ciudad[3]
                                                                                  .length
                                                                      )
                                                                  ]
                                                        }
                                                        style={{
                                                            width: "45px",
                                                            height: "auto",
                                                        }}
                                                        thumbnail
                                                        className={
                                                            index == 0 ||
                                                            index == 2
                                                                ? ""
                                                                : "m-1"
                                                        }
                                                    />
                                                </>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </Popup>
                        </Marker>
                    </>
                ))}
            </MapContainer>
        </>
    );
};
