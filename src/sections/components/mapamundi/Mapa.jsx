import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { getCiudadesByActividadActual } from "../../helpers/getCiudadesByActividadActual";
import { getArrayForMapamundi } from "../../helpers/getArrayForMapamundi";

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

    console.log("arraycompleto", arrayCompleto);

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
                                Ciudad: {ciudad[0]}
                                <br /> Cantidad de ingenieros: {ciudad[2]}
                            </Popup>
                        </Marker>
                    </>
                ))}
            </MapContainer>
        </>
    );
};
