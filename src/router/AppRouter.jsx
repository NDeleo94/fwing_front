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

export const AppRouter = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="home" element={<InicioPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="carrera" element={<CarreraPage />} />
          <Route path="facultad" element={<FacultadPage />} />
          <Route path="universidad" element={<UniversidadPage />} />
          <Route path="mmundial" element={<MMundialPage />} />
          <Route path="mpais" element={<MPaisPage />} />
          <Route path="mlocal" element={<MLocalPage />} />
          <Route path="honores" element={<HonoresPage />} />
          <Route path="/*" element={<EgresadosRoutes />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};
