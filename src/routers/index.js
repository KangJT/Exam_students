import React from "react";
import { Router, Switch } from "dva/router";
import routers from "./routerMap";
import mapRouter from "./mapRoutersToProps";
function RouterView({ history }) {
  return (
    <Router history={history}>
      <Switch>{mapRouter(routers)}</Switch>
    </Router>
  );
}
export default RouterView;


