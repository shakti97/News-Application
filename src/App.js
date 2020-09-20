import React from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import NewsBoard from "./Components/NewsBoard";
import Constant from "./Constants/Constant";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/:category" exact component={NewsBoard} />
        <Route
          path="/"
          exact
          render={() => <Redirect to={`/${Constant.CATEGORY[0]}`} />}
        />
      </Switch>
    </div>
  );
}

export default App;
