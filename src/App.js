import React from "react";

import "./styles.css";

import { Ambient } from "./kuhni";

import routes from "./routes";

export default function App() {
  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap mb-3">
        {Object.keys(routes).map((route, index, items) => (
          <div key={`link-${index}`} className="d-flex mr-2">
            <a className="mr-2" href={route}>
              {route}
            </a>
            {index + 1 < items.length ? (
              <span className="text-secondary">/</span>
            ) : null}
          </div>
        ))}
      </div>
      <Ambient routes={routes} />
    </div>
  );
}
