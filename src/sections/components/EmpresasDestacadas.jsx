import { EmpresasDestacadasCard } from "./EmpresasDestacadasCard";

export const EmpresasDestacadas = () => {
  return (
    <>
      <div className="card border-primary mb-3">
        <div className="card-header">
          <h1 className="lead text-center my-2">
            <b>Organizaciones Destacadas</b>
          </h1>
          <div className="row px-5 mt-3">
            <div className="col-4 px-5">
              <EmpresasDestacadasCard />
            </div>
            <div className="col-4 px-5">
              <EmpresasDestacadasCard />
            </div>
            <div className="col-4 px-5">
              <EmpresasDestacadasCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
