export const getEgresados = async () => {
  // saco la url con mi id http://localhost:3000/egresado/
  const urlBase = import.meta.env.VITE_URL_LOCAL;
  const url = `${urlBase}/egresados/`;
  // espero la respuesta de la url https://ndeleo94.pythonanywhere.com/fw/api/egresados/
  const resp = await fetch(url);
  // guardo lo que recibo
  const data = await resp.json();
  return data;
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
