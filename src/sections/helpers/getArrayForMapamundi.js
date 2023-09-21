/* Este método devuelve un array donde cada elemento contiene la siguiente información:
    [Nombre Ciudad, [x,y], cantidad de egresados]

    La entrada de data, cada elemento debe tener un atributo llamado "ciudad" 
    donde dentro se encuentra: "ciudad","lat" y "long"
*/

export const getArrayForMapamundi = (data) => {
    let arreglo = [];
    data.map((actividad) => {
        let c = arreglo.filter(
            (elemento) =>
                elemento[1][0] === actividad.ciudad.lat &&
                elemento[1][1] === actividad.ciudad.long
        );
        let index = arreglo.findIndex(
            (elemento) =>
                elemento[1][0] === actividad.ciudad.lat &&
                elemento[1][1] === actividad.ciudad.long
        );

        if (c.length != 0) {
            let [a, b, c] = arreglo[index];
            arreglo[index] = [a, b, c + 1];
        } else {
            arreglo.push([
                actividad.ciudad.ciudad,
                [actividad.ciudad.lat, actividad.ciudad.long],
                1,
            ]);
        }
    });
    console.log(arreglo);
    return arreglo;
};
