import Foto1 from "../../assets/imgs/facet/BlockMecanicaAdentro_JPG-370x298.jpg";
import Foto2 from "../../assets/imgs/facet/BLOCK-3-FRENTE-scaled-370x298.jpg";
import Foto3 from "../../assets/imgs/facet/17.png";
import { Mapa } from "../components/mapamundi/Mapa";

export const FacultadPage = () => {
    return (
        <>
            <div className="text-center mt-3">Egresados por el mundo</div>
            <div className="card mt-3">
                <div className="card-body text-center">
                    <Mapa />
                </div>{" "}
            </div>
        </>
    );
};
