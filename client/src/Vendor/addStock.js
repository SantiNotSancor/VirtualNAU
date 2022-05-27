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
    materials: [{id: '', quantity: ''}]//Una lista que tendrá objetos de la forma {id, quantity} (descripción y nombre están guardados en una tabla)
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

    changeMaterial(i, e, property) {
        let materials = this.state.materials;
        materials[i][property] = e.target.value;
        this.setState({ materials });
    }
    
    post() {//TODO:
        console.log('hi');
    }

    myForm() {
        return (
            <Form onSubmit={e => e.preventDefault()}>
                {/* Se hará un formulario para que el usuario complete los datos de la materia prima; fecha actual, responsable, nombre, descripción y cantidad  */}
                <Request toShow="responsable" onChange={(event) => {
                    this.setState({ responsable: event.target.value });
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
                        {!this.state.materials? null :
                        this.state.materials.map((material, index) => {
//Debería tomar la fila dada por Row y agregarsela a la lista de materias primas que posee el componente. De estar esta
//ya ingresada (en caso de una modificación), reemplazarle. En caso de eliminarse una fila, aparecerá la cantidad como -1
                        <Row onRemove={this.removeMaterial(index)} onChange={(e, property) => {
                            this.changeMaterial(index, e, property);
                            this.addMaterial();
                        }} /> })
                        }
                    </tbody>
                </Table>
            </Form>
        );
    }

    render() {
        return (
            //null
            <ModalOpener buttonText='Añadir stock' handleClose={this.resetState}
                className={'title'} /*logo={image}*/ title={'Añadir stock'} post={this.post} children={this.myForm()} />
        );
    }
}

export const Row = ({ onChange, onRemove }) => {

    const [input, setInput] = useState({ id: '', name: '', description: '', quantity: '', weight: '', meters: '' });

    useEffect(() => {
        onChange(input.id, 'id');
        onChange(input.id, 'quantity');
    }, [input]);

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
            <td><Button onClick={onRemove}>X</Button></td>
        </tr>
    );
}

// import React from "react";
// import './styles.css'

// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { 
//        materials: [{ name: "", email : "" }]
//      };
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
  
//   handleChange(i, e) {
//     let materials = this.state.materials;
//     materials[i][e.target.name] = e.target.value;
//     this.setState({ materials });
//   }

//   addFormFields() {
//     this.setState(({
//       materials: [...this.state.materials, { name: "", email: "" }]
//     }))
//   }

//   removeFormFields(i) {
//     let materials = this.state.materials;
//     materials.splice(i, 1);
//     this.setState({ materials });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     alert(JSON.stringify(this.state.materials));
//   }

//   render() {

//     return (
//         <form  onSubmit={this.handleSubmit}>
//           {this.state.materials.map((element, index) => (
//             <div className="form-inline" key={index}>
//               <label>Name</label>
//               <input type="text" name="name" value={element.name || ""} onChange={e => this.handleChange(index, e)} />
//               <label>Email</label>
//               <input type="text" name="email" value={element.email || ""} onChange={e => this.handleChange(index, e)} />
//               {
//                 index ? 
//                   <button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
//                 : null
//               }
//             </div>
//           ))}
//           <div className="button-section">
//               <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
//               <button className="button submit" type="submit">Submit</button>
//           </div>
//       </form>
//     );
//   }
// }