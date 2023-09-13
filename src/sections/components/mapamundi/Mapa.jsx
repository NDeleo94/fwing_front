import axios from "axios";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export const Mapa = () => {
    const urlBase = import.meta.env.VITE_URL_LOCAL;
    useEffect(() => {
        console.log("first")
        axios
            .get(`${urlBase}/actividades/`)
            .then(({ data }) => {
                console.log(data)
                let actActual = [];
                data.map((a) => {
                    if (!a.fin) {
                        actActual = [...actActual, a];
                    }
                });
                console.log(actActual);
            })
            .catch((error) => console.log(error));
    }, []);

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
            </MapContainer>
        </>
    );
};
