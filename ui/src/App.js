import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
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
import ProductsTile from "./components/products-tile"
import Sales from "./components/sales.js"
import Login from "./components/login.js"
import axios from "axios";

import config from "./config.json"
import UserList from "./components/user-list";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {userData: null}

    const self = this;
    window.addEventListener("userChanged", e => {this.updateUserData(self)})

    this.logout = this.logout.bind(this);
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


  logout() {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userChanged"));
    this.setState({redirect:"/"})
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

    const userData = this.state.userData;

    if(this.state.redirect){
      this.setState({redirect: null});
      return <Router><Navigate to={this.state.redirect} replace /></Router>
    }

    return (
      <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" target="_blank">
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
                    <button onClick={this.logout} className="nav-link">Logout</button>
                  </li>
                }
              </ul>
            </div>
          </nav>
          <Routes>
            <Route path="/create" element={<CreateProduct/>}/>
            <Route path="/list" element={<ProductList/>}/>
            <Route path="/recieving" element={<ProductsTile target="/recieving/"/>}/>
            <Route path="/sales" element={<Sales/>}/>
            <Route path="/cash" element={<Cash/>}/>
            <Route path="/purchasing" element={<Purchasing/>}/>
            <Route path="/credit" element={<Credit/>}/>
            <Route path="/customer" element={<Customer/>}/>
            <Route path="/inventory" element={<Inventory/>}/>
            <Route path="/receipt" element={<Receipt/>}/>
            <Route path="/create_user" element={<CreateUser/>}/>
            <Route path="/management" element={<UserList/>}/>

            {!userData &&
              <Route path="/" element={<Login/>}></Route>
            }
            <Route path="/login" element={<Login/>}/>
        </Routes>

        </div>
      </Router>
    );
  }
}
export default App;
