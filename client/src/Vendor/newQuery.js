import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
//import image from './Images/newQuery.svg';

const initialState = {}

export class AsignTaskButton extends Component {
    state = initialState;

    render() {
        return (
            <ModalOpener buttonText='Nuevo pedido' handleClose={this.resetState}
                className={'title'} /*logo={image}*/ title={'Nuevo pedido'} post={this.post} children={this.myForm()} />
        );
    }
}