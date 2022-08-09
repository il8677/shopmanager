import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import Recieving from './recieving';

const configData = require("../config.json");



export default class ProductsTile extends Component {
    constructor(props){
        super(props);

        this.state = {products: [],
                     editComponent: null};
        this.doRender = false;
        
        this.targetComponent = props.target;

        
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

        const setEditComponent = (product) => {
            this.setState({editComponent: <Recieving id={product._id} name={product.name} />});
        }

        const Product = props => (
                <div onClick={e=>setEditComponent(props.product)} className="card" style={{margin: 10+"px", width: 100+"px", height: 100+"px"}}>
                    <div className="card-body d-flex align-items-center">
                        <p className="card-title">{props.product.name}</p>
                    </div>
                </div>
        )

        const productMap = this.state.products.map((product, i)=>{
            return <Product product={product} key = {i} target={this.targetComponent}/>
        })

        const editComponent = this.state.editComponent;

        return (
            <div>

            {editComponent &&
                <div>
                {editComponent}
                </div>}
            <div className="row row-cols-auto">
                
                {productMap}
            </div>
            </div>
        )
    }

    render(){
        return (<div>
            <h3>Products</h3>
            {this.doRender && this.getProducts()}
        </div>)
    }
}