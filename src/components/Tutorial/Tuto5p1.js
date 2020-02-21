import React from "react";

export default props => {
  return (
    <div className="p-5">
      <p>
        Bien, ahora que sabes que <code className="mx-2">{`<Ambient />`}</code>{" "}
        monta por ti el componente especificado para la ruta (o muestra un{" "}
        <code className="mx-2">Not found</code>). Debemos entonces saber que
        propiedades recibirá nuestro componente.
      </p>
      <p>
        <strong>
          Las propiedades pasadas al componente auto-montado serán
          principalmente
          <code className="mx-2">useContainer</code>,{" "}
          <code className="mx-2">navigate</code> y{" "}
          <code className="mx-2">navigateData</code>.
        </strong>
      </p>
      <p>
        La función <code className="mx-2">useContainer</code> nos va a permitir
        crear un contenedor compartido con otros componentes que almacene
        estados compartidos. Un contenedor es una función dentro del contenedor
        que almacenará estados en espacios compartidos con los que puedan
        acceder al contenedor.
      </p>
      <p>
        <em>
          En el siguiente ejemplo se crea un contenedor que utiliza un estado
          compartido con todas aquellos componentes que se suscriban al mismo
          contenedor. Este contenedor será público y sus estados serán
          compartidos. El ejemplo muestra un formulario que captura el nombre y
          correo de una persona (Componente{" "}
          <code className="mx-2">UserForm</code>).
        </em>
      </p>
    </div>
  );
};
