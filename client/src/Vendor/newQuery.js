import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
//import image from './Images/newQuery.svg';

const initialState = {
    customer : " ", //Añade cliente  
    observation : " "
}

export class NewQuery extends Component {
    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

    myForm = () => {
        return(
            <>
                <Request toShow="customerName" onChange={(e) => {
                    this.setState({customer: e.target.value});
                }}/>
                <Request toShow="observation" onChange={(e) => {
                    this.setState({observation: e.target.value});
                }}/>
            </>
        );
    }


    render() {
        return (
            <ModalOpener buttonText='Nuevo pedido' handleClose={this.resetState}
                className={'title'} /*logo={image}*/ title={'Nuevo pedido'} post={this.post} children={this.myForm()} />
        );
    }
}