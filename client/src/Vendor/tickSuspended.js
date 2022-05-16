import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
//import image from './Images/tickSuspended.svg';

const initialState = {}

export class sTaskButton extends Component {
    state = initialState;

    render() {
        return (
            <ModalOpener buttonText='Marcar suspendido' handleClose={this.resetState}
                className={'title'} /*logo={image}*/ title={'Marcar suspendido'} post={this.post} children={this.myForm()} />
        );
    }
}