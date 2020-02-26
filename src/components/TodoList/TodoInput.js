import React, { useState } from "react";

export default props => {
  const { useContainer } = props;

  const container = useContainer("todo");

  const [list, setList] = container("list", []);

  const [text, setText] = useState("");

  return (
    <input
      className="form-control"
      type="text"
      placeholder="Escribe algo por hacer..."
      value={text}
      onChange={event => {
        setText(event.target.value);
      }}
      onKeyPress={event => {
        if (event.key === "Enter") {
          setList([
            ...list,
            {
              title: text,
              checked: false
            }
          ]);
          setText("");
        }
      }}
    />
  );
};
