import React from "react";

export default props => {
  return (
    <div className="p-5">
      <p>
        Bien ya tenemos lo indispensable para comezar a usar la librería{" "}
        <strong>kuhni.js</strong>. En el archivo <code>App.js</code> se ha
        creado un ambiente usando <code>{`<Ambient />`}</code>. Este ambiente se
        encarga de montar nuestros componentes usando las rutas especificadas en
        el archivo
        <code>routes.js</code>. Revisa el archivo y te darás cuenta que sólo
        expone rutas como las siguientes:
      </p>
      <pre>
        <code>
          {`
import Home from "./components/Home/Home";
import Hello from "./components/Hello/Hello";

export default {
  "#": Home,
  "#home": Home,
  "#hello": Hello
};
            `}
        </code>
      </pre>
      <p>
        Así, al llamar a la ruta <a href="#home">#home</a> navegaremos al
        componente <code>{`<Home />`}</code>.
      </p>
      <p>
        <strong>
          El componente <code>{`<Ambient />`}</code> se encarga de montar
          nuestros componentes según la definición del archivo{" "}
          <code>routes.js</code>.
        </strong>
      </p>
      <p>
        Ahora ya sabes como funciona el ambiente. Por favor intenta crear un
        nuevo componente en su propia carpeta dentro de la carpeta{" "}
        <code>components</code>. Enlaza tu componente a una ruta por ejemplo la
        ruta <a href="#foo">#foo</a>.
      </p>
      <a
        className="btn btn-primary btn-lg mr-2"
        href="#tutorial-3"
        role="button"
      >
        Inicio
      </a>
      <a className="btn btn-primary btn-lg" href="#tutorial-5" role="button">
        Siguiente
      </a>
    </div>
  );
};
