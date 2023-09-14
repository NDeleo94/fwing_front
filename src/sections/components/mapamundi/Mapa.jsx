import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { getCiudadesByActividadActual } from "../../helpers/getCiudadesByActividadActual";

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
                setCoordenadasSimples(
                    data.resourceSets[0].resources[0].geocodePoints[0]
                        .coordinates
                );
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(actividadesActuales);
    useEffect(() => {
        if (actividadesActuales != []) {
            console.log("first");
            let superArray = [];
            let arreglo = getCiudadesByActividadActual(actividadesActuales);
            arreglo.map((a) => {
                axios
                    .get(`${urlBingMaps}/${a[0]}?o=json&key=${keyBingMaps}`)
                    .then(({ data }) => {
                        superArray.push([
                            a[0],
                            a[1],
                            data.resourceSets[0].resources[0].geocodePoints[0]
                                .coordinates,
                        ]);
                        console.log(superArray);
                        if (a[0] == arreglo[arreglo.length - 1][0]) {
                            console.log("third");
                            setArrayCompleto(superArray);
                        }
                    })
                    .catch((error) => console.log(error));
            });
            console.log("superarray", superArray);
            /* if (arrayCompleto == []) {
                console.log("second");
                setArrayCompleto(superArray);
            } */
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
                        <Marker position={ciudad[2]}>
                            <Popup>
                                Ciudad: {ciudad[0]}
                                <br /> Cantidad de ingenieros: {ciudad[1]}
                            </Popup>
                        </Marker>
                    </>
                ))}
            </MapContainer>
        </>
    );
};
