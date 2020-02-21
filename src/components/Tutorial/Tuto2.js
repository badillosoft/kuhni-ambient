import React, { useState } from "react";

export default props => {
  const [value, setValue] = useState("valor inicial");
  const [status, setStatus] = useState("estatus inicial");

  return (
    <div className="p-5">
      <p>Sigamos por retener estados dentro del componente.</p>
      <p>
        <strong>
          Los estados son una pareja de una variable y una función que ajusta la
          variable que persisten mientras el componente está vivo y no se
          modifica el valor de la variable a menos que se haga mediante el
          ajustador.
        </strong>
      </p>
      <p>
        <em>
          En el siguiente ejemplo se muestra una caja de texto que retiene el
          valor de lo que va escribiendo en el estado. Otro estado adicional
          retiene el estado que indica si la caja de texto se encuentra vacía o
          no.
        </em>
      </p>
      <pre>
        <code>
          {`
              import React, { useState } from "react";

              export default props => {
                const [value, setValue] = useState("valor inicial");
                const [status, setStatus] = useState("estatus inicial");
                
                return <div>Vista</div>;
              };
            `}
        </code>
      </pre>
      <p>
        <em>Veamos el ejemplo funcionando.</em>
      </p>
      <div className="d-flex flex-column">
        <input
          className="form-control"
          value={value}
          onChange={event => {
            const newValue = event.target.value;

            setValue(newValue);

            setStatus(
              newValue
                ? "La caja SI tiene texto :D"
                : "La caja NO tiene texto :("
            );
          }}
        />
        <span>Estatus: {status}</span>
      </div>
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
