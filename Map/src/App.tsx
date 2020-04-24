import React, {Component} from 'react';
import Map from './pages/Map';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/' component={Map}/>
        </Switch>
      )
  }
}

export default App;
