import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getCantidadEgrePorAnio } from "../../egresados/helpers/getCantidadEgrPorAnio";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const TablaEgrePorAnio = ({ datos }) => {
    const labels = [
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
    ];
    const data = {
        labels,
        datasets: [
            {
                label: "Egresados por Año",
                data: labels.map((anio) => getCantidadEgrePorAnio(datos, anio)),
                borderColor: "rgb(246,180,14)",
                backgroundColor: "rgba(236, 170, 4, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                text: "Egresados de Ingeniería en Computación por Año",
            },
        },
    };

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
};
