import axios from 'axios';
import React, { Component, useLayoutEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom'

import config from "../config.json"

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        }

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(e){
        this.setState({username: e.target.value});
    }

    onPasswordChange(e){
        this.setState({password: e.target.value});
    }

    onSubmit(e){
        e.preventDefault()

        const stateCopy = this.state;
        axios.post(config.API_URL + "/users/login", stateCopy).then(res =>{
            localStorage.setItem("token", res.data.token);
            this.setState({errorMessage: res.data.message})
        }).catch(err => {
            this.setState({errorMessage: err.response.data.message})
        });
    }

    render(){
        return (
            <div style={{marginTop: 10}}>
            <h3>Login</h3>
            {this.state.errorMessage && <div class="alert alert-danger" role="alert">
                    {this.state.errorMessage}    
                </div>}
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.onUsernameChange} />
                </div>
                <div className='form-group'>
                    <label>Password: </label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.onPasswordChange} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
            </form>
            {this.state.errorMessage === "Success" ? <Redirect to="/"></Redirect>: null}
        </div>

        )
    }
}