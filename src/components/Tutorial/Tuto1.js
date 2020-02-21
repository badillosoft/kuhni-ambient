import React from "react";

export default props => {
  return (
    <div className="p-5">
      <p>
        Vamos a empezar por entender los conceptos principales del desarrollo
        por bloques o piezas de código.
      </p>
      <p>
        <strong>
          En react una pieza de código equivaldrá a un componente funcional
        </strong>
      </p>
      <p>
        <em>
          <strong>Modo estándar:</strong> Se exporta una función flecha por
          defecto. La función flecha recibe las propiedades del componente. Se
          utiliza cuándo sólo se exporta un componente.
        </em>
      </p>
      <pre>
        <code>
          {`
import React from "react";

export default props => {
  // ... lógica
  return <div>Vista</div>;
};
            `}
        </code>
      </pre>
      <p>
        <em>
          <strong>Modo canónico:</strong> Se exporta una constante a la que se
          le asigna una función. Se usa cuándo se exportan varios componentes.{" "}
          <span className="text-danger">
            No es buena práctica definir más de un componente por archivo.
          </span>
        </em>
      </p>
      <pre>
        <code>
          {`
import React from "react";

export const MiComponente = props => {
  // ... lógica
  return <div>Vista</div>;
};
            `}
        </code>
      </pre>
      <p>
        <em>
          <strong>Modo tedioso:</strong> Se exporta una función anónima que
          representa el componente.{" "}
          <span className="text-danger">
            No se recomienda usar esta forma en ningún caso, es mala práctica
            (tentación de usar <code>this</code>).
          </span>
        </em>
      </p>
      <pre>
        <code>
          {`
import React from "react";

export function (props) {
  // ... lógica
  return <div>Vista</div>;
};
            `}
        </code>
      </pre>
      <p>
        <em>
          <strong>Modo nunca aconsejado:</strong> Se exporta una clase que
          instancia un componente.{" "}
          <span className="text-danger">
            En ningún caso hagas esto ya que no sería un componente funcional,
            por favor evítalo. (tentación de usar <code>this</code>).
          </span>
        </em>
      </p>
      <pre>
        <code>
          {`
import React from "react";

export class MiComponente extends React.Component {
  // ... hell here
}
            `}
        </code>
      </pre>
      <p>
        Ahora ya sabes crear un componente. Por favor intenta aprender sólo el{" "}
        <strong>Modo Estándar</strong>
      </p>
      <a className="btn btn-primary btn-lg mr-2" href="#home" role="button">
        Inicio
      </a>
      <a className="btn btn-primary btn-lg" href="#tutorial-2" role="button">
        Siguiente
      </a>
    </div>
  );
};
