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
  
  return (
    <div className="d-flex flex-column p-5">
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
  );
};
            `}
        </code>
      </pre>
      <p>
        <em>Veamos el ejemplo funcionando.</em>
      </p>
      <div className="d-flex flex-column p-5">
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
      <p className="mt-2">
        Ahora ya sabes usar los estados, recuerda usar un estado por cada valor
        que pueda cambiar dentro de tu componente. En react no sirven las
        variables tradicionales (<code>const</code> y <code>let</code>) para
        retener datos. Usa los estados para saber el estado actual dentro de tu
        componente, piensa que siempre retendrá el último valor ajustado por el
        ajustador o el primero que se definió al crearlo.
      </p>
      <a
        className="btn btn-primary btn-lg mr-2"
        href="#tutorial-1"
        role="button"
      >
        Inicio
      </a>
      <a className="btn btn-primary btn-lg" href="#tutorial-3" role="button">
        Siguiente
      </a>
    </div>
  );
};
