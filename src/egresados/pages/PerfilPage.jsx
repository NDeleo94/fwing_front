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
import { separarFecha } from "../helpers/manejoFecha";
import { DatosTitulosEgresadosCard } from "../components/DatosTitulosEgresadosCard";

export const PerfilPage = () => {
    const { id } = useParams();
    const [lastLoggin, setLastLoggin] = useState(null);
    const { data, loading } = useFetchEgresadosById(id);

    useEffect(() => {
        if (data.last_login) {
            const { mes, anio } = separarFecha(data.last_login.slice(0, 10));
            setLastLoggin(`${mes}/${anio}`);
        }
    }, [data]);
    console.log(data)

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
                            {lastLoggin
                                ? `Última actualización: ${lastLoggin}`
                                : `Usuario sin loguearse a la fecha.`}
                        </p>
                    </div>
                    <div className="col-8">
                        <DatosPersonalesEgresadoCard {...data} />
                        <DatosLaboralesEgresadosCard {...data} />
                        <DatosTitulosEgresadosCard {...data} />
                    </div>
                </div>
            </div>
        </>
    );
};
