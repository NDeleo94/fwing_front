export const InicioPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          {/* ¿Qué es Following */}
          <div className="col-8 text-center">
          <h1 className="display-6">¿Qué es Following?</h1>
          <p className="text-center">
          Es una Aplicación Web sobre seguimiento de graduados, que combina dos formas de hacerlo: Encuestas (forma tradicional) y Perfiles de Red Social (forma indirecta). Combinando y analizando estas maneras, nos permite construir una base de dato híbrida, más consistente, en donde cada egresado obtiene su perfil en el sistema al graduarse, y sólo deberá actualizarla cuando lo crea necesario. Esta app está destinada a registrar las actividades laborales de los egresados de ingeniería en computación de la facet (uso momentáneo) y, si bien, está enfocado solamente en este grupo de profesionales, Following pretende llegar a registrar los movimientos laborales de cada graduado de cada universidad que quiera ser parte de este sistema.
          </p>
            
          </div>
          {/* /¿Qué es Following */}
          {/* Empresas Destacadas */}

          {/* /Empresas Destacadas */}
        </div>
          {/* Logo UNT-FACET */}
          <div className="row my-2 text-center">
            <a href=""><img src="https://www.facet.unt.edu.ar/wp-content/uploads/2022/04/FACET-cabecera-2022.png" alt="Logo Facet y UNT" /></a>
          </div>
          {/* /Logo UNT-FACET */}
        {/* ¡A explorar! */}
        <div className="row my-2">
          <div className="col text-center">
            <h1 className="display-3">¡A explorar!</h1>
          </div>
        </div>
        {/* /¡A explorar! */}

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
