import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.svg"

import Cash from "./components/cash.js"
import CreateProduct from "./components/create-product.js"
import ProductList from "./components/product-list";
import Credit from "./components/credit.js"
import Customer from "./components/customer.js"
import Inventory from "./components/inventory.js"
import Management from "./components/management.js"
import Purchasing from "./components/purchasing.js"
import Receipt from "./components/receipt.js"
import Recieving from "./components/recieving.js"
import Sales from "./components/sales.js"

class App extends Component {
  render() {
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
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Product</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/list" className="nav-link">Product List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/recieving" className="nav-link">Recieving</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/sales" className="nav-link">Sales</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/cash" className="nav-link">Cash</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/purchasing" className="nav-link">Purchasing</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/credit" className="nav-link">Credit</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/customer" className="nav-link">Customer</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/inventory" className="nav-link">Inventory</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/receipt" className="nav-link">Receipt</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/management" className="nav-link">User Management</Link>
                </li>
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
          <Route path="/management" component={Management}/>
        </div>
      </Router>
    );
  }
}
export default App;
