import axios from 'axios';
import React, { Component } from 'react';
import { useParams } from "react-router";

export default function StatusMessage(props){
    const message = props.message;
    
    var alertType = "";
    if(message == "Success"){
        alertType = "alert-success";
    }else{
        alertType = "alert-danger";
    }

    return (<div class={"alert " + alertType} role="alert">
        {message}
    </div>)
}