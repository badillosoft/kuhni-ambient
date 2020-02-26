import React from "react";

export default props => {
  const { useContainer } = props;

  const container = useContainer("todo");

  const [list, setList] = container("list", []);

  if (list.length === 0) {
    return (
      <span>
        <em>(No hay elementos)</em>
      </span>
    );
  }

  return (
    <ul className="list-unstyled">
      {list.map((item, index) => (
        <li key={`item-${index}`}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={event => {
              item.checked = event.target.checked;
              setList(list);
            }}
          />{" "}
          {item.checked ? (
            <span>
              <del>{item.title}</del>
            </span>
          ) : (
            <span>{item.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
};
