import {
    EmpresasDestacadas,
    LogoFACETyUNT,
    QueEsFollowing,
} from "../components";
import { Mapa } from "../components/mapamundi/Mapa";

export const InicioPage = () => {
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
                        <Mapa></Mapa>
                    </div>
                </div>
                {/* /Mapamundi */}
                <div className="row my-2">
                    <div className="col">
                        <EmpresasDestacadas />
                    </div>
                </div>
            </div>
        </>
    );
};
