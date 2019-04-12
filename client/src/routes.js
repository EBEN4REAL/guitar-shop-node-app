import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Auth from './hoc/auth'
import Layout from './hoc/Layout';

import Shop from './components/shop/shopIndex';
import RegisterLogin from  './components/Register_login';
import Register from './components/Register_login/register';
import Home from './components/Home';
import  ProductDetail from './components/Product';

import UserDashboard from './components/User';
import AddProdcut from '../src/components/User/Admin/add_product';
import ManageCategories from './components/User/Admin/ManageCategoris';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProdcut, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories , true)} />

        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/product_detail/:id" exact component={Auth(ProductDetail, null)} />
        
      </Switch>
    </Layout>
    
  )
}


  

export default Routes;
