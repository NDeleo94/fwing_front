export const getEgresadosByName = async (name = "") => {
  // saco la url con mi id http://localhost:3000/egresado/
  const urlBase = import.meta.env.VITE_URL_LOCAL;
  const url = `${urlBase}/egresado/`;
  // espero la respuesta de la url https://ndeleo94.pythonanywhere.com/fw/api/egresados/
  const resp = await fetch(url);
  // guardo lo que recibo
  const data = await resp.json();

  name = name.toLocaleLowerCase().trim();

  if (name.length === 0) return [];

  return data.filter((egresado) =>
    egresado.nombres.toLocaleLowerCase().includes(name)
  );
};
