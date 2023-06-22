export const controlFormatoFecha = (fecha = "") => {
  if (fecha) {
    if (fecha.length != 10) {
      return false;
    }
    return true;
  }
  return false;
};

export const convertirFecha = (fecha) => {
  if (controlFormatoFecha(fecha)) {
    const anio = fecha.slice(0, 4);
    const mes = fecha.slice(5, 7);
    const dia = fecha.slice(8, 10);

    return `${dia}/${mes}/${anio}`;
  }
  return `No se ingreso fecha`;
};

export const separarFecha = (fecha) => {
  if (controlFormatoFecha(fecha)) {
    const anio = fecha.slice(0, 4);
    const mes = fecha.slice(5, 7);
    const dia = fecha.slice(8, 10);

    return { anio, mes, dia };
  }
  return `No se ingreso fecha`;
};
