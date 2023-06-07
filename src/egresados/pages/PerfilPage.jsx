import { useEffect, useState } from "react";
import {
  DatosLaboralesEgresadosCard,
  DatosPersonalesEgresadoCard,
  PerfilEgresadoCard,
} from "../components";
import { Loading } from "../../ui/components/Loading";
import { useParams } from "react-router-dom";
import { useFetchEgresadosById } from "../hooks/useFetchEgresadosById";
import { Page404NotFound } from "../../ui/components/Page404NotFound";

export const PerfilPage = () => {
  const { id } = useParams();
  const [last_loggin, setLast_loggin] = useState(null);
  const { data, loading } = useFetchEgresadosById(id);
  
  useEffect(() => {
    if (data) {
      setLast_loggin(data.last_login);
    }
  }, [data]);

  return loading ? (
    <Loading />
  ) : data.detail == `Not found.` ? (
    <Page404NotFound />
  ) : (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-4">
            <PerfilEgresadoCard {...data} />
            <p className="text-body-secondary">
              {last_loggin
                ? `Última actualización: ${last_loggin}`
                : `Usuario sin loguearse a la fecha.`}
            </p>
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
