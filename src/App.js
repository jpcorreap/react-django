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
  // Header
  // Menu
  // Router
  //  Busqueda
  //  Board
  return (
    <div>
      <Header />
      <BrowserRouter>
        <nav>
          <Link to="/">Map </Link>
          <Link to="/history">History</Link>
        </nav>

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
