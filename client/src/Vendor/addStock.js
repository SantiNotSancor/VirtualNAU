import React, { Component, useEffect, useState } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, RawResourceRequest } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import './indexVendor.css';
import addStockLogo from './Images/addStock.gif'
//import image from './Images/addStock.svg';

const initialState = {
    responsible: '',
    date: moment(new Date()).format("DD/MM/YYYY"),
    materials: [{id: '', meters: '', quantity: '', weight: ''}],//Una lista que tendrá objetos de la forma {id, quantity} (descripción y nombre están guardados en una tabla)
    materialsData: []//Tabla que va a contener todos los datos de toda la materia prima, para hacer las conversiones entre id, descripción y nombre y cantidad, metros y peso
}

export class AddStock extends Component {
    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

    componentDidMount() {
        //TODO: MICHAT Debe darle valor a materialData, que será una lista de objetos con id, peso por unidad y metro por unidad. De no poseer alguno de los últimos dos datos, debe mostrar 0
        let aux = [{id: 15, weight: 0.5, meters: 0},
                {id: 4, weight: 3, meters: 1},
                {id: 6, weight: 0.5, meters: 1.5}];
        this.setState({ materialsData: aux });
    }

    addMaterial(material) {
        let materials = this.state.materials;
        materials[materials.length - 1] = material;
        this.setState({materials: [...this.state.materials, {id: '', meters: '', quantity: '', weight: ''}]})//Agrega un objeto al final de la lista. Sus propiedades serán los parámetros
    }

    removeMaterial(i) {
        let materials = this.state.materials;
        console.log(materials);
        materials.splice(i, 1);
        console.log(materials);
        this.setState({ materials });
    }

    changeMaterial(i, material) {
        let materials = this.state.materials;
        materials[i] = material;
        this.setState({ materials });
    }
    
    post() {//TODO: MICHAT Se debe enviar materials (exceptuando el último elemento, que está vacío) a la base de datos
        //let materials = this.state.materials;
        // materials.pop();
        // console.log(materials);
        this.resetState();
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
                            <th>ID: Nombre (descripción)</th>
                            <th>Cantidad</th>
                            <th>Peso</th>
                            <th>Metros</th>
                            <th></th>{/* Botón de eliminar fila */}
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.materials? null :
                        this.state.materials.map((material, index) => {
                            console.log('update')
//Debería tomar la fila dada por Row y agregarsela a la lista de materias primas que posee el componente. De estar esta
//ya ingresada (en caso de una modificación), reemplazarle.
                        return <Row key={index} index={index} material={material} remove={i => this.removeMaterial(i)} materialsData={this.state.materialsData}
                            isLast={this.state.materials.length === index + 1} onChange={(this.state.materials.length !== index + 1)?
                                (material) => this.changeMaterial(index, material) :
                                (material) => this.addMaterial(material)} />
                        })}
                    </tbody>
                </Table>
            </Form>
        );
    }
    render() {
        return (
                <ModalOpener buttonText='Añadir stock' handleClose={this.resetState}
                buttonClassName='buttonVendor2' imageClassName='imgVendor' logo={addStockLogo} title='Añadir stock' post={this.post} children={this.myForm()} />
        );
    }
}

export const Row = ({ material, index, onChange, remove, isLast, materialsData }) => {

    const [input, setInput] = useState(material);
    const [convertion, setConvertion] = useState({});

    useEffect(() => {
        let aux;
        if(!input.id){
            setConvertion({});
            aux = {}
        }
        else{
            materialsData.map((material) => {
                if(Number(material.id) === Number(input.id)){
                    setConvertion(material)
                    aux = material;                    
                }
            });
        }
        // if ((input.id && !aux.weight) || (!input.id && aux.weight))
        //     input.weight = '-'
        // else
        //     if (input.weight === '-')
        //         input.weight = '';
        // if ((input.id && !aux.meters) || (!input.id && aux.meters))
        //         input.meters = '-'
        //     else
        //         if (input.meters === '-')
        //             input.meters = '';
        if(aux.meters === 0)
            input.meters = '-';
        if(aux.weight === 0)
            input.weight = '-';
        console.log('trying with id ' + input.id);
    }, [input.id]);

    const changeInput = (newInput) => {
        let aux = newInput;
        console.log(convertion);
        if(convertion && convertion !== {}) {
            if(newInput.quantity !== input.quantity && newInput.quantity){//Si cambió la cantidad...
                aux.weight = newInput.quantity * convertion.weight;
                aux.meters = newInput.quantity * convertion.meters;
            }
            if(newInput.weight !== input.weight && newInput.weight && convertion.weight){//Si cambió el peso...
                aux.quantity = newInput.weight / convertion.weight;
                aux.meters = aux.quantity * convertion.meters;
            }
            if(newInput.meters !== input.meters && newInput.meters && convertion.meters){//Si cambió la longitud
                aux.quantity = newInput.meters / convertion.meters;
                aux.weight = aux.quantity * convertion.weight;
            }
        }
        if(convertion.meters === 0)
            aux.meters = '-';
        if(convertion.weight === 0)
            aux.weight = '-';
        if(isNaN(aux.meters))
            aux.meters = '';
        if(isNaN(aux.weight))
            aux.weight = '';
        console.log(aux)
        onChange(aux);
        setInput(aux);
    }

    const myRemove = () => {
        console.log(input);
        remove(index);
    };

    return (
            <tr key={index}>
                {/* TODO: handleEnter */}
                <td><RawResourceRequest placeholder="" handleEnter={()=>console.log('hi')}//TODO: No se borra cuando se elimina (porque no tiene value, sino onChange)
                    onChange={(e) => {
                        let aux = { ...input };
                        if (e.indexOf(':') > 0)
                            aux.id = e.substr(0, e.indexOf(':'));
                        else
                            aux.id = '';
                        changeInput({ ...aux });
                    }} />
                </td>
                <td><FormControl value={input.quantity}//Cantidad
                    onChange={(e) => {
                        if (isNaN(e.target.value) || e.target.value < 0)
                            return;
                        let aux = { ...input };
                        aux.quantity = e.target.value;
                        changeInput({ ...aux });
                    }} />
                </td>
                <td><FormControl value={input.weight}//Peso
                    onChange={(e) => {
                        if (isNaN(e.target.value) || e.target.value < 0)
                            return;
                        let aux = { ...input };
                        aux.weight = e.target.value;
                        changeInput({ ...aux });
                    }} />
                </td>
                <td><FormControl value={input.meters}//Metros
                    onChange={(e) => {
                        if (isNaN(e.target.value) || e.target.value < 0)
                            return;
                        let aux = { ...input };
                        aux.meters = e.target.value;
                        changeInput({ ...aux });
                    }} />
                </td>
                {!isLast? <td><Button onClick={myRemove}>X</Button></td> : <></>}
            </tr>
    );
}