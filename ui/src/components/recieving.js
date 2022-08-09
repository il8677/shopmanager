import axios from 'axios';
import React, { Component, useState } from 'react';

import config from "../config.json"

import StatusMessage from './statusMessage';

export default function Recieving (props) {
    let id = props.id;
    let name = props.name;

    const [qty, setQty] = useState(0);

    var message = null;
    
    const onSubmit = (e) => {
        e.preventDefault()

        const axiosConfig = {headers:{"x-access-token": localStorage.getItem("token")}};
        
        const object = {product: id, qty: qty};

        axios.post(config.API_URL + "/recieving/create", object, axiosConfig).then((res)=>{
            if (res.status == 200) message = res.status.body.message;
        });
    }

    return (
    <div>
        <h5>Recieving {name}</h5>
        {message && <StatusMessage message={message} />}
        <form onSubmit={onSubmit}>
            <label>Quantity:  </label>
            <input type="number" value={qty} onChange={e=> setQty(e.target.value)} />
            <input type="submit" value="Submit" />
        </form>
    </div>
    )
}