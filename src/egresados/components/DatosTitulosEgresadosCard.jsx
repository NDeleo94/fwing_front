import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

export const DatosTitulosEgresadosCard = ({ egresos }) => {
    const [titulos, setTitulos] = useState([]);
    useEffect(() => {
        if (egresos) {
            setTitulos(egresos);
        }
    }, [egresos]);
    console.log(egresos);
    return (
        <>
            {titulos.length > 1 ? (
                <>
                    <div className="card border-secondary mb-3">
                        <div className="card-header">Títulos</div>
                        <ul className="list-group list-group-flush">
                            {titulos
                                ? titulos.map((element) => (
                                      <li
                                          key={element.id}
                                          className="list-group-item"
                                      >
                                          {element.postgrado && (
                                              <>
                                                  <Badge
                                                      pill
                                                      bg="warning"
                                                      text="dark"
                                                  >
                                                      POSTGRADO
                                                  </Badge>
                                              </>
                                          )}
                                          {"  "}
                                          <b>{element.carrera.carrera}</b> de
                                          <b>
                                              {" " +
                                                  element.carrera.facultad
                                                      .universidad.universidad}
                                          </b>{" "}
                                          en el año{" "}
                                          {element.ciclo_egreso.split("-")[0]}
                                      </li>
                                  ))
                                : ""}
                        </ul>
                    </div>
                </>
            ) : (
                ""
            )}
        </>
    );
};
