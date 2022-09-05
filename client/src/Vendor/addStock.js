import React, { Component, useEffect, useState } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Axios from 'axios';
import moment from 'moment';
//import image from './Images/addStock.svg';

const initialState = {
    responsible: '',
    date: moment(new Date()).format("DD/MM/YYYY"),
    materials: [{id: '', quantity: ''}]
    //Una lista que tendrá objetos de la forma {id, quantity} (descripción y nombre están guardados en una tabla)
}

export class AddStock extends Component {
    state = initialState;

    addMaterial() {
        this.setState({materials: [...this.state.materials, { id: '', quantity: '' }]})
    }

    removeMaterial(i) {
        let materials = this.state.materials;
        materials.splice(i, 1);
        this.setState({ materials });
    }

    changeMaterial(index, e, property) {
        let materials = this.state.materials;
        materials[index][property] = e.target.value;
        this.setState({ materials });
    }
    
    post() {//TODO: Enviar a la base de datos
        console.log('hi');
    }

    myForm() {
        return (
            <form onSubmit={e => e.preventDefault()}>
                {/* Se hará un formulario para que el usuario complete los datos de la materia prima; fecha actual, responsable, nombre, descripción y cantidad  */}
                <Request toShow="responsible" onChange={(event) => {
                    this.setState({ responsible: event.target.value });
                }} />
                <table striped bordered id="taskTable">
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
                        {!this.state.materials[0]? ()=> null :
                        this.state.materials.map((material, index) =>
//Debería tomar la fila dada por Row y agregarsela a la lista de materias primas que posee el componente. De estar esta
//ya ingresada (en caso de una modificación), reemplazarle. En caso de eliminarse una fila, aparecerá la cantidad como -1
                        <Row onRemove={this.removeMaterial(index)} onChange={(e, property) => {
                            this.changeMaterial(index, e, property);
                            this.addMaterial();
                        }} />)}
                    </tbody>
                </table>
            </form>
        );
    }

    render() {
        return (
            <ModalOpener buttonText='Añadir stock' handleClose={this.resetState}
                className={'title'} /*logo={image}*/ title={'Añadir stock'} post={this.post} children={this.myForm()} />
        );
    }
}

export const Row = ({ onChange, onRemove }) => {

    const [input, setInput] = useState({ id: '', name: '', description: '', quantity: '', weight: '', meters: '' });

    // useEffect(() => {
    //     onChange(input.id, 'id');
    //     onChange(input.id, 'quantity');
    // }, [input]);
    //TODO:
    return (
        <tr><td>Hello</td></tr>
        // <tr style={{ 'backgroundColor': 'green' }}>{/*Muestra el primero*/}
        //     <td><input type="text" value={input.id}//ID
        //         onChange={(e) => {
        //             let aux = { ...input };
        //             aux.id = e.target.value;
        //             setInput({ ...aux });
        //         }} />
        //     </td>
        //     <td><input type="text" value={input.name}//Nombre
        //         onChange={(e) => {
        //             let aux = { ...input };
        //             aux.name = e.target.value;
        //             setInput({ ...aux });
        //         }} /></td>
        //     <td><input type="text" value={input.description}//Descripción
        //         onChange={(e) => {
        //             let aux = { ...input };
        //             aux.description = e.target.value;
        //             setInput({ ...aux });
        //         }} /></td>
        //     <td><input type="number" value={input.quantity}//Cantidad
        //         onChange={(e) => {
        //             if (isNaN(e.target.value) || e.target.value < 0)
        //                 return;
        //             let aux = { ...input };
        //             aux.quantity = e.target.value;
        //             setInput({ ...aux });
        //         }} /></td>
        //     <td><input type="number" value={input.weight}//Peso
        //         onChange={(e) => {
        //             let aux = { ...input };
        //             aux.weight = e.target.value;
        //             setInput({ ...aux });
        //         }} /></td>
        //     <td><input type="number" value={input.meters}//Metros
        //         onChange={(e) => {
        //             let aux = { ...input };
        //             aux.meters = e.target.value;
        //             setInput({ ...aux });
        //         }} /></td>
        //     <td><button onClick={onRemove}>X</button></td>
        // </tr>
    );
}