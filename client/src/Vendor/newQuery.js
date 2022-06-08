import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
//import image from './Images/newQuery.svg';

const initialState = {
    customer : '', //Añade cliente  
    observation : '',
    query : [{id:'', description:'', quantity:'', colour:'', toDeliver:''}]
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
                <Table striped bordered id="taskTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Color</th>
                            <th>Entregar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.query.map ((order, index) => {
                            return (!order ? null :
                            <tr>
                                <td><FormControl value={order.id}
                                    onChange={(e) => {
                                        if(isNaN(e.target.event));
                                            return;
                                        let aux = this.state.query;
                                        aux[index].id = e.target.event;
                                        this.setState({query: aux});
                                    }}
                                    />
                                </td>
                                <td><FormControl value={order.description}
                                    onChange={(e) => {
                                        let aux = this.state.query;
                                        aux[index].description = e.target.event;
                                        this.setState({query: aux});
                                    }}
                                    />
                                </td>
                                <td><FormControl value={order.quantity}
                                    onChange={(e) => {
                                        let aux = this.state.query;
                                        aux[index].quantity = e.target.event;
                                        this.setState({query: aux});
                                    }}
                                />
                                </td>
                                <td><FormControl value={order.colour}
                                    onChange={(e) => {
                                        let aux = this.state.query;
                                        aux[index].colour = e.target.event;
                                        this.setState({query: aux});
                                    }}
                                />
                                </td>
                                <td>
                                    <Form.Check onChange={() => {
                                       let aux = this.state.query;
                                        aux[index].toDeliver = !this.state.query;
                                        this.setState({query: aux})
                                    }}/>
                                </td>
                            </tr>);
                            //TO.DO la creacion de nuevas filas
                        }
                        )}
                    </tbody>
                </Table>
            </>
        );
    }

    // post = () => {      TO.DO el post de los datos al tocar el boton
    //     return(

    //     );
    // }

    render() {
        return (
            <ModalOpener buttonText='Nuevo pedido' handleClose={this.resetState}
                className={'title'} /*logo={image}*/ title={'Nuevo pedido'} post={this.post} children={this.myForm()} />
            
        );
    }
}