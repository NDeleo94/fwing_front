export const getDiasEntreFechas = (inicio, fin = null) => {
    // Parsea la fecha dada en el formato "YYYY-MM-DD"
    const fechaDada = new Date(inicio);

    // Obtiene la fecha actual
    let fechaActual;
    if (fin) {
        fechaActual = new Date(fin);
    } else {
        fechaActual = new Date();
    }

    // Calcula la diferencia en milisegundos
    const diferenciaMilisegundos = fechaActual - fechaDada;

    // Convierte la diferencia en días
    const diferenciaDias = Math.floor(
        diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    );

    return diferenciaDias;
};
