import {
  DatosLaboralesEgresadosCard,
  DatosPersonalesEgresadoCard,
  PerfilEgresadoCard,
} from "../components";
import { useFetchEgresados } from "../hooks/useFetchEgresados";

export const PerfilPage = () => {
  const { data, loading } = useFetchEgresados("2");

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-4">
            <PerfilEgresadoCard {...data} />
          </div>
          <div className="col-8">
            <DatosPersonalesEgresadoCard {...data} />
            <DatosLaboralesEgresadosCard {...data} />
          </div>
        </div>
      </div>
    </>
  );
};
