import React from "react";

export default props => {
  const { useContainer } = props;

  const container = useContainer("test");

  const [value, setValue] = container("value");

  return (
    <div className="d-flex flex-column border p-3">
      <code>{JSON.stringify(value)}</code>
      <button
        onClick={() => {
          setValue(new Date());
        }}
      >
        Ajustar fecha
      </button>
    </div>
  );
};
