import React from "react";

export default props => {
  const { useContainer } = props;

  const container = useContainer("test", "ABC123");

  const [value, setValue] = container("value");

  return (
    <div className="d-flex flex-column border p-3">
      <code>{JSON.stringify(value)}</code>
      <button
        onClick={() => {
          setValue(
            Math.random()
              .toString(32)
              .slice(2)
          );
        }}
      >
        Ajustar valor aleatorio
      </button>
    </div>
  );
};
