import React from "react";

export default props => {
  return (
    <div className="p-5">
      <p className="mt-2">
        Si observamos bien el código, es muy similar a utilizar{" "}
        <code className="mx-2">useState</code>. Sin embargo, la diferencia
        principal radica en que estamos utilizando un contenedor compartido. Eso
        quiere decir, que todo aquél que utilice el mismo componente puede
        acceder a los estados guardados dentro del contenedor.
      </p>
      <p className="mt-2">
        En el siguiente ejemplo, se muestra el componente{" "}
        <code className="mx-2">UserInfo</code>
        que muestra la información del contenedor del usuario.
      </p>
    </div>
  );
};
