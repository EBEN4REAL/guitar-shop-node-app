import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Layout from './hoc/Layout';
import RegisterLogin from  './components/Register_login';
import Register from './components/Register_login/register';
import UserDashboard from './components/User';
import Auth from './hoc/auth'
import Shop from './components/shop/shopIndex';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />

        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
      </Switch>
    </Layout>
    
  )
}


  

export default Routes;
