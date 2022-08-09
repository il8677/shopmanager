import React, { Component } from 'react';

import config from "../config.json"
import axios from "axios"

export default class CreateRecieve extends Component {
    resetState(){
        this.state = {
            product: null,
            quantity: 0,
        }
    }

    constructor(props) {
        super(props);

        this.resetState();

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangeProduct(e) {
        this.setState({product: e.target.value});
    }

    onChangeQuantity(e) {
        this.setState({quantity: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const stateCopy = this.state;
        axios.post(config.API_URL + "/products/create", stateCopy, axiosConfig).then(function(res){
            if(res.status == 200) this.resetState();
        });
    }

    render(){
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Retail Price: </label>
                        <input type="number" className="form-control" value={this.state.retailPrice} onChange={this.onChangeRetail} />
                    </div>
                    <div className='form-group'>
                        <label>Cost: </label>
                        <input type="number" className="form-control" value={this.state.cost} onChange={this.onChangeCost} />
                    </div>
                    <div className='form-group'>
                        <label>Expiration: </label>
                        <input type="date" className="form-control" value={this.state.retailPrice} onChange={this.onChangeExpiration} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}