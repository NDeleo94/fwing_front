import { useLocation, useNavigate } from "react-router-dom";
import { EgresadoList } from "../components/EgresadoList";
import { useForm } from "../hooks/useForm";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useFetchEgresados } from "../hooks/useFetchEgresados";
import { Loading } from "../../ui/components/Loading";
import { Analitics } from "../components/Analitics";

export const SearchPage = ({ data }) => {
    const location = useLocation();

    const { q = "" } = queryString.parse(location.search);

    const [egresados, setEgresados] = useState([]);
    const [filteredEgresados, setFilteredEgresados] = useState([]);
    const [textSearched, setTextSearched] = useState("");
    const [bandera, setBandera] = useState(false);

    useEffect(() => {
        if (data) {
            setEgresados(data);
            if (q != "") {
                onPreSearch();
                setTimeout(function () {
                    setBandera(true);
                }, 15000);
            } else {
                setFilteredEgresados(data);
                setBandera(true);
            }
        }
    }, [data]);

    useEffect(() => {
        onPreSearch();
    }, [q]);

    const { searchText, onInputChange } = useForm({
        searchText: q,
    });

    const onSearchSubmit = (event) => {
        event.preventDefault();
        const value = searchText;
        let updatedData = [];
        let aux = [];
        setTextSearched(searchText);
        if (value.length) {
            const filterFirstName =
                egresados &&
                egresados.filter((item) => {
                    const filter = item.nombres
                        .toLowerCase()
                        .includes(value.toLowerCase());

                    return filter ? filter : null;
                });

            const filterLastName =
                egresados &&
                egresados.filter((item) => {
                    const filter = item.apellidos
                        .toLowerCase()
                        .includes(value.toLowerCase());

                    return filter ? filter : null;
                });

            const result = filterFirstName
                ? filterFirstName.concat(filterLastName)
                : aux;
            updatedData = result.reduce((acc, item) => {
                if (!acc.includes(item)) {
                    acc.push(item);
                }
                return acc;
            }, []);
            setFilteredEgresados(updatedData);
        } else {
            setFilteredEgresados(egresados);
        }
    };

    function onPreSearch() {
        const value = q;
        let updatedData = [];
        let aux = [];
        setTextSearched(q);
        if (value.length) {
            const filterFirstName =
                egresados &&
                egresados.filter((item) => {
                    const filter = item.nombres
                        .toLowerCase()
                        .includes(value.toLowerCase());

                    return filter ? filter : null;
                });

            const filterLastName =
                egresados &&
                egresados.filter((item) => {
                    const filter = item.apellidos
                        .toLowerCase()
                        .includes(value.toLowerCase());

                    return filter ? filter : null;
                });

            const result = filterFirstName
                ? filterFirstName.concat(filterLastName)
                : aux;
            updatedData = result.reduce((acc, item) => {
                if (!acc.includes(item)) {
                    acc.push(item);
                }
                return acc;
            }, []);
            setFilteredEgresados(updatedData);
        } else {
            setFilteredEgresados(egresados);
        }
    }

    const isEmpty = (q) => {
        if (q === "")
            return (
                <div className="alert alert-primary">
                    ¡Busca un <b>Egresado</b>!
                </div>
            );
    };

    const notFound = (filteredEgresados, textSearched, bandera) => {
        if (filteredEgresados.length == 0 && textSearched !== "" && bandera) {
            return (
                <>
                    <div className="alert alert-danger my-3">
                        <b> ¡Sin resultados!</b> <hr />
                        No encontramos resultados con "{textSearched}"
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <div className="row">
                <h4 className="mt-3">Buscar Egresado</h4>
                <hr />
                <form>
                    <input
                        type="text"
                        placeholder="Busca un egresado"
                        className="form-control"
                        name="searchText"
                        autoComplete="off"
                        value={searchText}
                        onChange={onInputChange}
                    />

                    <button
                        className="btn btn-outline-primary mt-3"
                        onClick={(event) => onSearchSubmit(event)}
                    >
                        Buscar
                    </button>
                </form>
            </div>
            <div className="row mt-3">
                <h4>Resultados</h4>
                <hr />
                {!bandera ? <Loading /> : ""}
                {isEmpty(searchText)}
                {<EgresadoList data={filteredEgresados} />}
                {notFound(filteredEgresados, textSearched, bandera)}
            </div>
        </>
    );
};
