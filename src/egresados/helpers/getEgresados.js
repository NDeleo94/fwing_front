export const getEgresados = async (id) => {
  // saco la url con mi id
  const url = `http://localhost:3000/egresado/${id}`;
  // espero la respuesta de la url
  const resp = await fetch(url);
  // guardo lo que recibo
  const data = await resp.json();
  const egresado = {
    id: data.id,
    anioEgresado: data.anioEgresado,
    apellido: data.apellido,
    carrera: data.carrera,
    ciudadActual: data.ciudadActual,
    ciudadNatal: data.ciudadNatal,
    fechanac: data.fechanac,
    nombre: data.nombre,
    trabajaComo: data.trabajo.trabajaComo.nombre,
    trabajaEn: data.trabajo.trabajaEn.nombre,
  };
  return egresado;
};

/* export const getGifs = async(category) => {

    // saco la url con mi key buscando "boca juniors"
    const url = `https://api.giphy.com/v1/gifs/search?limit=10&q=${encodeURI( category )}&api_key=ZZwiNIrgWnTUVbkbqo8H1Y6VpVuiUmKb`;
    // espero la respuesta a la url
    const resp = await fetch( url );            
    // recibo un json donde solo me interesa el contenido de "data"
    const {data} = await resp.json();

    // como data trae mucha información, mapeo en una const "gifs" la información que necesito
    // necesito el id, el titulo y la url de cada imagen sacada de data
    const gifs = data.map( img => {
        return {
            id: img.id,
            title: img.title,
            url: img.images.downsized_medium.url
        }
    })
    // muestro en consola el arreglo obtenido
    return gifs;
    
} */
