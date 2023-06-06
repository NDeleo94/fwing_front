import { Route, Routes } from "react-router-dom";
import { ConfiguracionPage, IngresarUsuarioForm, PerfilPage } from "../pages";
import { useEffect, useState } from "react";
import { useFetchEgresadosById } from "../hooks/useFetchEgresadosById";


export const EgresadosRoutes = () => {
  const [last_loggin, setLast_loggin] = useState(null);
  const { data, loading } = useFetchEgresadosById(500);
  
  useEffect(() => {
    if (data) {
      setLast_loggin(data.last_login);
    }
  }, [data]);

  return (
    <>
      <Routes>
        <Route path="perfil/:id" element={<PerfilPage />} />
        <Route path="configuracion" element={<ConfiguracionPage egresado={data} loading={loading}/>} />
        <Route path="agregar" element={<IngresarUsuarioForm />} />

        {/* ¿Faltaría cerrar Sesión? */}
        
      </Routes>
    </>
  );
};
