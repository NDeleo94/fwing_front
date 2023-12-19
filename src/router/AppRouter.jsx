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
import { DataContext } from "../context/DataContext";
import { PasswordPage } from "../sections/pages/PasswordPage";

export const AppRouter = () => {
    // LoginContext
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenGoogle, setTokenGoogle] = useState(null);
    const state = {
        isLogged,
        setIsLogged,
        user,
        setUser,
        token,
        setToken,
        tokenGoogle,
        setTokenGoogle,
    };

    // DataContext
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const dataMain = {
        data,
        setData,
        loading,
        setLoading,
    };
    return (
        <>
            <DataContext.Provider value={dataMain}>
                <LoginContext.Provider value={state}>
                    <Navbar />

                    <div className="container-lg">
                        <Routes>
                            <Route path="/" element={<InicioPage />} />
                            <Route path="home" element={<InicioPage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="carrera" element={<CarreraPage />} />
                            <Route path="search" element={<SearchPage />} />
                            <Route path="perfil/:id" element={<PerfilPage />} />
                            <Route
                                path="reset-password/:token"
                                element={<PasswordPage />}
                            />
                            <Route path="/*" element={<EgresadosRoutes />} />
                        </Routes>
                    </div>

                    <Footer />
                </LoginContext.Provider>
            </DataContext.Provider>
        </>
    );
};
