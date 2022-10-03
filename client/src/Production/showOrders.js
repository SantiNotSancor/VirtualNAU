import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import { ModalController, ModalPrototype } from '../modal';
//import image from './Images/ShowOrders.svg';

const initialStateOrders = {
    table: [],//La tabla de datos sin filtrar
    filteredTable: [],//La tabla a mostrar
    titles: ['Número', 'Artículo', 'Descripción', 'Cantidad', 'Colores', 'Telas'],//Los atributos de la BD
    filters: ['input', 'input', 'input', 'number', 'input', 'input'],//Lista que muestra el tipo de filtro
    filterInputs: ['', '', '', '', '', ''] //Lista que contiene lo ingresado por el usuario en cada filtro
};

export class ShowOrders extends Component {
    
    state = this.initialStateOrders;

    resetState = () => {
        this.setState(initialStateOrders);
    }

    componentDidMount = () => {//Consigue los datos de la base de datos de las órdenes de corte
        // Axios.get('http://localhost:3307/getCutOrders').then(response => {
        //     const res = response.data, table = [], titles = [];
        //     if (res)
        //         res.map(row => table.push(Object.values(row)));
        //     this.setState({ table, filteredTable: table});
        // });
        let table = [[1, 2024, 'Riñonera con tacha', '30', 'Rojo, celeste y negro', 'Frizelina'],
                     [2, 2034, 'Riñonera de cinturón', '55', 'Rojo y negro', 'Gamuza']];
        this.setState({table, filteredTable: table});
    }

    header = (name, index) => {//Devuelve un HTML tipo header que diga name
        return (<th key={index}>{name}</th>);
    }

    compareTable = () => {//Le asigna a filteredTable una versión filtrada de table 
        //TODO: table se actualiza a filteredTable
        
        const {table, filterInputs, filters} = this.state;
        let filteredTable = table.slice(), toErase = [];
        table.map((row, i) => {
            let erase = false;
            row.map((cell, j) => {
                let filterInput = filterInputs[j];
                let operator = filterInput[0];
                switch(filters[j]){
                    case 'input':
                        let cellString = typeof(cell) !== 'string'? cell.toString() : cell;
                        if(!cellString.toLowerCase().includes(filterInput))
                            erase = true;
                        break;
                    case 'number':
                        let number = filterInput.slice(1, filterInput.length);
                        if(filterInput === ''){
                            erase = false;
                            break;
                        }
                        if(isNaN(number) || (operator !== ' ' && operator !== '<' && operator !== '>' && operator !== '=')){
                            erase = true;
                            break;
                        }
                        number = Number(number);
                        switch(operator){
                            case ' ':
                                erase = false;
                                break;
                            case '>':
                                erase = number >= cell;
                                break;
                            case '<':
                                erase = number <= cell;
                                break;
                            case '=':
                                erase = number !== cell;
                                break;
                        }
                        break;
                }
            })
            if(erase)
                toErase.push(i);
        })
        toErase = toErase.reverse();
        toErase.map((element) => filteredTable.splice(element, 1));
        if(this.state.filteredTable !== filteredTable)
            this.setState({filteredTable});
    }

    myForm = () => {
        const {filteredTable, titles, table} = this.state;
        return (
            <>
                <Table striped bordered>
                    <thead>
                        <tr>
                            {titles.map((title, i) => this.header(title, i))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {this.state.filters.map((filter, i) => {
                            switch (filter) {
                                case 'input':
                                    return <td key={i}><FormControl onChange={(e) => {
                                        let aux = this.state.filterInputs;
                                        aux[i] = e.target.value;
                                        this.setState({filterInputs: aux});
                                        this.compareTable();
                                    }}/></td>
                                case 'number':
                                    return <td key={i}><FormControl onChange={(e) => {
                                        let aux = this.state.filterInputs;
                                        if(aux[i] === '')
                                            aux[i] = ' ';
                                        let firstChar = aux[i][0];
                                        aux[i] = firstChar + e.target.value;
                                        this.setState({filterInputs: aux});
                                        this.compareTable();
                                    }}/>
                                    
                                    <DropdownButton onSelect={(e) => {
                                        let aux = this.state.filterInputs;
                                        if(aux[i] === '')
                                            aux[i] = e;
                                        else
                                            aux[i] = e + aux[i].substring(1);
                                        this.setState({filterInputs: aux});
                                        this.compareTable();
                                    }}>
                                        <Dropdown.Item eventKey={'>'}>Mayor</Dropdown.Item>
                                        <Dropdown.Item eventKey={'<'}>Menor</Dropdown.Item>
                                        <Dropdown.Item eventKey={'='}>Igual</Dropdown.Item>
                                    </DropdownButton></td>       
                            }
                        })}
                        </tr>
                        {filteredTable.map((row, i) => {
                            return (
                                <tr key={i}>
                                    {row.map((cell, j) => <td key={j}>{cell}</td>)}
                                    <NewTasks data={row} />
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    }

    render() {
        return (
            <ModalOpener buttonText='Ver órdenes' children={this.myForm()} error={this.state.error} className={'title'}
                /*logo={image}*/ title={'Ver órdenes de corte'} post={()=>{}} handleClose={this.resetState} />
        )
    }
}


export class NewTasks extends ModalController {
    myForm = () => {

    }

    render () {
        return(
            <>
                <button className={this.props.buttonClassName} onClick={this.showModal}>{/*Hereda la función desde ModalController*/}
                    Armar
                </button>
                <ModalPrototype show={this.state.showModal} handleClose={() => {
                    this.hideModal();
                    if(this.props.handleClose)
                        this.props.handleClose();
                }} footer={this.props.footer}
                children={this.myForm()} title={this.props.title} post={() => {
                    if (!this.props.error) {
                        this.props.post();
                        this.hideModal();
                    }
                    else
                        alert('Error');
                }} />
            </>
        )
    }
}