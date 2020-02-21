import React from "react";

export default props => {
  const { useContainer } = props;

  const container = useContainer("user");

  const [username] = container("username", "");
  const [email] = container("email", "");
  const [status] = container("status", "not-set");

  return (
    <div className="d-flex flex-column p-5 border">
      <span>Estatus: {status}</span>
      <span>Usuario actual: {username}</span>
      <span>Correo actual: {email}</span>
    </div>
  );
};
