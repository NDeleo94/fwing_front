import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavDropdown, Button, Form, InputGroup } from "react-bootstrap";
import Logo from "../../assets/imgs/Logo.png";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useForm } from "../../egresados/hooks/useForm";
import { DataContext } from "../../context/DataContext";
import { useFetchEgresados } from "../../egresados/hooks/useFetchEgresados";

export const Navbar = () => {
    const { user, setUser, setToken } = useContext(LoginContext);

    const navigate = useNavigate();

    const onLogout = () => {
        setUser(null);
        setToken(null);
        navigate("/login", {
            replace: true,
        });
    };

    const onLogin = () => {
        navigate("/login", {
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
        navigate(`/perfil/${user.id}`);
    };

    const toConfiguracion = () => {
        navigate("/configuracion");
    };

    /* Búsqueda de Navbar */
    const initialForm = {
        q: "",
    };

    const { formState, onInputChange } = useForm(initialForm);

    const toBusqueda = () => {
        navigate(`/search?q=${formState.q}`);
    };

    const enterPulsed = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            navigate(`/search?q=${formState.q}`);
        }
    };

    /* DataContext */
    const { setData, lastUpload, setLastUpload } = useContext(DataContext);
    const { data, loading } = useFetchEgresados();
    /* setData(data); */
    /*  useEffect(() => {
        // va el control de lastUpload antes
    }, [toggle]); */
    useEffect(() => {
        if (data) {
            setData(data);
        }
    }, [data]);
    /* Fin DataContext */
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
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
                    <div
                        className="collapse navbar-collapse"
                        id="navbarTogglerDemo01"
                    >
                        <div className="navbar-collapse">
                            <div className="navbar-nav">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        } `
                                    }
                                    to="/home"
                                >
                                    Inicio
                                </NavLink>

                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        } `
                                    }
                                    to="/carrera"
                                >
                                    Ingeniería en Computación
                                </NavLink>

                                {/* <NavLink
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        } `
                                    }
                                    to="/facultad"
                                >
                                    Facultad
                                </NavLink>

                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-item nav-link ${
                                            isActive ? "active" : ""
                                        } `
                                    }
                                    to="/universidad"
                                >
                                    Universidad
                                </NavLink>

                                <NavDropdown
                                    title="Mercado Laboral"
                                    id="basic-nav-dropdown"
                                >
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

                                <NavLink
                                    disabled
                                    className="nav-item nav-link"
                                    //to="/honores"
                                >
                                    Honores
                                </NavLink> */}
                            </div>
                        </div>

                        <div className="row justify-content-between">
                            <div className="d-flex col-sm-12">
                                {/* Sin loguear */}
                                {!user ? (
                                    <Button variant="success" onClick={onLogin}>
                                        Ingresar
                                    </Button>
                                ) : (
                                    <div className="navbar-nav">
                                        <NavDropdown
                                            title={`${user.nombres}`}
                                            id="basic-nav-dropdown"
                                        >
                                            <NavDropdown.Item
                                                onClick={toPerfil}
                                            >
                                                Perfil
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={toConfiguracion}
                                            >
                                                Configuración
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="">
                                                <Button
                                                    variant="danger"
                                                    onClick={onLogout}
                                                >
                                                    Cerrar Sesión
                                                </Button>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                )}
                                <div>
                                    <br />
                                </div>
                                <div className="input-group ms-3 col">
                                    <Form>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Buscar"
                                                aria-label="Buscar"
                                                aria-describedby="button-addon2"
                                                value={formState.q}
                                                name="q"
                                                onChange={onInputChange}
                                                onKeyDown={enterPulsed}
                                            />
                                            <Button
                                                variant="btn btn-outline-secondary"
                                                type="button"
                                                id="button-addon2"
                                                onClick={toBusqueda}
                                            >
                                                <i className="bi bi-search"></i>
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
