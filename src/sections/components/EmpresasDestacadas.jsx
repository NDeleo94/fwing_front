import { EmpresasDestacadasCard } from "./EmpresasDestacadasCard";

export const EmpresasDestacadas = () => {
  return (
    <>
      <div className="card border-primary mb-3">
        <div className="card-header">
          <h1 className="lead text-center">
            <b>Empresas Destacadas</b>
          </h1>
          <div className="row">
            <div className="col-4">
              <EmpresasDestacadasCard />
            </div>
            <div className="col-4">
              <EmpresasDestacadasCard />
            </div>
            <div className="col-4">
              <EmpresasDestacadasCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
