import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import routes from "./routes";
import { Breadcrumbs } from "./Components/index";

const App = () => (
  <Router>
    <div className="w-screen h-screen flex justify-center p-8">
      <Switch>
        {routes.map(({ path, name, Component }, key) => (
          <Route
            exact
            path={path}
            key={key}
            render={props => {
              const crumbs = routes
              .filter(({ path }) => props.match.path.includes(path))
              .map(({ path, ...rest }) => ({
                path: Object.keys(props.match.params).length
                  ? Object.keys(props.match.params).reduce(
                    (path, param) =>
                      path.replace(`:${param}`, props.match.params[param]),
                    path
                  )
                  : path,
                ...rest,
              }));
              return (
                <div className="p-8">
                  <Breadcrumbs crumbs={crumbs} />
                  <Component {...props} />
                </div>
              );
            }}
          />
        ))}
      </Switch>
    </div>
  </Router>
);

export default App;
