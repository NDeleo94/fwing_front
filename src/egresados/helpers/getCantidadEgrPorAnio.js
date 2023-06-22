import { getCantidadEgrPorMes } from "./getCantidadEgrPorMes.js";

export const getCantidadEgrePorAnio = (data, anio) => {
  let cantidad = 0;
  for (let index = 1; index < 13; index++) {
    cantidad = cantidad + getCantidadEgrPorMes(data, index, anio);
  }
  return cantidad;
};
