import React from "react";
import { getCantidadEgrConPostgrados } from "../../egresados/helpers/getCantidadEgrConPostgrados";
import { Pie } from "react-chartjs-2";

export const TortaEgrConPostgrados = ({ datos }) => {
    let [con, sin] = getCantidadEgrConPostgrados(datos);
    let total = con + sin;
    let percentCon = Math.trunc((1000 * con) / total) / 10;
    let percentSin = Math.trunc((1000 * sin) / total) / 10;

    const data = {
        labels: [
            `Egresados con postgrados: ${percentCon}%`,
            `Egresados sin postgrados: ${percentSin}%`,
        ],
        datasets: [
            {
                label: `Cantidad`,
                data: [con, sin],
                backgroundColor: [
                    "rgba(236, 170, 4, 0.2)",
                    "rgba(0, 0, 0, 0.2)",
                ],
                borderColor: ["rgba(236, 170, 4, 1)", "rgba(0, 0, 0, 1)"],
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
