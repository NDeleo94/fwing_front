import Logo from "../../assets/imgs/Logo.png";

/* Falta hacer esto */

export const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md d-flex align-items-center">
          <a
            href="/home"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <img
              src={Logo}
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
          </a>
          <span className="mb-3 mb-md-0 text-muted" style={{fontSize: '10pt'}}>
            <small>
              © Laboratorio de Microprocesadores - Departamento de Electricidad,
              Electrónica y Computación - Facultad de Ciencias Exactas y
              Tecnología - Universidad Nacional de Tucumán
            </small>
          </span>
        </div>

        {/* <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#">
              <svg className="bi" width="24" height="24">
                <use xlink:href="#twitter"></use>
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <svg className="bi" width="24" height="24">
                <use xlink:href="#instagram"></use>
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <svg className="bi" width="24" height="24">
                <use xlink:href="#facebook"></use>
              </svg>
            </a>
          </li>
        </ul> */}
      </footer>
    </div>
  );
};
