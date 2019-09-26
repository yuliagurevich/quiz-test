import React from "react";
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import About from './About/About';
import Quizes from './Quizes/Quizes';

import "./App.css";

const App = () => {
  return (
    <Router>
      <header id="main-header"> 
        <nav>
          <ul id="main-menu-container">
            <li><NavLink to="/">About</NavLink></li>
            <li><NavLink to="/quizes">Quiz</NavLink></li>
          </ul>
        </nav>
      </header>
      <main className="main-container">
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/quizes" component={Quizes} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
