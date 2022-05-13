import React, { Component, useEffect, useState } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
//import image from './Images/addStock.svg';

const initialState = {
    responsable: '',
    date: moment(new Date()).format("DD/MM/YYYY"),
    material: []
    //Una lista que tendrá objetos de la forma {id, quantity} (descripción y nombre están guardados en una tabla)
}

export class AddStock extends Component {
    state = initialState;

    myForm() {
        return (
            <Form onSubmit={e => e.preventDefault()}>
                {/* Se hará un formulario para que el usuario complete los datos de la materia prima; fecha actual, responsable, nombre, descripción y cantidad  */}
                <Request toShow="responsable" onChange={(event) => {
                    this.setState({ name: event });
                }} />
                <Table striped bordered id="taskTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Peso</th>
                            <th>Metros</th>
                            <th></th>{/* Botón de eliminar fila */}
                        </tr>
                    </thead>
                    <tbody>
                        <Input onChange={(row) => {//Debería tomar la fila dada por Input y agregarsela a la lista de
                            //materias primas que posee el componente. De estar esta ya ingresada (en caso de una
                            //modificación), reemplazarle. En caso de eliminarse una fila, aparecerá la cantidad como -1
                            let alreadyListed = false, aux = this.state.material, i = 0;
                            console.log(this.state.material);
                            if (aux)
                                aux.map((listedRow) => {
                                    console.log(listedRow);
                                    if (!alreadyListed) i++;
                                    if (listedRow.id === row.id) alreadyListed = true;
                                })
                            console.log(i);
                            if (alreadyListed)
                                if (row.quantity !== -1)
                                    aux[i] = row;
                                else
                                    aux.splice(i, 1);
                            else
                                aux.push(row);
                            this.setState({ material: aux })
                        }
                        } />
                    </tbody>
                </Table>
            </Form>
        );
    }

    render() {
        return (
            <ModalOpener buttonText='Añadir stock' handleClose={this.resetState}
                className={'title'} /*logo={image}*/ title={'Añadir stock'} post={this.post} children={this.myForm()} />
        );
    }
}

export const Input = ({ onChange }) => {

    const [input, setInput] = useState({ id: '', name: '', description: '', quantity: '', weight: '', meters: '' });

    useEffect(() => onChange(input), [input]);

    return (
        <tr style={{ 'backgroundColor': 'green' }}>{/*Muestra el primero*/}
            <td><FormControl value={input.id}//ID
                onChange={(e) => {
                    let aux = { ...input };
                    aux.id = e.target.value;
                    setInput({ ...aux });
                }} />
            </td>
            <td><FormControl value={input.name}//Nombre
                onChange={(e) => {
                    let aux = { ...input };
                    aux.name = e.target.value;
                    setInput({ ...aux });
                }} /></td>
            <td><FormControl value={input.description}//Descripción
                onChange={(e) => {
                    let aux = { ...input };
                    aux.description = e.target.value;
                    setInput({ ...aux });
                }} /></td>
            <td><FormControl value={input.quantity}//Cantidad
                onChange={(e) => {
                    if (isNaN(e.target.value) || e.target.value < 0)
                        return;
                    let aux = { ...input };
                    aux.quantity = e.target.value;
                    setInput({ ...aux });
                }} /></td>
            <td><FormControl value={input.weight}//Peso
                onChange={(e) => {
                    let aux = { ...input };
                    aux.weight = e.target.value;
                    setInput({ ...aux });
                }} /></td>
            <td><FormControl value={input.meters}//Metros
                onChange={(e) => {
                    let aux = { ...input };
                    aux.meters = e.target.value;
                    setInput({ ...aux });
                }} /></td>
            <td><Button onClick={() => {
                let aux = { ...input };
                aux.quantity = -1;
                setInput({ ...aux });
                //Eliminar fila
            }}>X</Button></td>
        </tr>
    );
}