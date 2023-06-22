import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { EgresadosRoutes } from "../egresados/routes/EgresadosRoutes";
import {
  CarreraPage,
  FacultadPage,
  HonoresPage,
  InicioPage,
  MLocalPage,
  MMundialPage,
  MPaisPage,
  UniversidadPage,
} from "../sections/pages";
import { Footer, Navbar } from "../ui/components";
import { useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { PerfilPage, SearchPage } from "../egresados/pages";

export const AppRouter = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const state = { isLogged, setIsLogged, user, setUser, token, setToken };

  return (
    <>
      <LoginContext.Provider value={state}>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="home" element={<InicioPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="carrera" element={<CarreraPage />} />
            <Route path="facultad" element={<FacultadPage />} />
            <Route path="universidad" element={<UniversidadPage />} />
            <Route path="mmundial" element={<MMundialPage />} />
            <Route path="mpais" element={<MPaisPage />} />
            <Route path="mlocal" element={<MLocalPage />} />
            <Route path="honores" element={<HonoresPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="perfil/:id" element={<PerfilPage />} />
            <Route path="/*" element={<EgresadosRoutes />} />
          </Routes>
        </div>

        <Footer />
      </LoginContext.Provider>
    </>
  );
};
