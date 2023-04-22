import Foto1 from "../../assets/imgs/facet/BlockMecanicaAdentro_JPG-370x298.jpg";
import Foto2 from "../../assets/imgs/facet/BLOCK-3-FRENTE-scaled-370x298.jpg";
import Foto3 from "../../assets/imgs/facet/17.png";

export const FacultadPage = () => {
  return (
    <>
      <div className="card" style="width: 18rem;">
        <div className="card-body">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={Foto1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={Foto2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={Foto3} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </>
  );
};
