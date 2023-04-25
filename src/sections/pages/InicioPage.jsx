import {
  EmpresasDestacadas,
  LogoFACETyUNT,
  QueEsFollowing,
} from "../components";

export const InicioPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-7 text-center">
            <QueEsFollowing />
          </div>

          <div className="col-5">
            <EmpresasDestacadas />
          </div>
        </div>

        <div className="row my-2 text-center">
          <LogoFACETyUNT />
        </div>

        <div className="row my-2">
          <div className="col text-center">
            <h1 className="display-3">¡A explorar!</h1>
          </div>
        </div>

        {/* Mapamundi */}
        <div className="card">
          <div className="card-body text-center">
            <h2>Mapamundi</h2>
          </div>
        </div>
        {/* /Mapamundi */}
      </div>
    </>
  );
};
