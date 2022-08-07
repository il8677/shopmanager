import React, { Component } from 'react';

export default class CreateProduct extends Component {
    resetState(){
        this.state = {
            retail: 0,
            cost: 0,
            expiraton: Date.now()
        }

        this.onChangeRetail = this.onChangeRetail.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeExpiration = this.onChangeExpiration.bind(this);
    }

    constructor(props) {
        super(props);

        this.resetState();
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

        this.resetState();
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