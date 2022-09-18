import React, { Component, useEffect, useState } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest, RawResourceRequest } from '../textInputs';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import newQueryLogo from './Images/newQuery.gif';

const initialState = {
    customerName: '',//Añade cliente  
    observation: '',//Añade observaciones
    items: [{ id: '', quantity: '', color: '', toDeliver: '' }]//Lista de objetos pedido
}

export class NewQuery extends Component {
    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

    addItem(item) {
        let items = this.state.items;
        items[items.length - 1] = item;
        this.setState({ items: [...this.state.items, { id: '', meters: '', quantity: '', weight: '' }] })//Agrega un objeto al final de la lista. Sus propiedades serán los parámetros
    }

    removeItem(i) {
        let items = this.state.items;
        items.splice(i, 1);
        this.setState({ items });
    }

    changeItem(i, item) {
        let items = this.state.items;
        items[i] = item;
        this.setState({ items });
    }

    post() {//TODO: MICHAT Se debe enviar items (exceptuando el último elemento, que está vacío) a la base de datos

        this.resetState();
    }

    myForm = () => {
        return (
            <Form onSubmit={e => e.preventDefault()}>
                <Request toShow="customerName" onChange={(e) => {
                    this.setState({ customerName: e.target.value });
                }} />
                <Request toShow="observation" onChange={(e) => {
                    this.setState({ observation: e.target.value });
                }} />
                <Table striped bordered id="taskTable">
                    <thead>
                        <tr>
                            <th>Artículo</th>
                            <th>Cantidad</th>
                            <th>Color</th>
                            <th>Entregar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.items ? null :
                            this.state.items.map((item, index) => {
                                //Debería tomar la fila dada por Row y agregarsela a la lista de items que posee el componente. De estar esta
                                //ya ingresada (en caso de una modificación), reemplazarle.
                                return <Row key={index} index={index} item={item} remove={i => this.removeItem(i)}
                                    isLast={this.state.items.length - 1 === index} onChange={(this.state.items.length - 1 !== index) ?
                                        (item) => this.changeItem(index, item) :
                                        (item) => this.addItem(item)} />
                            })}
                    </tbody>
                </Table>
            </Form>
        );
    }

    render() {
        return (
            <ModalOpener buttonText='Nuevo pedido' handleClose={this.resetState}
                cardClassName='card' containerClassName='containerVendor' buttonClassName='buttonVendor1' imageClassName='imgVendor' logo={newQueryLogo} title={'Nuevo pedido'} post={this.post} children={this.myForm()} />
        );
    }
}
export const Row = ({ item, index, onChange, remove, isLast }) => {
    const [input, setInput] = useState(item);//Va a tener un id, cantidad, color y si se entrega o no (bool)
    const [toDeliver, setCheckbox] = useState(false);//Se entrega o no (bool)
    useEffect(() => { console.log(item) });

    const myRemove = () => {
        remove(index);
    };

    return (
        <tr key={index}>
            {/* TODO: handleEnter */}
            <td>
                {/* TODO: No se borra cuando se elimina (porque no tiene value, sino onChange) */}
                <Request toShow="article" onChange={(event) => {
                    let aux = { ...input };
                    aux.id = event;
                    setInput(aux);//Devuelve sólo el id (no la descripción)
                    onChange(aux);
                }} />
            </td>
            <td><FormControl value={input.quantity}//Cantidad
                onChange={(e) => {
                    console.log(e, isNaN(e.target.value), e.target.value < 0);
                    if (isNaN(e.target.value) || e.target.value < 0)
                        return;
                    let aux = { ...input };
                    aux.quantity = e.target.value;
                    setInput(aux);
                    onChange(aux);
                }} />
            </td>
            <td><FormControl value={input.color}//Peso
                onChange={(e) => {
                    let aux = { ...input };
                    aux.color = e.target.value;
                    setInput(aux);
                    onChange(aux);
                }} />
            </td>
            <td>
                <Form.Check onChange={() => {
                    let aux = { ...input };
                    aux.toDeliver = !toDeliver;
                    setCheckbox(!toDeliver);
                    setInput(aux);
                    onChange(aux);
                }} />
            </td>
            {!isLast ? <td><Button onClick={myRemove}>X</Button></td> : <></>}
        </tr>
    );
}