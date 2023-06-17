import { Navigate, Route, Routes } from "react-router-dom";
import { ConfiguracionPage, IngresarUsuarioForm, PerfilPage } from "../pages";
import { useContext, useEffect, useState } from "react";
import { useFetchEgresadosById } from "../hooks/useFetchEgresadosById";
import { Loading } from "../../ui/components/Loading";
import { LoginContext } from "../../context/LoginContext";

export const EgresadosRoutes = () => {
  const { user } = useContext(LoginContext);

  return (
    <>
      {user ? (
        <Routes>
          <Route path="configuracion" element={<ConfiguracionPage />} />

          {/* ¿Faltaría cerrar Sesión? */}
        </Routes>
      ) : (
        <Navigate to="/home" replace />
      )}
    </>
  );
};
