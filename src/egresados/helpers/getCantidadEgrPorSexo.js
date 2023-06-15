export const getCantidadEgrPorSexo = (data) => {
  let varones = 0;
  let mujeres = 0;
  data.map((egre) => {
    if ("M" === egre.sexo) {
      varones++;
    }
    if ("F" === egre.sexo) {
      mujeres++;
    }
  });
  return [varones,mujeres];
};
