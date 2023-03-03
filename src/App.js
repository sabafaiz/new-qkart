import React from 'react'
import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Product from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from './components/Thanks'
// import Products from "./components/Products";
// import { ThemeProvider } from "@emotion/react";
// import theme from "./theme";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
  
  <Switch>
    <Route path="/Register">
      <Register />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route  path="/checkout">
      <Checkout /> 
    </Route>
    <Route  path="/Thanks">
      <Thanks /> 
    </Route>
    <Route path="/">
      <Product />
    </Route>

  </Switch>
    </div>
  );
}

export default App;
