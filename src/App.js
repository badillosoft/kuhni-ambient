import React from "react";

import "./styles.css";

import { Ambient } from "./kuhni";

import routes from "./routes";

export default function App() {
  return (
    <div className="App">
      <Ambient routes={routes} />
    </div>
  );
}
