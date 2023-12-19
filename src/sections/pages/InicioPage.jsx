import { useContext } from "react";
import { ToastNotificacionPush } from "../../egresados/components/ToastNotificacionPush";
import {
    LogoFACETyUNT,
    QueEsFollowing,
} from "../components";
import { Mapa } from "../components/mapamundi/Mapa";
import { LoginContext } from "../../context/LoginContext";

export const InicioPage = () => {
    const { isLogged, user } = useContext(LoginContext);

    let message = '¡Bienvenido ' + user?.nombres + ' a Following!'

    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col text-center">
                        <QueEsFollowing />
                    </div>
                </div>

                <div className="row my-2 text-center">
                    <LogoFACETyUNT />
                </div>

                <div className="row my-2">
                    <div className="col text-center">
                        <h1 className="display-3">¡A explorar!</h1>
                    </div>
                </div>
                {/* Mapamundi */}
                <div className="card">
                    <div className="card-body text-center">

                        <h4>Mapamundi de Egresados por el mundo...</h4>
                        <Mapa />
                    </div>
                </div>
                {/* /Mapamundi */}
                {/* <div className="row my-2">
                    <div className="col">
                        <EmpresasDestacadas />
                    </div>
                </div> */}
            </div>
            {isLogged && <ToastNotificacionPush mensaje={message} />
            }
        </>
    );
};
