import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AssetAllocation from './asset-allocation/AssetAllocation';
import Header from './header/Header';
import Home from './home/Home';

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/asset-allocation">
            <AssetAllocation />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
