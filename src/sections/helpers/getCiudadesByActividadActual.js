/* Este método te devuelve un array con binomios, donde el primer elemento del binomio es la ciudad, 
y el segundo elemento es la cantidad de egresados en dicha ciudad. 
Ej: [ [Formosa,5], [Madrid,1] ]
*/
/* OBS: Se puede mandar actividad sin que sean actuales. */
export const getCiudadesByActividadActual = (data) => {
    let arreglo = [];
    data.map((act) => {
        let c = arreglo.filter((elemento) => elemento[0] === act.ciudad.ciudad);
        let index = arreglo.findIndex(
            (elemento) => elemento[0] === act.ciudad.ciudad
        );

        if (c.length != 0) {
            let [a, b] = arreglo[index];
            arreglo[index] = [a, b + 1];
        } else {
            arreglo.push([act.ciudad.ciudad, 1]);
        }
    });
    return arreglo;
};
