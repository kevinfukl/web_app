import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import BasicLayout from './layout/BasicLayout'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import Updatepwd from './pages/updatepwd'


function App() {
  return (
    <HashRouter>
      <Switch>
        <BasicLayout>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login} />
          <Route path="/updatepwd" component={Updatepwd} />
          <Route path="/register" component={Register} />
        </BasicLayout>
      </Switch>
    </HashRouter>
  );
}

export default App;
