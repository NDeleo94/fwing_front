import { Navigate, Route, Routes } from "react-router-dom";
import { ConfiguracionPage } from "../pages";
import { useContext } from "react";
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
