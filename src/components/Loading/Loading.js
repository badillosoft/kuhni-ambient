import React from "react";

export default props => {
  const { context } = props;

  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <span className="pb-3">
        <i className="fas fa-spinner fa-spin" />
      </span>
      <span>
        <i className="fab fa-keybase" />{" "}
        <code>{context["@token"] || "null"}</code>
      </span>
      <a href={context["@url"] || "#"}>{context["@url"] || "#"}</a>
    </div>
  );
};
