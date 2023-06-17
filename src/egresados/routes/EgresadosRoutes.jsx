import { Route, Routes } from "react-router-dom";
import { ConfiguracionPage, IngresarUsuarioForm, PerfilPage } from "../pages";
import { useEffect, useState } from "react";
import { useFetchEgresadosById } from "../hooks/useFetchEgresadosById";
import { Loading } from "../../ui/components/Loading";

export const EgresadosRoutes = () => {
  const { data, loading } = useFetchEgresadosById(903);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="configuracion"
            element={<ConfiguracionPage egresado={data} />}
          />

          {/* ¿Faltaría cerrar Sesión? */}
        </Routes>
      )}
    </>
  );
};
