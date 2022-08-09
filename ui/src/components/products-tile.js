import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const configData = require("../config.json");

const Product = props => (
    <Link to={props.target + props.product._id} style={{all:"unset"}}>
        <div className="card" style={{margin: 10+"px", width: 100+"px", height: 100+"px"}}>
            <div className="card-body d-flex align-items-center">
                <p className="card-title">{props.product.name}</p>
            </div>
        </div>
    </Link>
)

export default class ProductsTile extends Component {
    constructor(props){
        super(props);

        this.state = {products: []};
        this.buttonTarget = props.target;
        this.doRender = false;
    }

    componentDidMount(){
        const endpointURL = configData.API_URL+"/productsData/enum";
        axios.get(endpointURL, {headers:{"x-access-token": localStorage.getItem("token")}}).then( response => {
                this.setState({products: response.data});
                this.doRender = true;
            }
        ).catch(function(error){
            console.log(error);
        })

    }

    getProducts(){
        return this.state.products.map((product, i)=>{
            return <Product product={product} key = {i} target={this.buttonTarget}/>
        })
    }

    render(){
        return (<div>
            <h3>Products</h3>
            <div className="row row-cols-auto">
                {this.doRender && this.getProducts()}
            </div>
        </div>)
    }
}