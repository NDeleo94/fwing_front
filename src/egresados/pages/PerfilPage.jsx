import { useEffect, useState } from "react";
import {
  DatosLaboralesEgresadosCard,
  DatosPersonalesEgresadoCard,
  PerfilEgresadoCard,
} from "../components";
import { useFetchEgresados } from "../hooks/useFetchEgresados";

export const PerfilPage = () => {
  const { data, loading } = useFetchEgresados("2");
  const [last_loggin, setLast_loggin] = useState(null);
  useEffect(() => {
    if (data) {
      setLast_loggin(data.last_login);
    }
  }, [data]);

  return (
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
