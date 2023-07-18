import { getCantidadEgrPorMes } from "./getCantidadEgrPorMes.js";

export const getCantidadEgrePorAnio = (data, anio) => {
    let cantidad = 0;
    let cantidadegresados = 0;
    let cantidadantes = 0;
    let cantidadadespues = 0;
    let inicioAcademico = "4-15";
    let mesInicio = parseInt(inicioAcademico.split("-")[0]);
    let diaInicio = parseInt(inicioAcademico.split("-")[1]);

    data.forEach((egresado) => {
        cantidadegresados++;
        let anioEgre = parseInt(
            egresado.egresos[egresado.egresos.length - 1]?.ciclo_egreso?.split(
                "-"
            )[0]
        );
        let mesEgre = parseInt(
            egresado.egresos[egresado.egresos.length - 1]?.ciclo_egreso?.split(
                "-"
            )[1]
        );
        let diaEgre = parseInt(
            egresado.egresos[egresado.egresos.length - 1]?.ciclo_egreso?.split(
                "-"
            )[2]
        );

        if (anioEgre == anio || anioEgre == parseInt(anio) + 1) {
            if (anioEgre == anio && mesEgre > mesInicio) {
                cantidad++;
                cantidadadespues++;
            }
            if (
                anioEgre == anio &&
                mesEgre == mesInicio &&
                diaEgre >= diaInicio
            ) {
                cantidad++;
                cantidadadespues++;
            }
            if (anioEgre == parseInt(anio) + 1 && mesEgre < mesInicio) {
                cantidad++;
                cantidadantes++;
            }
            if (
                anioEgre == parseInt(anio) + 1 &&
                mesEgre == mesInicio &&
                diaEgre < diaInicio
            ) {
                cantidad++;
                cantidadantes++;
            }
        }
    });
    return cantidad;
};
/* el que está comentado es cantidad de egresados por año calendario. 
    let cantidad = 0;
  for (let index = 1; index < 13; index++) {
    cantidad = cantidad + getCantidadEgrPorMes(data, index, anio);
  }
  return cantidad; */
