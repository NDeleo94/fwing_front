import React from "react";
import { getCantidadEgrPorSexo } from "../../egresados/helpers/getCantidadEgrPorSexo";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const TortaDistribucionEgrePorSexo = ({ datos }) => {
    let c = getCantidadEgrPorSexo(datos);
    let t = c[1]+c[0];
    let percentM = Math.trunc(1000*c[1]/t)/10;
    let percentV = Math.trunc(1000*c[0]/t)/10;
    
    const data = {
        labels: [`Mujeres: ${percentM}%`, `Varones: ${percentV}%`, `Otro`],
        datasets: [
            {
                label: `Cantidad`,
                data: [c[1], c[0], 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Pie data={data} />
        </>
    );
};

