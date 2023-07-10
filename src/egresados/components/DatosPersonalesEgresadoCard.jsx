import React, { useContext, useEffect, useState } from "react";
import { convertirFecha, separarFecha } from "../helpers/manejoFecha";
import { LoginContext } from "../../context/LoginContext";

export const DatosPersonalesEgresadoCard = ({
    nombres,
    apellidos,
    fecha_nac,
    email,
    egresos,
    ciudad_natal,
    ciudad_actual,
    privacidad,
}) => {
    const { user } = useContext(LoginContext);

    const [anioEgreso, setAnioEgreso] = useState(null);

    useEffect(() => {
        if (egresos) {
            const { anio } = separarFecha(
                egresos[egresos.length - 1].ciclo_egreso
            );
            setAnioEgreso(anio);
        }
    }, [egresos]);
    return (
        <>
            <div className="card border-secondary mb-3">
                <div className="row mt-4 mx-2">
                    <div className="col-4">
                        <b>Nombre Completo:</b>
                    </div>
                    <div className="col-8">
                        {nombres} {apellidos}
                    </div>
                </div>
                {(privacidad?.email || user?.is_admin) && (
                    <>
                        <hr />
                        <div className="row mx-2">
                            <div
                                className={
                                    !privacidad?.email
                                        ? "col-4 text-bg-danger"
                                        : "col-4"
                                }
                            >
                                <b>Correo Electrónico:</b>
                            </div>
                            <div
                                className={
                                    !privacidad?.email
                                        ? "col-8 text-bg-danger"
                                        : "col-8"
                                }
                            >
                                {email}
                            </div>
                        </div>
                    </>
                )}
                {(privacidad?.fecha_nac || user?.is_admin) && (
                    <>
                        <hr />
                        <div className="row mx-2">
                            <div
                                className={
                                    !privacidad?.fecha_nac
                                        ? "col-4 text-bg-danger"
                                        : "col-4"
                                }
                            >
                                <b>Fecha de Nacimiento:</b>
                            </div>
                            <div
                                className={
                                    !privacidad?.fecha_nac
                                        ? "col-8 text-bg-danger"
                                        : "col-8"
                                }
                            >
                                {convertirFecha(fecha_nac)}
                            </div>
                        </div>
                    </>
                )}
                <hr />
                <div
                    className={
                        !privacidad?.ciudad_actual &&
                        !privacidad?.ciudad_natal &&
                        !user?.is_admin
                            ? "row mb-3 mx-2"
                            : "row mx-2"
                    }
                >
                    <div className="col-4">
                        <b>Año de Egreso:</b>
                    </div>
                    <div className="col-8">{anioEgreso}</div>
                </div>
                {(privacidad?.ciudad_natal || user?.is_admin) && (
                    <>
                        <hr />
                        <div
                            className={
                                !privacidad?.ciudad_actual && !user?.is_admin
                                    ? "row mb-3 mx-2"
                                    : "row mx-2"
                            }
                        >
                            <div
                                className={
                                    !privacidad?.ciudad_natal
                                        ? "col-4 text-bg-danger"
                                        : "col-4"
                                }
                            >
                                <b>Ciudad Natal:</b>
                            </div>
                            <div
                                className={
                                    !privacidad?.ciudad_natal
                                        ? "col-8 text-bg-danger"
                                        : "col-8"
                                }
                            >
                                {ciudad_natal}
                            </div>
                        </div>
                    </>
                )}
                {(privacidad?.ciudad_actual || user?.is_admin) && (
                    <>
                        <hr />
                        <div className="row mb-3 mx-2">
                            <div
                                className={
                                    !privacidad?.ciudad_actual
                                        ? "col-4 text-bg-danger"
                                        : "col-4"
                                }
                            >
                                <b>Ciudad Actual:</b>
                            </div>
                            <div
                                className={
                                    !privacidad?.ciudad_actual
                                        ? "col-8 text-bg-danger"
                                        : "col-8"
                                }
                            >
                                {ciudad_actual}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
