import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const configData = require("../config.json");

function formatDate(timestamp){
    let date = new Date(timestamp);

    return date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
}

const Product = props => (
    <tr>
        <td>{props.product.retail}</td>
        <td>{props.product.cost}</td>
        <td>{props.product.retail - props.product.cost}</td>
        <td>{formatDate(props.product.expiration)}</td>
    </tr>
)

export default class ProductList extends Component {
    constructor(props){
        super(props);

        this.state = {products: []};
    }

    componentDidMount(){
        const endpointURL = configData.API_URL+"/products";
        axios.get(endpointURL, {headers:{"x-access-token": localStorage.getItem("token")}}).then( response => {
                this.setState({products: response.data});
            }
        ).catch(function(error){
            console.log(error);
        })

        console.log(endpointURL);
    }

    getProducts(){
        return this.state.products.map(function(product, i){
            return <Product product={product} key = {i} />
        })
    }

    render(){
        return (<div>
            <h3>Products</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Retail</th>
                            <th>Cost</th>
                            <th>Margin</th>
                            <th>Expiration</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getProducts() }
                    </tbody>
                </table>
        </div>)
    }
}
