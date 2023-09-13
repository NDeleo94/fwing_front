import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { getCiudadesByActividadActual } from "../../helpers/getCiudadesByActividadActual";

export const Mapa = () => {
    const urlBase = import.meta.env.VITE_URL_LOCAL;
    const keyBingMaps = import.meta.env.VITE_KEY_BING_MAPS;
    const urlBingMaps = import.meta.env.VITE_URL_BING_MAPS;
    console.log(urlBingMaps);
    const [actividadesActuales, setActividadesActuales] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [coordenadasSimples, setCoordenadasSimples] = useState([0,0])
    useEffect(() => {
        axios
            .get(`${urlBase}/actividades/`)
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
        axios
            .get(`${urlBingMaps}/Tafí Viejo?o=json&key=${keyBingMaps}`)
            .then(({ data }) => {
                setCoordenadasSimples(data.resourceSets[0].resources[0].geocodePoints[0].coordinates);
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(actividadesActuales);
    useEffect(() => {
        if (actividadesActuales) {
            let arreglo = getCiudadesByActividadActual(actividadesActuales);
            console.log(arreglo);
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
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={coordenadasSimples}>
                    <Popup>
                        '-26.5643582', lon: '-64.882397' A pretty CSS3 popup.{" "}
                        -26.8303703', lon: '-65.2038133
                        <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};
