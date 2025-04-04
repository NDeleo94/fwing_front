import { Pie } from "react-chartjs-2";

const label = [
    "NS/NC",
    "Trainee",
    "Junior",
    "Semi-Senior",
    "Senior",
    "Director",
    "Vice-Presidente",
    "Jefe",
];

export const TablaDistribEgrByNivelActual = ({ datos }) => {
    let arrayFiltered = [0, 0, 0, 0, 0, 0, 0, 0];
    datos.map((egresado) => {
        egresado.historial.map((actividad) => {
            if (!actividad.fin) {
                if (actividad.seniority == null) {
                    arrayFiltered[0]++;
                } else {
                    arrayFiltered[actividad.seniority]++;
                }
            }
        });
    });

    let suma = 0;
    for (let i = 0; i < arrayFiltered.length; i++) {
        suma += arrayFiltered[i];
    }

    const data = {
        labels: [
            `NS/NC : ${Math.trunc((1000 * arrayFiltered[0]) / suma) / 10}%`,
            `Trainee : ${Math.trunc((1000 * arrayFiltered[1]) / suma) / 10}%`,
            `Junior : ${Math.trunc((1000 * arrayFiltered[2]) / suma) / 10}%`,
            `Semi-Senior : ${
                Math.trunc((1000 * arrayFiltered[3]) / suma) / 10
            }%`,
            `Senior : ${Math.trunc((1000 * arrayFiltered[4]) / suma) / 10}%`,
            `Director : ${Math.trunc((1000 * arrayFiltered[5]) / suma) / 10}%`,
            `Vice-Presidente : ${
                Math.trunc((1000 * arrayFiltered[6]) / suma) / 10
            }%`,
            `Jefe : ${Math.trunc((1000 * arrayFiltered[7]) / suma) / 10}%`,
        ],
        datasets: [
            {
                label: `Cantidad`,
                data: [...arrayFiltered],
                backgroundColor: [
                    "rgba(255,255,255, 0.2)",
                    "rgba(225,225,255, 0.2)",
                    "rgba(200,200,255, 0.2)",
                    "rgba(165,165,255, 0.2)",
                    "rgba(135,135,255, 0.2)",
                    "rgba(100,100,255, 0.2)",
                    "rgba(45,45,255, 0.2)",
                    "rgba(0, 0, 255, 0.2)",
                ],
                borderColor: [
                    "rgba(255,255,255, 1)",
                    "rgba(225,225,255, 1)",
                    "rgba(200,200,255, 1)",
                    "rgba(165,165,255, 1)",
                    "rgba(135,135,255, 1)",
                    "rgba(100,100,255, 1)",
                    "rgba(45,45,255, 1)",
                    "rgba(0, 0, 255, 1)",],
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
