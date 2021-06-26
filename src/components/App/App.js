import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../../App.css';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </BrowserRouter> 
  );
}

export default App;
