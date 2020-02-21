// Kuhni Ambients (C) 2020
// Main Developer: Alan Badillo Salas
// Contact: badillo.soft@hotmail.com (@badillosoft on SM)
// Support: kuhnidev@gmail.com
// Github (dev): https://github.com/badillosoft/kuhni-ambient
// Github (prod): https://github.com/kuhnidev/kuhni-ambient
// MIT LICENSE

import React, { useState, useEffect } from "react";

export const useContextState = (
  context,
  listeners,
  name = "default",
  defaultValue = null
) => {
  context[name] = context[name] === undefined ? defaultValue : context[name];
  listeners[name] = listeners[name] || {};
  const [value, setValue] = useState(context[name]);
  const [id] = useState(
    Math.random()
      .toString(32)
      .slice(2)
  );
  useEffect(() => {
    listeners[name][id] = setValue;
    return () => {
      delete listeners[name][id];
    };
  }, [id, name, context, listeners]);
  return [
    value,
    newValue => {
      // console.log(Object.keys(listeners[name]));
      context[name] = newValue;
      for (let setValue of Object.values(listeners[name])) {
        setValue(newValue);
      }
    }
  ];
};

export const useRouter = (
  context,
  listeners,
  key = "route",
  defaultUrl = "#"
) => {
  const [route, setRoute] = useContextState(
    context,
    listeners,
    key,
    defaultUrl
  );

  const [routeData, setRouteData] = useContextState(
    context,
    listeners,
    `${key}:data`,
    {}
  );

  useEffect(() => {
    const listener = () => {
      const hash = window.location.hash || "#";
      const storeKey = `kuhni@ambient/route:data${hash}`;
      const data = JSON.parse(localStorage.getItem(storeKey) || "{}");
      setRouteData(data);
      setRoute(hash);
    };

    window.addEventListener("hashchange", listener);

    // console.log("route", route);

    window.location = route;

    return () => {
      window.removeEventListener("hashchange", listener);
    };
  }, [route, setRoute, setRouteData]);

  return [route, routeData];
};

export const Ambient = props => {
  const {
    routes: defaultRoutes,
    context: defaultContext,
    listeners: defaultListeners,
    container: defaultContainer
  } = props;

  const shareContextState = useContextState;
  const shareRouter = useRouter;

  const [routes] = useState(defaultRoutes || {});
  const [context] = useState(defaultContext || {});
  const [listeners] = useState(defaultListeners || {});
  const [container] = useState(defaultContainer || {});

  const [route, routeData] = useRouter(context, listeners);

  const component = routes[route] || (() => <code>Not found {route}</code>);

  const components = component instanceof Array ? component : [component];

  return (
    <>
      {components.map((Block, index) => (
        <Block
          key={`block-${index}`}
          context={context}
          listeners={listeners}
          container={container}
          useRouter={shareRouter}
          useContextState={shareContextState}
          navigate={(route = "#", data = {}) => {
            const storeKey = `kuhni@ambient/route:data${route}`;
            localStorage.setItem(storeKey, JSON.stringify(data));
            window.location = route;
          }}
          navigateData={routeData}
          useContainer={(namespace = "common", token = "public") => {
            const context = (container[`${namespace}:${token}`] =
              container[`${namespace}:${token}`] || {});
            return (name, defaultValue) =>
              shareContextState(context, listeners, name, defaultValue);
          }}
        />
      ))}
    </>
  );
};
