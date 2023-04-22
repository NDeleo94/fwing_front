import { Route, Routes } from "react-router-dom";
import { ConfiguracionPage, PerfilPage } from "../pages";


export const EgresadosRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="configuracion" element={<ConfiguracionPage />} />

        {/* ¿Faltaría cerrar Sesión? */}
        
      </Routes>
    </>
  );
};
