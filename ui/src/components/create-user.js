import axios from 'axios';
import React, { Component } from 'react';

import config from "../config.json"

export default class CreateUser extends Component {
    getDefaultState(){
        return {
            username: null,
            password: null,
            product: false,
            recieving: false,
            sales: false,
            cash: false,
            purchasing: false,
            credit: false,
            customer: false,
            inventory: false,
            receipt: false,
            management: false.valueOf,
            errorMessage: null
        }
    }

    constructor(props) {
        super(props);

        this.state = this.getDefaultState()

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.onProductChange = this.onProductChange.bind(this);
        this.onRecievingChange = this.onRecievingChange.bind(this);
        this.onSalesChange = this.onSalesChange.bind(this);
        this.onCashChange = this.onCashChange.bind(this);
        this.onPurchasingChange = this.onPurchasingChange.bind(this);
        this.onCreditChange = this.onCreditChange.bind(this);
        this.onCustomerChange = this.onCustomerChange.bind(this);
        this.onInventoryChange = this.onInventoryChange.bind(this);
        this.onReceiptChange = this.onReceiptChange.bind(this);
        this.onManagementChange = this.onManagementChange.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(e){
        this.setState({username: e.target.value});
    }

    onPasswordChange(e){
        this.setState({password: e.target.value});
    }

    onProductChange(e){
        this.setState({product: e.target.checked})
    }

    onRecievingChange(e){
        this.setState({recieving: e.target.checked})
    }

    onSalesChange(e){
        this.setState({sales: e.target.checked})
    }

    onCashChange(e){
        this.setState({cash: e.target.checked})
    }

    onPurchasingChange(e){
        this.setState({purchasing: e.target.checked})
    }

    onCreditChange(e){
        this.setState({credit: e.target.checked})
    }
    
    onCustomerChange(e){
        this.setState({customer: e.target.checked})
    }

    onInventoryChange(e){
        this.setState({inventory: e.target.checked})
    }

    onReceiptChange(e){
        this.setState({receipt: e.target.checked})
    }

    onManagementChange(e){
        this.setState({management: e.target.checked})
    }

    onSubmit(e){
        e.preventDefault()

        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const stateCopy = this.state;
        axios.post(config.API_URL + "/management/register", stateCopy, axiosConfig).then(res => {
                this.setState({errorMessage: "Success"});
        }).catch(err => {
            console.log(err.response.statusText);
            this.setState({errorMessage: err.response.statusText});
        });

    }

    render(){
        console.log(this.state);
        return (
            <div style={{marginTop: 10}}>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
                {this.state.errorMessage && <div class="alert alert-danger" role="alert">
                    {this.state.errorMessage}    
                </div>}
                <div className='form-group'>
                    <label>Username: </label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.onUsernameChange} />
                </div>
                <div className='form-group'>
                    <label>Password: </label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.onPasswordChange} />
                </div>
                <h4>Roles</h4>
                <div className="form-check">
                    <label for="product">Product</label>
                    <input type="checkbox" id="product" name="product" className="form-check-input" value={this.state.product} onChange={this.onProductChange} />
                </div>
                <div className="form-check">
                    <label for="recieving">Recieving </label>
                    <input type="checkbox" id="recieving" name="recieving" className="form-check-input" value={this.state.recieving} onChange={this.onRecievingChange} />
                </div>
                <div className="form-check">
                    <label for="sales">Sales </label>
                    <input type="checkbox" id="sales" name="sales" className="form-check-input" value={this.state.sales} onChange={this.onSalesChange} />
                </div>
                <div className="form-check">
                    <label for="cash">Cash </label>
                    <input type="checkbox" id="cash" name="cash" className="form-check-input" value={this.state.cash} onChange={this.onCashChange} />
                </div>
                <div className="form-check">
                    <label for="purchasing">Purchasing </label>
                    <input type="checkbox" id="purchasing" name="purchasing" className="form-check-input" value={this.state.purchasing} onChange={this.onPurchasingChange} />
                </div>
                <div className="form-check">
                    <label for="credit">Credit </label>
                    <input type="checkbox" id="credit" name="credit" className="form-check-input" value={this.state.credit} onChange={this.onCreditChange} />
                </div>
                <div className="form-check">
                    <label for="customer">Customer </label>
                    <input type="checkbox" id="customer" name="customer" className="form-check-input" value={this.state.customer} onChange={this.onCustomertChange} />
                </div>
                <div className="form-check">
                    <label for="inventory">Inventory </label>
                    <input type="checkbox" id="inventory" name="inventory" className="form-check-input" value={this.state.inventory} onChange={this.onInventoryChange} />
                </div>
                <div className="form-check">
                    <label for="receipt">Receipt </label>
                    <input type="checkbox" id="receipt" name="receipt" className="form-check-input" value={this.state.receipt} onChange={this.onReceiptChange} />
                </div>
                <div className="form-check">
                    <label for="management">Management </label>
                    <input type="checkbox" id="management" name="management" className="form-check-input" value={this.state.management} onChange={this.onManagementChange} />
                </div>
                
                
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>

        )
    }
}