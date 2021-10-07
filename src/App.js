import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import { Home } from './Components/Home'
import Login from './Components/Login'
import { NotFound } from './Components/NotFound'
import SignUp from './Components/SignUp'
import Header from './Components/Header'
import Products from './Components/Products'
import { AddProducts } from './Components/AddProducts'
import {Customprint} from './Components/Customprint'
import {Aboutus} from './Components/Aboutus'
import {Contact} from './Components/Contact'
import {Cart} from './Components/Cart'

export const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>      
         <Route exact path="/" component = {Products}/>
         <Route path="/singup" component = {SignUp}/>
         <Route path="/login" component = {Login}/>
         <Route path="/cart" component = {Cart}/>
         <Route path="/customprint" component = {Customprint}/>
         <Route path="/aboutus" component = {Aboutus}/>
         <Route path="/contact" component = {Contact}/>
         <Route path="/add-products" component={AddProducts}/>
         <Route component = {NotFound}/>
      </Switch>      
    </Router>
  )
}

export default App