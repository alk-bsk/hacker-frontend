import React from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import Login from '../components/Login';
import Hacker from '../components/Hacker';
import HackerDetails from '../components/HackerDetails';

function App(props) {
  return (
    <Router>
        <Switch>
          <Route exact  path='/' component={Login} /> 
          <Route exact  path='/hackers' component={Hacker} /> 
          <Route exact  path='/hackers/:id' component={HackerDetails} />       
        </Switch>
    </Router>
  );
}

export default App;
