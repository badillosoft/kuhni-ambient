import React from "react";

export default props => {
  const { useContainer } = props;

  const container = useContainer("user");

  const [username, setUsername] = container("username", "");
  const [email, setEmail] = container("email", "");
  const [status, setStatus] = container("status", "not-set");

  return (
    <div className="d-flex flex-column p-5 border">
      <span>Estatus: {status}</span>
      <span>Usuario actual: {username}</span>
      <input
        className="form-control"
        disabled={status === "set"}
        value={username}
        placeholder="Nombre de usuario"
        onChange={event => {
          setUsername(event.target.value);
        }}
      />
      <span>Correo actual: {email}</span>
      <input
        className="form-control"
        disabled={status === "set"}
        type="email"
        value={email}
        placeholder="Correo"
        onChange={event => {
          setEmail(event.target.value);
        }}
      />
      <button
        className="btn btn-primary"
        disabled={status === "set"}
        onClick={() => {
          setStatus("set");
        }}
      >
        <i className="fas fa-save mr-2" />
        Guardar
      </button>
    </div>
  );
};
