import React, { Component } from 'react';

import config from "../config.json"
import axios from "axios"

export default class CreateProduct extends Component {
    getDefaultState(){
        return {
            name: "",
            retail: 0,
            cost: 0,
            expiraton: Date.now()
        }
    }

    constructor(props) {
        super(props);

        this.state = this.getDefaultState();

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRetail = this.onChangeRetail.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeExpiration = this.onChangeExpiration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangeRetail(e) {
        this.setState({retail: e.target.value});
    }

    onChangeCost(e) {
        this.setState({cost: e.target.value});
    }

    onChangeExpiration(e) {
        this.setState({expiration: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};

        const stateCopy = this.state;
        axios.post(config.API_URL + "/products/create", stateCopy, axiosConfig).then((res)=>{
            if(res.status == 200) this.setState(this.getDefaultState());
        });
    }

    render(){
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Product</h3>
                <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                        <label>Name: </label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
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