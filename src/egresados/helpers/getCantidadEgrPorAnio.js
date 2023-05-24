export const getCantidadEgrePorAnio = async () => {
    // saco la url con mi id http://localhost:3000/egresado/
    const url = `http://localhost:3000/egresadosPorAnio`;
    // espero la respuesta de la url https://ndeleo94.pythonanywhere.com/fw/api/egresados/
    const resp = await fetch(url);
    // guardo lo que recibo
    const data = await resp.json();
    return data;
  };