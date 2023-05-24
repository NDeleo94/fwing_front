import { getCantidadEgrePorAnio } from "../../egresados/helpers/getCantidadEgrPorAnio";
import { useFetchCantidadEgrPorAnio } from "../../egresados/hooks/useFetchCantidadEgrPorAnio";

export const CarreraPage = () => {
  const data2 = useFetchCantidadEgrPorAnio();
  const data = getCantidadEgrePorAnio();
  console.log(data)
  /* const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
  }; */
  return <>CarreraPage</>;
};
