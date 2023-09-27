export const getCantidadEgrConPostgrados = (datos) => {
    let cantidad = 0;
    let cantidadSin = 0;
    datos.map((egresado) => {
        let bandera = 0;
        egresado.egresos.map((e) => {
            if (e.postgrado) {
                bandera = 1;
            }
        });
        if (bandera == 1) {
            cantidad++;
        } else {
            cantidadSin++;
        }
    });
    return [cantidad, cantidadSin];
};
