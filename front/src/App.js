import React from "react";
import Header from "./components/Header.js";
import Board from "./components/Board.js";
import History from "./components/History.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <div className="row" id="navegationMenu">
          <Link to="/">
            <h2 className="menu">Map</h2>
          </Link>
          <Link to="/history">
            <h2 className="menu">History</h2>
          </Link>
        </div>

        <Switch>
          <Route exact path="/">
            <Board />
          </Route>
          <Route path="/history">
            <History />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
