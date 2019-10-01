 import React from "react";
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import About from './About/About';
import Quizes from './Quizes/Quizes';

import "./App.css";

const App = () => {
  return (
    <Router>
      <header> 
        <nav id="main-menu-container">
          <ul>
            <NavLink to="/"><li>About</li></NavLink>
            <NavLink to="/quizes"><li>Quiz</li></NavLink>
          </ul>
        </nav>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/quizes" component={Quizes} />
        </Switch>
    </main>
    </Router>
  );
};

export default App;
