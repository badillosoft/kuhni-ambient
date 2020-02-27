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
        setValue(JSON.parse(JSON.stringify(newValue)));
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
    window.location.hash || defaultUrl
  );

  // const [routeData, setRouteData] = useContextState(
  //   context,
  //   listeners,
  //   `${key}:data`,
  //   {}
  // );

  useEffect(() => {
    const listener = () => {
      const hash = window.location.hash || "#";
      // const storeKey = `kuhni@ambient/route:data${hash}`;
      // const data = JSON.parse(localStorage.getItem(storeKey) || "{}");
      // console.log("hash", hash, data, route);
      // setRouteData(data);
      setRoute(hash);
    };

    window.addEventListener("hashchange", listener);

    // console.log("route", route);

    window.location = route;

    return () => {
      window.removeEventListener("hashchange", listener);
    };
  }, [route, setRoute]);
  // }, [route, setRoute, setRouteData]);

  return route;
  // return [route, routeData];
};

export const Navigator = props => {
  const { routes } = props;
  return (
    <div className="d-flex flex-wrap mb-3">
      {(routes || []).map((route, index, items) => (
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
  );
};

export const Monitor = props => {
  const { block } = props;

  const [container, setContainer] = useState({});
  const [context, setContext] = useState({});
  const [listeners, setListeners] = useState({});
  const [route, setRoute] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (typeof block !== "function") {
      return;
    }

    const id = setInterval(() => {
      const {
        container: $container,
        context: $context,
        listeners: $listeners,
        route: $route,
        routes: $routes
      } = block();

      if (JSON.stringify($container) !== JSON.stringify(container)) {
        setContainer($container);
      }
      if (JSON.stringify($context) !== JSON.stringify(context)) {
        setContext($context);
      }
      if (JSON.stringify($listeners) !== JSON.stringify(listeners)) {
        setListeners($listeners);
      }
      if (JSON.stringify($route) !== JSON.stringify(route)) {
        setRoute($route);
      }
      if (JSON.stringify($routes) !== JSON.stringify(routes)) {
        setRoutes($routes);
      }
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, [block, container, context, listeners, route, routes]);

  return (
    <div className="d-flex flex-column">
      <div className="mb-3" />
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

export const Ambient = props => {
  const {
    routes: defaultRoutes,
    container: defaultContainer,
    context: defaultContext,
    listeners: defaultListeners
  } = props;

  const shareContextState = useContextState;
  const shareRouter = useRouter;

  const [routes] = useState(defaultRoutes || {});
  const [container] = useState(defaultContainer || {});
  const [context] = useState(defaultContext || {});
  const [listeners] = useState(defaultListeners || {});

  const route = useRouter(context, listeners);
  // const [route, routeData] = useRouter(context, listeners);

  const component = routes[route] || (() => <code>Not found {route}</code>);

  const components = component instanceof Array ? component : [component];

  const block = () => ({
    route,
    routes: JSON.parse(JSON.stringify(Object.keys(routes))),
    container: JSON.parse(JSON.stringify(container)),
    context: JSON.parse(JSON.stringify(context)),
    listeners: JSON.parse(
      JSON.stringify(
        Object.entries(listeners)
          .map(([key, listeners]) => [key, Object.keys(listeners)])
          .reduce(
            (object, [key, listeners]) => ({
              ...object,
              [key]: listeners
            }),
            {}
          )
      )
    ),
    useRouter: shareRouter,
    useContextState: shareContextState,
    navigate: (route = "#", force = false) => {
      window.location = `${route}${force ? `:${Number(new Date())}` : ""}`;
    },
    // navigate: (route = "#", data = {}) => {
    //   const storeKey = `kuhni@ambient/route:data${route}`;
    //   localStorage.setItem(storeKey, JSON.stringify(data));
    //   window.location = route;
    // },
    // navigateData: routeData,
    useContainer: (namespace = "common", token = "public") => {
      const secret = `${namespace}:${token}`;
      const context = (container[secret] = container[secret] || {});
      return (name, defaultValue) =>
        shareContextState(
          context,
          listeners,
          `${secret}@${name}`,
          defaultValue
        );
    }
  });

  return (
    <>
      {components.map((Block, index) => (
        <Block
          key={`block-${index}`}
          block={block}
          navigator={<Navigator routes={block().routes} />}
          monitor={<Monitor block={block} />}
          {...block()}
        />
      ))}
    </>
  );
};
