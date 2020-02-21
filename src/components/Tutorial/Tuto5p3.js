import React from "react";

export default props => {
  return (
    <div className="p-5">
      <p className="mt-2">
        Ahora ya sabes usar sabes usar los contenedores. Intenta crear un
        componente que capture los datos de un cliente, incluyendo nombre, edad,
        género, dirección con todos sus campos. Prueba utilizar contenedores
        diferentes para guardar los datos generales del cliente de su dirección.
        Por ejemplo
        <code className="mx-2">useContainer("cliente/generales")</code> y
        <code className="mx-2">useContainer("cliente/direccion")</code>.
        Finalmente crea una barra de estatus fijada abajo (usa estilos) y un
        contenedor compartido{" "}
        <code className="mx-2">useContainer("statusbar")</code>
        que pueda muestre un texto en la barra (este texto podrá ser modificado)
        por cualquier componente :D.
      </p>
      <p>
        Observa que la construcción en bloques implica que las rutas pueden ser
        arreglos de bloques, revisa el archivo{" "}
        <code className="mx-2">routes.js</code>
        para ver cómo se construyó este <strong>tutorial 5</strong>.
      </p>
      <a
        className="btn btn-primary btn-lg mr-2"
        href="#tutorial-4"
        role="button"
      >
        Inicio
      </a>
      <a className="btn btn-primary btn-lg" href="#tutorial-6" role="button">
        Siguiente
      </a>
    </div>
  );
};
