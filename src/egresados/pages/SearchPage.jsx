import { useLocation, useNavigate } from "react-router-dom";
import { EgresadoList } from "../components/EgresadoList";
import { useForm } from "../hooks/useForm";
import queryString from "query-string";
import { getEgresadosByName } from "../helpers/getEgresadosByName";
import { useEffect, useState } from "react";
import { useFetchEgresadosByName } from "../hooks/useFetchEgresadosByName";
import { useFetchEgresados } from "../hooks/useFetchEgresados";
import { Loading } from "../../ui/components/Loading";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);
  const { data, loading } = useFetchEgresados();
  const [egresados, setEgresados] = useState([]);
  const [filteredEgresados, setFilteredEgresados] = useState([]);
  const [textSearched, setTextSearched] = useState("");
  useEffect(() => {
    if (data) {
      setEgresados(data);
      setFilteredEgresados(data);
    }
  }, [data]);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    const value = searchText;
    let updatedData = [];
    let aux = [];
    console.log(value.length);
    console.log(filteredEgresados);
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

  const isEmpty = (q) => {
    if (q === "")
      return (
        <div className="alert alert-primary">
          ¡Busca un <b>Egresado</b>!
        </div>
      );
  };

  const notFound = (filteredEgresados, textSearched) => {
    if (filteredEgresados.length == 0 && textSearched !== "") {
      return (
        <>
          <div className="alert alert-danger">
            <b> ¡Sin resultados!</b> <hr />
            No encontramos resultados con "{textSearched}"
          </div>
        </>
      );
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="row my-5 ">
        <div className="col-3">
          <h4>Buscar Egresado</h4>
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
        <div className="col-9">
          <h4>Resultados</h4>
          <hr />
          {isEmpty(searchText)}
          {notFound(filteredEgresados, textSearched)}
          {<EgresadoList data={filteredEgresados} />}
        </div>
      </div>
    </>
  );
};
