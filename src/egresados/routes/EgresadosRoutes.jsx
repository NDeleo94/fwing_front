import { Route, Routes } from "react-router-dom";
import { ConfiguracionPage, IngresarUsuarioForm, PerfilPage } from "../pages";


export const EgresadosRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="configuracion" element={<ConfiguracionPage />} />
        <Route path="agregar" element={<IngresarUsuarioForm />} />

        {/* ¿Faltaría cerrar Sesión? */}
        
      </Routes>
    </>
  );
};
