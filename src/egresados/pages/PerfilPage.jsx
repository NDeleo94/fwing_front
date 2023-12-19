import { useContext, useEffect, useState } from "react";
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
import { LoginContext } from "../../context/LoginContext";

export const PerfilPage = () => {
    const { id } = useParams();
    const [lastLoggin, setLastLoggin] = useState(null);
    const { data, loading } = useFetchEgresadosById(id);
    const { user } = useContext(LoginContext);

    useEffect(() => {
        if (data.last_login) {
            const { mes, anio } = separarFecha(data.last_login.slice(0, 10));
            setLastLoggin(`${mes}/${anio}`);
        }
    }, [data]);

    return loading ? (
        <Loading />
    ) : data.detail == `Not found.` ? (
        <Page404NotFound />
    ) : (
        <>
            <div className="container-fluid mt-4">
                {user?.is_admin && (<h5 className="text-danger">**Celdas rojas indican información oculta al público.</h5>)}
                <div className="row">
                    <div className="col-md-4 col-12">
                        <PerfilEgresadoCard {...data} />
                        <p className="text-body-secondary">
                            {lastLoggin
                                ? `Última actualización: ${lastLoggin}`
                                : `Usuario sin loguearse a la fecha.`}
                        </p>
                    </div>
                    <div className="col-md-8 col-12">
                        <DatosPersonalesEgresadoCard {...data} />
                        <DatosLaboralesEgresadosCard {...data} />
                        <DatosTitulosEgresadosCard {...data} />
                    </div>
                </div>
            </div>
        </>
    );
};
