import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.svg"

import Cash from "./components/cash.js"
import CreateProduct from "./components/product-create.js"
import ProductList from "./components/product-list";
import Credit from "./components/credit.js"
import Customer from "./components/customer.js"
import Inventory from "./components/inventory.js"
import CreateUser from "./components/create-user.js"
import Purchasing from "./components/purchasing.js"
import Receipt from "./components/receipt.js"
import Recieving from "./components/recieving.js"
import Sales from "./components/sales.js"
import Login from "./components/login.js"
import axios from "axios";

import config from "./config.json"

class App extends Component {
  constructor(props){
    super(props);

    this.state = {userData: null}

    const self = this;
    window.addEventListener("userChanged", e => {this.updateUserData(self)})
  }

  componentDidMount(){
    this.updateUserData(this);
  }

  updateUserData(self){
    console.log("Updating user data")
    var token = localStorage.getItem("token");

    if(token){
      axios.post(config.API_URL + "/users/data", {token: token}).then(res=>{
        self.setState({userData:res.data});
      })
    }else{
      self.setState({userData: null});
    }
  }

  render() {

    function NavButton(props) {
      if(props.condition)
        return (
            <li className="navbar-item">
              <Link to={props.to} className="nav-link">{props.name}</Link>
            </li>
        )
    }

    function Logout(props) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("userChanged"));
      return (
        <Redirect to="/login"></Redirect>
      )
    }

    const userData = this.state.userData;

    return (
      <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" target="_blank">
              <img src={logo} width="30" height="30"/>
            </a>
            <Link to="/" className="navbar-brand">Inventory Manager</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                { userData && 
                  <>
                  <NavButton to="/create" name="Create Product" condition={userData.product}/>
                  <NavButton to="/list" name="Product List" condition={userData.product}/>
                  <NavButton to="/recieving" name="Recieving" condition={userData.recieving}/>
                  <NavButton to="/sales" name="Sales" condition={userData.sales}/>
                  <NavButton to="/cash" name="Cash" condition={userData.cash}/>
                  <NavButton to="/purchasing" name="Purchasing" condition={userData.purchasing}/>
                  <NavButton to="/credit" name="Credit" condition={userData.credit}/>
                  <NavButton to="/customer" name="Customer" condition={userData.customer}/>
                  <NavButton to="/inventory" name="Inventory" condition={userData.inventory}/>
                  <NavButton to="/receipt" name="Receipt" condition={userData.receipt}/>
                  <NavButton to="/management" name="Management" condition={userData.management}/>
                  </>
                }
                {!userData &&
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                }
                {
                  userData &&
                  <li className="navbar-item">
                    <Link to="/logout" className="nav-link">Logout</Link>
                  </li>
                }
              </ul>
            </div>
          </nav>
          <Route path="/create" component={CreateProduct}/>
          <Route path="/list" component={ProductList}/>
          <Route path="/recieving" component={Recieving}/>
          <Route path="/sales" component={Sales}/>
          <Route path="/cash" component={Cash}/>
          <Route path="/purchasing" component={Purchasing}/>
          <Route path="/credit" component={Credit}/>
          <Route path="/customer" component={Customer}/>
          <Route path="/inventory" component={Inventory}/>
          <Route path="/receipt" component={Receipt}/>
          <Route path="/management" component={CreateUser}/>
          <Route path="/logout" component={Logout}/>

          {!userData &&
            <Route path="/" component={Login}></Route>
          }

          {userData &&
            <Route path="/login" component={Login}/>
          }

        </div>
      </Router>
    );
  }
}
export default App;
