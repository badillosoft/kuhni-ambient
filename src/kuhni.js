// Kuhni Ambients (C) 2020
// Main Developer: Alan Badillo Salas
// Contact: badillo.soft@hotmail.com (@badillosoft on SM)
// Support: kuhnidev@gmail.com
// Github (dev): https://github.com/badillosoft/kuhni-ambient
// Github (prod): https://github.com/kuhnidev/kuhni-ambient
// MIT LICENSE

import React, { useState, useEffect } from "react";

const version = "v2003.05.0006";

// Change: Stop setContext log on BotAmbient

export const useContextState = (
  context,
  listeners,
  name = "default",
  defaultValue = null,
  container = {}
) => {
  container["@monitor:public"] = container["@monitor:public"] || {};
  context[name] = context[name] === undefined ? defaultValue : context[name];
  listeners[name] = listeners[name] || {};
  const [, setValue] = useState(context[name]);
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

export const shareContextState = (
  context,
  listeners,
  name = "default",
  defaultValue = null,
  container = {}
) => {
  container["@monitor:public"] = container["@monitor:public"] || {};
  context[name] = context[name] === undefined ? defaultValue : context[name];
  listeners[name] = listeners[name] || {};
  // const [, setValue] = context[name] || [
  //   null,
  //   () => {
  //     console.warn(`ShareContext:`, name);
  //   }
  // ];
  // const id = Math.random()
  //   .toString(32)
  //   .slice(2);
  // listeners[name][id] = setValue;
  return [
    context[name],
    newValue => {
      console.log("ACTUALIZANDO SCS", Object.keys(listeners[name]));

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
    listeners: defaultListeners,
    ui: defaultUI
  } = props;

  const shareContextState = useContextState;
  const shareRouter = useRouter;

  const [routes] = useState(defaultRoutes || {});
  const [container] = useState(defaultContainer || {});
  const [context] = useState(defaultContext || {});
  const [listeners] = useState(defaultListeners || {});
  const [ui] = useState(defaultUI || {});

  const route = useRouter(container, context, listeners);
  // const [route, routeData] = useRouter(container, context, listeners);

  const component = routes[route] || (() => <code>Not found {route}</code>);

  const components = component instanceof Array ? component : [component];

  const block = () => ({
    ui: new Proxy(ui, {
      get(target, name) {
        return target[name] || (() => <code>invalid ui {name}</code>);
      }
    }),
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
    },
    bots: {
      BotTester
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

export const BotTester = props => {
  const {
    controlId,
    control,
    title,
    description,
    showControlOnly,
    inputs: defaultInputs,
    outputs: defaultOutputs,
    setContext
  } = props;

  const Control = control || (() => <code>Control is not defined</code>);

  const [update, setUpdate] = useState(new Date());
  const [state, setState] = useState({
    inputKeys: {},
    outputKeys: {},
    inputs: {},
    outputs: {}
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (setContext) {
      setContext(state.inputs);
    }
  }, [state, setContext]);

  const [inputs, setInputs] = useState({});
  useEffect(() => {
    // console.log("di", defaultInputs);
    if (defaultInputs === undefined || defaultInputs === null) return;
    setInputs(defaultInputs);
  }, [defaultInputs]);

  const [outputs, setOutputs] = useState({});
  useEffect(() => {
    // console.log("do", defaultOutputs);
    if (defaultOutputs === undefined || defaultOutputs === null) return;
    setOutputs(defaultOutputs);
  }, [defaultOutputs]);

  const computeState = () => {
    state.inputs = Object.entries(inputs || {})
      .map(([key, value]) => {
        if (!/^@set/.test(value)) {
          state.inputKeys[key] = false;
          return [key, value];
        }
        const [, setterName, json] = value.match(/^@([^(]+)\(?(.*)/);

        // if (initialized && outputs[setterName]) {
        //   console.warn(
        //     `BotTester: Conflicto ${key}/@${setterName} <> ${setterName}`
        //   );
        //   console.warn(`Reemplaza @${setterName} por @${setterName}Temporal`);
        //   return [key, null];
        // }
        outputs[setterName] = newValue => {
          state.inputs[key] = newValue;
          // setState({ ...state });
          setUpdate(new Date());
        };
        // state.outputs = outputs;
        state.outputKeys[setterName] = true;
        state.inputKeys[key] = true;
        return [key, JSON.parse(json.slice(0, -1) || "null")];
      })
      .reduce((object, [key, value]) => {
        object[key] = value;
        return object;
      }, {});
    // console.log("COMPUTE", JSON.stringify(state));
    setState({ ...state });
    setInitialized(true);
    // setOutputs({ ...outputs });
  };

  useEffect(() => {
    // console.log("CHANGE INPUTS", controlId, inputs);
    computeState();
  }, [controlId, inputs]);

  useEffect(() => {
    // console.log("CHANGE OUTPUTS", controlId, outputs);
    state.outputs = Object.entries(outputs || {})
      .map(([key, setter]) => {
        state.outputKeys[key] = state.outputKeys[key] || false;
        return [
          key,
          newValue => {
            // computeState();
            setter(newValue, { ...state.inputs, ...state.outputs });
            // setUpdate(new Date());
          }
        ];
      })
      .reduce((object, [key, value]) => {
        object[key] = value;
        return object;
      }, {});
    setState({ ...state });
  }, [controlId, outputs]);

  // useEffect(() => {
  //   console.log("STATE", controlId, state);
  // }, [state, controlId]);

  if (showControlOnly) {
    return <Control {...state.inputs || {}} {...state.outputs || {}} />;
  }

  return (
    <div className="d-flex flex-column mb-5 p-3 border">
      <span>
        <strong>
          {title ||
            `Bot Tester - Replace this title (<BotTester title="..." />)`}
        </strong>
      </span>
      <span>
        {description ||
          `Replace this description (<BotTester description="..." />)`}
      </span>
      <div className="d-flex">
        <div className="d-flex flex-column m-2">
          <span className="text-secondary">Inputs:</span>
          <code>
            {Object.entries(state.inputKeys || {})
              .sort(([, sA], [, sB]) => Number(!sB) - Number(!sA))
              .map(([key, special]) => (special ? `*${key}` : key))
              .join(" ") || `Not inputs`}
          </code>
        </div>
        <div className="d-flex flex-column m-2 border-left pl-3">
          <span className="text-secondary">Outputs:</span>
          <code>
            {Object.entries(state.outputKeys || {})
              .sort(([, sA], [, sB]) => Number(!sB) - Number(!sA))
              .map(([key, special]) => (special ? `*${key}` : key))
              .join(" ") || `Not outputs`}
          </code>
        </div>
      </div>
      <div className="d-flex flex-column m-2">
        <span className="text-secondary">State:</span>
        <code>{JSON.stringify(state.inputs)}</code>
      </div>
      <div className="d-flex flex-column m-2">
        <span className="text-secondary mr-2">Update:</span>
        <code>{update.toISOString()}</code>
      </div>
      <div
        className="py-4 px-5 border"
        style={{ backgroundColor: "whitesmoke" }}
      >
        <Control {...state.inputs || {}} {...state.outputs || {}} />
      </div>
      <div className="mt-2 text-right">
        <span className="text-secondary">
          <small>
            <strong>kuhni.js</strong> - BotTester <code>{version}</code>
          </small>
        </span>
      </div>
    </div>
  );
};

export const BotValidator = props => {
  return null;
};

export const BotContainer = props => {
  const {
    debug,
    control,
    inputs: defaultInputs,
    outputs: defaultOutputs,
    states: defaultStates,
    listeners: defaultListeners
  } = props;

  const [listeners, setListeners] = useState({});
  useEffect(() => {
    setListeners(defaultListeners);
  }, [defaultListeners]);

  const [states, setStates] = useState({});
  useEffect(() => {
    setStates(defaultStates);
  }, [defaultStates]);

  const [inputs, setInputs] = useState({});
  useEffect(() => {
    if (defaultInputs === undefined || defaultInputs === null) return;
    setInputs(defaultInputs);
  }, [defaultInputs]);

  const [outputs, setOutputs] = useState({});
  useEffect(() => {
    if (defaultOutputs === undefined || defaultOutputs === null) return;
    setOutputs(defaultOutputs);
  }, [defaultOutputs]);

  const [computedInputs, setComputedInputs] = useState({});
  const [computedOutputs, setComputedOuputs] = useState({});

  const [currentId] = useState(
    Math.random()
      .toString(32)
      .slice(2)
  );

  useEffect(() => {
    const computedInputs = {};
    for (let [key, value] of Object.entries(inputs)) {
      const [contextName, keyName] = value.split(".");
      const [LocalContext] = states[contextName];
      computedInputs[key] = LocalContext[keyName];
    }
    setComputedInputs(computedInputs);
    console.log("IN", currentId, computedInputs);
  }, [inputs, states, currentId]);

  useEffect(() => {
    const computedOutputs = {};
    for (let [key, value] of Object.entries(outputs)) {
      const [contextName, expr] = value.split(".");
      const [, keyName, args] = expr.match(/^([^(]+)\(?(.*)/);
      computedOutputs[key] = newValue => {
        const data = args.slice(0, -1);
        const keyPre = keyName.replace("set", "");
        const keyPost = `${keyPre[0].toLowerCase()}${keyPre.slice(1)}`;
        // console.log("STATE A", JSON.stringify(states));
        const [LocalContext, setLocalContext] = states[contextName];

        let resultValue = newValue;

        if (data !== "value") {
          resultValue = JSON.parse(data);
        }

        LocalContext[keyPost] = resultValue;

        states[contextName] = [LocalContext, setLocalContext];
        setLocalContext({ ...LocalContext });
        // console.log("STATE B", JSON.stringify(states));
        // setStates({ ...states });
        // console.warn(contextName, keyPost, data, newValue);
      };
    }
    setComputedOuputs(computedOutputs);
    console.log("OUT", currentId, computedOutputs);
  }, [outputs, currentId]);

  return (
    <BotTester
      controlId={currentId}
      control={control}
      showControlOnly={!debug}
      inputs={computedInputs}
      outputs={computedOutputs}
      setContext={context => {
        console.log("context", context);
      }}
    />
  );
};

const BotContainerAppContainer = {};
const BotContainerAppListeners = {};

export const BotContainerDep = props => {
  const {
    control,
    inputs: defaultInputs,
    outputs: defaultOutputs,
    container: defaultContainer,
    listeners: defaultListeners
  } = props;

  const container = defaultContainer || BotContainerAppContainer;
  const listeners = defaultListeners || BotContainerAppListeners;

  const inputs = defaultInputs || {};
  const outputs = defaultOutputs || {};

  const Control = control || (() => <code>Control is not defined</code>);

  const [initialized, setInitialized] = useState(false);
  const [currentInputs, setCurrentInputs] = useState({});
  const [currentOutputs, setCurrentOutputs] = useState({});
  const [currentId] = useState(
    Math.random()
      .toString(32)
      .slice(2)
  );

  useEffect(() => {
    if (!initialized) {
      const containers = {};

      for (let [key, value] of [
        ...Object.entries(inputs),
        ...Object.entries(outputs)
      ].filter(([, value]) => /#[^>]+>.+/.test(value))) {
        const [, containerChain, keyName] = value.match(/#([^>]+)>(.+)/);
        const [containerName, containerNamespace] = containerChain
          .replace(/-+$/, "")
          .split("!");
        // console.log(containerChain, containerName, containerNamespace, keyName);
        containers[containerName] = containers[containerName] || {};
        containers[containerName][containerNamespace] =
          containers[containerName][containerNamespace] || {};
        if (containers[containerName][containerNamespace][keyName]) continue;
        const secret = `${containerName}:${containerNamespace}`;
        const $context = (container[secret] = container[secret] || {});
        listeners[`${secret}:${keyName}`] =
          listeners[`${secret}:${keyName}`] || {};
        const [getter, setter] = [
          $context[keyName] || null,
          (newValue, death = false) => {
            // console.log("ACTUALIZANDO", key, keyName, newValue);
            $context[keyName] = newValue;
            inputs[key] = newValue;
            setCurrentInputs({
              ...inputs
            });

            if (death) {
              return;
            }

            // Notifica
            // console.log(listeners[`${secret}:${keyName}`]);
            for (let $setter of Object.values(
              listeners[`${secret}:${keyName}`] || {}
            )) {
              $setter(newValue, true);
            }
          }
        ];
        listeners[`${secret}:${keyName}`][currentId] = setter;
        containers[containerName][containerNamespace][keyName] = [key, value];
        inputs[key] = getter;

        outputs[`set${key[0].toUpperCase()}${key.slice(1)}`] = setter;
      }

      // console.log(containers);
      // console.log(inputs, outputs);

      setCurrentInputs(inputs);
      setCurrentOutputs(outputs);

      setInitialized(true);
    }
  }, [currentId, inputs, outputs, container, initialized, listeners]);

  useEffect(() => {
    // console.log("inputs", currentInputs);
    // console.log("outputs", currentOutputs);
  }, [currentInputs, currentOutputs]);

  return <Control {...currentInputs} {...currentOutputs} />;
};
