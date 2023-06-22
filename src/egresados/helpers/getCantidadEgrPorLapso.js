import { getCantidadEgrePorAnio } from "./getCantidadEgrPorAnio";
import { getCantidadEgrPorMes } from "./getCantidadEgrPorMes";

export const getCantidadEgrPorLapso = (
  data,
  inicioAnio,
  inicioMes,
  finAnio,
  finMes
) => {
  let cantidad = 0;
  // Si es el mismo mes y el mismo anio:
  if (inicioAnio == finAnio && inicioMes == finMes) {
    return getCantidadEgrPorMes(data, inicioMes, inicioAnio);
  }

  // Si están al revés, lo doy vuelta
  if (inicioAnio > finAnio || (inicioMes > finMes && inicioAnio == finAnio)) {
    let auxMes = inicioMes;
    let auxAnio = inicioAnio;
    inicioAnio = finAnio;
    inicioMes = finMes;
    finAnio = auxAnio;
    finMes = auxMes;
  }

  // Si es el mismo anio pero distintos meses
  if (inicioAnio == finAnio && inicioMes != finMes) {
    for (let i = inicioMes; i <= finMes; i++) {
      cantidad = cantidad + getCantidadEgrPorMes(data, i, inicioAnio);
    }
    return cantidad;
  }

  // Si no es ningún caso anterior, empiezo sumando los meses del anio inicio [inicioMes a Diciembre]
  for (let i = inicioMes; i <= 12; i++) {
    cantidad = cantidad + getCantidadEgrPorMes(data, i, inicioAnio);
  }
  // luego sumo los meses del anio fin [enero a finMes]
  for (let i = 1; i <= finMes; i++) {
    cantidad = cantidad + getCantidadEgrPorMes(data, i, finAnio);
  }

  // Si hay más de 2 años de diferencia, sumo los anios en el medio
  if (finAnio - inicioAnio >= 2) {
    for (let i = inicioAnio + 1; i < finAnio; i++) {
      cantidad = cantidad + getCantidadEgrePorAnio(data, i);
    }
  }

  return cantidad;
};
