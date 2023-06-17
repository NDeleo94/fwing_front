import { Route, Routes } from "react-router-dom";
import { ConfiguracionPage, IngresarUsuarioForm, PerfilPage } from "../pages";
import { useContext, useEffect, useState } from "react";
import { useFetchEgresadosById } from "../hooks/useFetchEgresadosById";
import { Loading } from "../../ui/components/Loading";
import { LoginContext } from "../../context/LoginContext";

export const EgresadosRoutes = () => {
  const { user } = useContext(LoginContext);
  const { data, loading } = useFetchEgresadosById(user.id);

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
