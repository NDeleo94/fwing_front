import { EgresadoCard } from "../../egresados/components/EgresadoCard";
import { getCantidadEgrePorAnio } from "../../egresados/helpers/getCantidadEgrPorAnio";
import { useFetchCantidadEgrPorAnio } from "../../egresados/hooks/useFetchCantidadEgrPorAnio";
import { SearchPage } from "../../egresados/pages";

export const CarreraPage = () => {
  return (
    <>
      <SearchPage />
    </>
  );
};
