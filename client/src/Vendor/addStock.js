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
    responsible: '',
    date: moment(new Date()).format("DD/MM/YYYY"),
    materials: [{id: '', quantity: ''}],//Una lista que tendrá objetos de la forma {id, quantity} (descripción y nombre están guardados en una tabla)
    materialsData: []//Tabla que va a contener todos los datos de toda la materia prima, para hacer las conversiones entre id, descripción y nombre y cantidad, metros y peso
}

export class AddStock extends Component {
    state = initialState;

    componentDidMount() {
        //TODO: Debe darle valor a materialData, que será una lista de objetos con id, nombre, descripción, peso por unidad y metro por unidad. De no poseer alguno de los últimos dos datos, debe mostrar 0
        let aux = [{id: 15, name: 'Cierre', description: 'Marca SanCor', weight: 0.5, meters: 0},
                {id: 4, name: 'Pasador', description: 'Amarillo', weight: 3, meters: 1},
                {id: 6, name: 'Cable', description: 'De cobre', weight: 0.5, meters: 1.5}]  
        this.setState({ materialsData: aux });
    }

    addMaterial(value, property) {
        console.log('addMaterial');
        let materials = this.state.materials;
        materials[materials.length - 1][property] = value;
        this.setState({materials: [...this.state.materials, {id: '', quantity: ''}]})//Agrega un objeto al final de la lista. Sus propiedades serán los parámetros
    }

    removeMaterial(i) {
        console.log('removeMaterial');
        let materials = this.state.materials;
        console.log(materials);
        materials.splice(i, 1);
        console.log(materials);
        this.setState({ materials });
    }

    changeMaterial(i, value, property) {
        console.log('changeMaterial');

        let materials = this.state.materials;
        materials[i][property] = value;
        this.setState({ materials });
    }
    
    post() {//TODO: Se debe enviar materials (exceptuando el último elemento, que está vacío) a la base de datos
        //let materials = this.state.materials;
        console.log(this.state);
        // materials.pop();
        // console.log(materials);
    }

    myForm() {
        return (
            <Form onSubmit={e => e.preventDefault()}>
                {/* Se hará un formulario para que el usuario complete los datos de la materia prima; fecha actual, responsable, nombre, descripción y cantidad  */}
                <Request toShow="responsible" onChange={(event) => {
                    this.setState({ responsible: event.target.value });
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
                        this.state.materials.map((material, index) =>{ console.log('update');
//Debería tomar la fila dada por Row y agregarsela a la lista de materias primas que posee el componente. De estar esta
//ya ingresada (en caso de una modificación), reemplazarle.
                        return <Row key={index} index={index} remove={i => this.removeMaterial(i)} materialsData={this.state.materialsData}
                            isLast={this.state.materials.length === index + 1} onChange={(this.state.materials.length !== index + 1)?
                                (e, property) => this.changeMaterial(index, e, property) :
                                (value, property) => this.addMaterial(value, property)} />
                        })}
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

export const Row = ({ index, onChange, remove, isLast, materialsData }) => {

    const [used, setUsed] = useState(false);//Verdadero si ya se inicializó
    const [input, setInput] = useState({ id: '', name: '', description: '', quantity: '', weight: '', meters: '' });

    useEffect(() => {
        if(!used)
        console.log('Cambió input por primera vez');
        else
        console.log('Cambió input otra vez');
        if(!used) 
            setUsed(true);//Evita que se use al inicializar el objeto, esquivando un bucle infinito que agregue materiales
        else
            onChange(input);
    }, [input]);

    const myFun = () => {//BUG: Se hace el reseteo nada más
        console.log(input);
        remove(index);
        setInput({ id: '', name: '', description: '', quantity: '', weight: '', meters: '' });
        console.log(index);
        console.log(index);
    };

    return (
        <tr key={index}>
            
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
                }} />
            </td>
            <td><FormControl value={input.description}//Descripción
                onChange={(e) => {
                    let aux = { ...input };
                    aux.description = e.target.value;
                    setInput({ ...aux });
                }} />
            </td>
            <td><FormControl value={input.quantity}//Cantidad
                onChange={(e) => {
                    if (isNaN(e.target.value) || e.target.value < 0)
                        return;
                    let aux = { ...input };
                    aux.quantity = e.target.value;
                    setInput({ ...aux });
                }} />
            </td>
            <td><FormControl value={input.weight}//Peso
                onChange={(e) => {
                    let aux = { ...input };
                    aux.weight = e.target.value;
                    setInput({ ...aux });
                }} />
            </td>
            <td><FormControl value={input.meters}//Metros
                onChange={(e) => {
                    let aux = { ...input };
                    aux.meters = e.target.value;
                    setInput({ ...aux });
                }} />
            </td>
            {!isLast? <td><Button onClick={myFun}>X</Button></td> : <></>}
        </tr>
    );
}