import React from "react";
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
import { getDiasEntreFechas } from "../../egresados/helpers/getDiasEntreFechas";

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

export const TablaTiempoPromedioByNivel = ({ datos }) => {
    let arrayFiltered = [];
    datos.map((d) =>
        d.historial.map(
            (h) =>
                (arrayFiltered = [
                    ...arrayFiltered,
                    [h.seniority, h.inicio, h.fin],
                ])
        )
    );

    let c = [0, 0, 0, 0, 0, 0, 0, 0];
    let s = [0, 0, 0, 0, 0, 0, 0, 0];

    arrayFiltered.map((e) => {
        if (e[0] == null) {
            s[0]++;
            c[0] += getDiasEntreFechas(e[1], e[2]);
        } else {
            s[e[0]]++;
            c[e[0]] += getDiasEntreFechas(e[1], e[2]);
        }
    });
    s.map((a, index) => {
        if (a == 0) {
            s[index] = 1;
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
                display: true,
                text: "Promedio de duración de un trabajo en días VS Nivel de trabajo",
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: "",
                data: labels.map((ce, index) =>
                    Math.floor(c[index] / s[index])
                ),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return <Bar options={options} data={data} />;
};
