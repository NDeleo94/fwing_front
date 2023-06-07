import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavDropdown, Button } from "react-bootstrap";
import Logo from "../../assets/imgs/Logo.png";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

export const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(LoginContext);

  const navigate = useNavigate();

  const onLogout = () => {
    setIsLogged(false);
    navigate("/login", {
      replace: true,
    });
  };

  const onLogin = () => {
    setIsLogged(true);
    navigate("/home", {
      replace: true,
    });
  };

  const toMMundial = () => {
    navigate("/mmundial");
  };

  const toMPais = () => {
    navigate("/mpais");
  };

  const toMLocal = () => {
    navigate("/mlocal");
  };

  const toPerfil = () => {
    navigate("/perfil");
  };

  const toConfiguracion = () => {
    navigate("/configuracion");
  };

  const toAgregarEgresado = () => {
    navigate("/agregar");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img
              src={Logo}
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            Following
          </Link>

          <div className="navbar-collapse">
            <div className="navbar-nav">
              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""} `
                }
                to="/carrera"
              >
                Carrera
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""} `
                }
                to="/facultad"
              >
                Facultad
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""} `
                }
                to="/universidad"
              >
                Universidad
              </NavLink>

              <NavDropdown title="Mercado Laboral" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={toMMundial}>
                  Nivel Mundial
                </NavDropdown.Item>
                <NavDropdown.Item onClick={toMPais}>
                  Nivel Pais
                </NavDropdown.Item>
                <NavDropdown.Item onClick={toMLocal}>
                  Nivel Local
                </NavDropdown.Item>
              </NavDropdown>

              <NavLink className="nav-item nav-link" to="/honores">
                Honores
              </NavLink>
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="d-flex">
              {/* Sin loguear */}
              {!isLogged ? (
                <Button variant="success" onClick={onLogin}>
                  Ingresar
                </Button>
              ) : (
                <div className="navbar-nav">
                  <NavDropdown title="Deleo, Nicolás" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={toPerfil}>
                      Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={toConfiguracion}>
                      Configuración
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={toAgregarEgresado}>
                      Agregar Egresado
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="">
                      <Button variant="danger" onClick={onLogout}>
                        Cerrar Sesión
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
              {/* /Sin loguear */}

              {/* Logueado */}

              {/* /Logueado */}

              <div className="input-group ms-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar"
                  aria-label="Buscar"
                  aria-describedby="button-addon2"
                />
                <Button
                  variant="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  <i className="bi bi-search"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
