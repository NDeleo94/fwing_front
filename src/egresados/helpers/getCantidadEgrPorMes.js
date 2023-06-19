export const getCantidadEgrPorMes = (data, mes, anio) => {
  let cantidad = 0;
  console.log(anio)
  data.map((egre) => {
    let anioEgre = parseInt(egre.egresos[0]?.ciclo_egreso?.split("-")[0]);
    let mesEgre = parseInt(egre.egresos[0]?.ciclo_egreso?.split("-")[1]);
    if (
      parseInt(anio) == parseInt(anioEgre) &&
      parseInt(mes) == parseInt(mesEgre)
    ) {
      cantidad++;
    }
  });
  return cantidad;
};
