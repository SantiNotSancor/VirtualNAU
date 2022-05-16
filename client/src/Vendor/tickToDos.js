import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
//import image from './Images/tickToDos.svg';

const initialState = {}

export class AssignTaskButton extends Component {
    state = initialState;

    render() {
        return (
            <ModalOpener buttonText='Marcar a hacer' handleClose={this.resetState}
                className={'title'} /*logo={image}*/ title={'Marcar items a hacer'} post={this.post} children={this.myForm()} />
        );
    }
}