import { useLocation, useNavigate } from "react-router-dom";
import { EgresadoList } from "../components/EgresadoList";
import { useForm } from "../hooks/useForm";
import queryString from "query-string";
import { getEgresadosByName } from "../helpers/getEgresadosByName";
import { useEffect, useState } from "react";
import { useFetchEgresadosByName } from "../hooks/useFetchEgresadosByName";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);
  const { data, loading } = useFetchEgresadosByName(q);
  const [egresados, setEgresados] = useState(null);
  useEffect(() => {
    if (data) {
      setEgresados(data);
    }
  }, [data]);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
  };

  const isEmpty = (q) => {
    if (q === "")
      return (
        <div className="alert alert-primary">
          ¡Busca un <b>Egresado</b>!
        </div>
      );
  };

  const notFound = (egresados, q) => {
    if (egresados) {
      if (egresados.length === 0 && q !== "")
        return (
          <>
            <div className="alert alert-danger">
              <b> ¡Sin resultados!</b> <hr />
              No encontramos resultados con '{q}'
            </div>
            ;
          </>
        );
    }
  };

  return (
    <>
      <div className="row my-5 ">
        <div className="col-3">
          <h4>Buscar Egresado</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Busca un egresado"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-3">Buscar</button>
          </form>
        </div>
        <div className="col-9">
          <h4>Resultados</h4>
          <hr />
          {isEmpty(q)}

          {egresados ? <EgresadoList data={data} /> : notFound(egresados, q)}
        </div>
      </div>
    </>
  );
};
