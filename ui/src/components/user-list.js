import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const configData = require("../config.json");

function formatDate(timestamp){
    let date = new Date(timestamp);

    return date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
}

class UserEntry extends Component{
    constructor(props){
        super(props);

        this.state = {
            ...props.user,
            doRender: false
        }

        this.userID = props.user._id;

        this.productUpdate = this.productUpdate.bind(this);
        this.recievingUpdate = this.recievingUpdate.bind(this);
        this.salesUpdate = this.salesUpdate.bind(this);
        this.cashUpdate = this.cashUpdate.bind(this);
        this.purchasingUpdate = this.purchasingUpdate.bind(this);
        this.creditUpdate = this.creditUpdate.bind(this);
        this.customerUpdate = this.customerUpdate.bind(this);
        this.inventoryUpdate = this.inventoryUpdate.bind(this);
        this.receiptUpdate = this.receiptUpdate.bind(this);
        this.managementUpdate = this.managementUpdate.bind(this);
    }

    productUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {product: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({product: e.target.checked})
    }
    
    recievingUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {recieving: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({recieving: e.target.checked})
    }
    
    salesUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {sales: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({sales: e.target.checked})
    }
    
    cashUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {cash: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({cash: e.target.checked})
    }
    
    purchasingUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {purchasing: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({purchasing: e.target.checked})
    }
    
    creditUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {credit: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({credit: e.target.checked})
    }
    
    customerUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {customer: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({customer: e.target.checked})
    }
    
    inventoryUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {inventory: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({inventory: e.target.checked})
    }
    
    receiptUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {receipt: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({receipt: e.target.checked})
    }
    
    managementUpdate(e){
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const accessObj = {management: e.target.checked}
        axios.post(configData.API_URL + "/management/update_access/" + this.userID, accessObj, axiosConfig);

        this.setState({management: e.target.checked})
    }
    

    render(){
        if(this.state.doRender) return null;
        return (
            <tr>
            <td>{this.state.username}</td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.product} onChange={this.productUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.recieving} onChange={this.recievingUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.sales} onChange={this.salesUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.cash} onChange={this.cashUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.purchasing} onChange={this.purchasingUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.credit} onChange={this.creditUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.customer} onChange={this.customerUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.inventory} onChange={this.inventoryUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.receipt} onChange={this.receiptUpdate} /></td>
            <td><input type="checkbox" className="form-check-input" checked={this.state.management} onChange={this.managementUpdate} /></td>
        </tr>
        )
    }
}

export default class UserList extends Component {
    constructor(props){
        super(props);

        this.state = {users: []};
    }

    componentDidMount(){
        const endpointURL = configData.API_URL+"/management/list";
        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        axios.get(endpointURL, axiosConfig).then( response => {
            this.setState({users: response.data})
        }).catch(function(error){
            console.log(error);
        })
    }

    getUsers(){
        return this.state.users.map(function(user, i){
            return <UserEntry user={user} key = {i} />
        })
    }

    render(){
        return (<div>
            <h3>Users</h3>
            <Link to="/create_user" type="button" class="btn btn-primary">Add User</Link>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Product</th>
                            <th>Recieving</th>
                            <th>Sales</th>
                            <th>Cash</th>
                            <th>Purchasing</th>
                            <th>Credit</th>
                            <th>Customer</th>
                            <th>Inventory</th>
                            <th>Receipt</th>
                            <th>Management</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getUsers() }
                    </tbody>
                </table>
        </div>)
    }
}
