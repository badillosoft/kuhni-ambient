import React from "react";

export default props => {
  return (
    <div className="p-5">
      <div className="jumbotron">
        <h1 className="display-4">Bienvenido a Kuhni Ambients</h1>
        <p className="lead">
          <strong>Kuhni Ambients</strong> es una nano-librería de React que
          contiene un componente llamado <code>&lt;Ambient/&gt;</code> el cuál
          potencia el desarrollo a niveles extremos.
        </p>
        <hr className="my-4" />
        <p>
          Vamos a comenzar con un pequeño tutorial para que puedas dominar los
          ambientes.
        </p>
        <a className="btn btn-primary btn-lg" href="#tutorial-1" role="button">
          Iniciar Tutorial
        </a>
      </div>
    </div>
  );
};
