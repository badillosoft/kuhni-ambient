import React, { useState, useEffect } from "react";

const options = {
  frutas: ["manzana", "mango", "pera", "plátano"],
  carros: ["audi", "ferrari", "tesla", "bocho"],
  animales: ["gato", "perro", "ratón", "pony"]
};

export default props => {
  const [selected, setSelected] = useState("frutas");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const selectedItems = options[selected] || [];
    setItems(selectedItems);
  }, [selected, setItems]);

  return (
    <div className="p-5">
      <p>
        Ahora que sabemos usar estados entendamos los efectos sobre los estados.
      </p>
      <p>
        <strong>
          Un efecto manda a llamar un callback cada que los estados dependientes
          cambian. Las dependencias de un estado son todas las variables/estados
          involucrados dentro del callback. El resultado del callback podrá ser
          opcionalmente una función que mande a liberar recursos, por ejemplo,
          limpiar intervalos creados dentro del callback o cancelar una llamada
          al api.
        </strong>
      </p>
      <p>
        <em>
          En el siguiente ejemplo se muestra una lista de opciones que cambian
          según la categoría seleccionada del selector.
        </em>
      </p>
      <pre>
        <code>
          {`
import React, { useState, useEffect } from "react";

const options = {
  frutas: ["manzana", "mango", "pera", "plátano"],
  carros: ["audi", "ferrari", "tesla", "bocho"],
  animales: ["gato", "perro", "ratón", "pony"]
};

export default props => {
  const [selected, setSelected] = useState("frutas");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const selectedItems = options[selected] || [];
    setItems(selectedItems);
  }, [selected, setItems, options]);

  return (
    <div className="p-5">
      <select
        onChange={event => {
          const selectedKey = event.target.value;
          setSelected(selectedKey);
        }}
      >
        {Object.entries(options).map(([key, items], index) => (
          <option key={\`option-\${index}\`} value={key}>
            {key.toUpperCase()}
          </option>
        ))}
      </select>
      <ul>
        {items.length === 0 ? (
          <code>Selecciona una opción</code>
        ) : (
          items.map((item, index) => <li key={\`item-\${index}\`}>{item}</li>)
        )}
      </ul>
    </div>
  );
            `}
        </code>
      </pre>
      <p>
        <em>Veamos el ejemplo funcionando.</em>
      </p>
      <div className="p-5">
        <select
          onChange={event => {
            const selectedKey = event.target.value;
            setSelected(selectedKey);
          }}
        >
          {Object.entries(options).map(([key, items], index) => (
            <option key={`option-${index}`} value={key}>
              {key.toUpperCase()}
            </option>
          ))}
        </select>
        <ul>
          {items.length === 0 ? (
            <code>Selecciona una opción</code>
          ) : (
            items.map((item, index) => <li key={`item-${index}`}>{item}</li>)
          )}
        </ul>
      </div>
      <p className="mt-2">
        Ahora ya sabes usar los efectos. Es importante que observes cómo el
        efecto está pendiente de los cambios que le ocurran a sus dependencias,
        para volver a llamar al callback. Esto significa que podemos hacer
        operaciones post-ajuste. Intenta crear varios estados en un componente,
        y luego basado en esos estados ajustar algún otro. Por ejemplo, un
        componente que ajuste dos fechas (en dos estados) y un efecto que
        calcule la diferencia en días (otro estado).
      </p>
      <a
        className="btn btn-primary btn-lg mr-2"
        href="#tutorial-2"
        role="button"
      >
        Inicio
      </a>
      <a className="btn btn-primary btn-lg" href="#tutorial-4" role="button">
        Siguiente
      </a>
    </div>
  );
};
