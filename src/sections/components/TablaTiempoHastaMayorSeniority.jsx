import React from "react";
import { getDiasEntreFechas } from "../../egresados/helpers/getDiasEntreFechas";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const seniority = [
    { value: null, label: "NS/NC" },
    { value: 1, label: "Trainee" },
    { value: 2, label: "Junior" },
    { value: 3, label: "Semi-Senior" },
    { value: 4, label: "Senior" },
    { value: 5, label: "Director" },
    { value: 6, label: "Vice-Presidente" },
    { value: 7, label: "Jefe" },
];

export const TablaTiempoHastaMayorSeniority = ({ data }) => {
    let aux = [];
    let control = 0;
    let control2 = [];
    // 1- cargo en un vector donde cada elemento es:
    // [valor del nivel máximo, suma de días desde egreso hasta ese nivel, cantidad total de ingenieros que llegaron a ese nivel]
    seniority.map((e) => {
        aux = [...aux, [e.value, 0, 0]];
    });
    // 2- Recorro "data" para encontrar los niveles máximos e ir modificando 'aux'
    data.map((egresado) => {
        let nivelMax = 0;
        let dias = 0;
        egresado.historial.map((actividad) => {
            // 3- Recorro cada actividad de cada egresado
            if (actividad.seniority > nivelMax) {
                // Si la actividad que estoy leyendo es la mayor, cargo en el vector
                nivelMax = actividad.seniority;
                let fechaEgreso = egresado.egresos.filter(
                    (egreso) => egreso.carrera.following
                );
                dias = getDiasEntreFechas(
                    fechaEgreso[0]?.ciclo_egreso,
                    actividad.inicio
                );
            }
            if (actividad.seniority == nivelMax) {
                // Si la actividad que estoy leyendo es igual en nivel, cargo el que tenga mayor días
                let fechaEgreso = egresado.egresos.filter(
                    (egreso) => egreso.carrera.following
                );
                let diasNuevos = getDiasEntreFechas(
                    fechaEgreso[0]?.ciclo_egreso,
                    actividad.inicio
                );
                if (diasNuevos > dias) {
                    dias = diasNuevos;
                }
            }
        });
        if (nivelMax != 0 && dias && dias >= 0) {
            let [a, b, c] = aux[nivelMax];
            aux[nivelMax] = [a, b + dias, c + 1];
        }
    });

    aux.map((a) => {
        // función para evitar dividir por 0
        if (a[2] == 0) {
            a[2] = 1;
        }
    });

    const labels = [
        "NS/NC",
        "Trainee",
        "Junior",
        "Semi-Senior",
        "Senior",
        "Director",
        "Vice-Presidente",
        "Jefe",
    ];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                text: "Promedio de duración de un trabajo en días VS Nivel de trabajo",
            },
        },
    };

    const datos = {
        labels,
        datasets: [
            {
                label: "",
                data: labels.map((ce, index) =>
                    Math.floor(aux[index][1] / aux[index][2])
                ),
                backgroundColor: "rgba(100, 99, 132, 0.5)",
            },
        ],
    };

    return <Bar options={options} data={datos} />;
};
