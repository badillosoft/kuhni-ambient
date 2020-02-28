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
  defaultValue = null,
  container = {}
) => {
  console.log("context", context);
  container["@monitor:public"] = container["@monitor:public"] || {};
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
    context[name],
    newValue => {
      // console.log(Object.keys(listeners[name]));

      context[name] = newValue;

      for (let setValue of Object.values(listeners[name] || [])) {
        setValue(JSON.parse(JSON.stringify(newValue)));
      }

      container["@monitor:public"]["name"] = name;
      container["@monitor:public"]["value"] = JSON.stringify(newValue);
      // container["@monitor:public"][
      //   "@monitor:public@container"
      // ] = JSON.stringify(container);
      // container["@monitor:public"]["@monitor:public@context"] = JSON.stringify(
      //   context
      // );

      for (let setValue of Object.values(listeners["name"] || [])) {
        setValue(name);
      }
      for (let setValue of Object.values(listeners["value"] || [])) {
        setValue(JSON.parse(JSON.stringify(newValue)));
      }
    }
  ];
};

export const useRouter = (
  container = {},
  context,
  listeners,
  key = "route",
  defaultUrl = "#"
) => {
  context["@url:origin"] = context["@url:origin"] || defaultUrl;
  context["@url:target"] = context["@url:target"] || defaultUrl;

  const [route, setRoute] = useContextState(
    context,
    listeners,
    key,
    window.location.hash || defaultUrl,
    container
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

      if (hash.match(/^([^?]+)\?:\w+$/)) {
        const [url, token] = hash.match(/^([^?]+)\?:(\w+)$/).slice(1);
        context["@url"] = url;
        context["@url:origin"] = route;
        context["@url:target"] = url;
        context["@token"] = token;
        window.location = "#:loading";
        return;
      }

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
  }, [route, setRoute, context]);
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

  const monitorContainer = block().useContainer("@monitor");

  const [monitorName] = monitorContainer("name");
  const [monitorValue] = monitorContainer("value");

  const [container, setContainer] = useState({});
  const [context, setContext] = useState({});
  const [listeners, setListeners] = useState({});
  const [route, setRoute] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (typeof block !== "function") {
      return;
    }

    console.log("monitor", monitorName, monitorValue);

    const {
      container: $container,
      context: $context,
      listeners: $listeners,
      route: $route,
      routes: $routes
    } = block();

    const $containerFix = JSON.parse(JSON.stringify($container));
    const $listenersFix = JSON.parse(JSON.stringify($listeners));

    for (let key in $containerFix) {
      if (key.match(/^@monitor/)) {
        delete $containerFix[key];
      }
    }
    for (let key in $listenersFix) {
      if (key.match(/^@monitor/)) {
        delete $listenersFix[key];
      }
    }

    if (JSON.stringify($containerFix) !== JSON.stringify(container)) {
      setContainer($containerFix);
    }
    if (JSON.stringify($context) !== JSON.stringify(context)) {
      setContext($context);
    }
    if (JSON.stringify($listenersFix) !== JSON.stringify(listeners)) {
      setListeners($listenersFix);
    }
    if (JSON.stringify($route) !== JSON.stringify(route)) {
      setRoute($route);
    }
    if (JSON.stringify($routes) !== JSON.stringify(routes)) {
      setRoutes($routes);
    }
  }, [
    monitorName,
    monitorValue,
    block,
    container,
    context,
    listeners,
    route,
    routes
  ]);

  return (
    <div className="d-flex flex-column">
      <div className="mb-3" />
      <span>Monitor</span>
      <code>
        {monitorName || "null"}: {monitorValue || "null"}{" "}
        {`${new Date().toLocaleString()}`}
      </code>
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

  const route = useRouter(container, context, listeners);
  // const [route, routeData] = useRouter(container, context, listeners);

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
      window.location = `${route}${force ? `+:${Number(new Date())}` : ""}`;
    },
    // navigate: (route = "#", data = {}) => {
    //   const storeKey = `kuhni@ambient/route:data${route}`;
    //   localStorage.setItem(storeKey, JSON.stringify(data));
    //   window.location = route;
    // },
    // navigateData: routeData,
    useContainer: (namespace = "common", token = "public") => {
      const secret = `${namespace}:${token}`;
      const $context = (container[secret] = container[secret] || {});
      return (name, defaultValue) =>
        shareContextState(
          $context,
          listeners,
          // `${secret}@${name}`,
          name,
          defaultValue,
          container
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
