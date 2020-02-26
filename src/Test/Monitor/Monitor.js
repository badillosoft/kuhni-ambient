import React from "react";

export default props => {
  const { context, container, route, routes, listeners } = props;

  return (
    <div className="d-flex flex-column">
      <span>Container</span>
      <code>{JSON.stringify(container)}</code>
      <div className="mb-3" />
      <span>Context</span>
      <code>{JSON.stringify(context)}</code>
      <div className="mb-3" />
      <span>Listeners</span>
      <code>{JSON.stringify(listeners)}</code>
      <div className="mb-3" />
      <span>Route</span>
      <code>{JSON.stringify(route)}</code>
      <div className="mb-3" />
      <span>Routers</span>
      <code>{JSON.stringify(routes)}</code>
    </div>
  );
};
