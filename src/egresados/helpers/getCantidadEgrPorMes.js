export const getCantidadEgrPorMes = (data, mes, anio) => {
  let cantidad = 0;
  data.map((egre) => {
    let anioEgre = parseInt(egre.egresos[egre.egresos.length-1]?.ciclo_egreso?.split("-")[0]);
    let mesEgre = parseInt(egre.egresos[egre.egresos.length-1]?.ciclo_egreso?.split("-")[1]);
    if (
      parseInt(anio) == parseInt(anioEgre) &&
      parseInt(mes) == parseInt(mesEgre)
    ) {
      cantidad++;
    }
  });
  return cantidad;
};
