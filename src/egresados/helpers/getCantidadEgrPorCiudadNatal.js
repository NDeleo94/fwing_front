export const getCantidadEgrPorCiudadNatal = (data) => {
    let arreglo = [];
    data.map((egre) => {
        let c = arreglo.filter((bi) => bi[0] === egre.ciudad_natal);
        let index = arreglo.findIndex((bi) => bi[0] === egre.ciudad_natal);

        if (c.length != 0) {
            let [a, b] = arreglo[index];
            arreglo[index] = [a, b + 1];
        } else {
            arreglo.push([egre.ciudad_natal, 1]);
        }
    })
    
    return arreglo;
};
