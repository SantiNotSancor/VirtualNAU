import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
//import image from './Images/ShowOrders.svg';

const initialState = {
    table: [],//La tabla de datos sin filtrar
    filteredTable: [],//La tabla a mostrar
    titles: [],//Los atributos de la BD
    headers: [],//Los títulos que se mostrarán en la tabla
    input: '',//Ingreso de Inputbox para filtrar la tabla
    filters: [],//Lista que muestra el tipo de filtro
    filterInputs: [] //Lista que contiene lo ingresado por el usuario en cada filtro
};

export class ShowOrders extends Component {
    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

    setData = e => {//Consigue los datos de la base de datos de las órdenes de corte   
        Axios.get('http://localhost:3307/getCutOrders').then(response => {
            const res = response.data, table = [], titles = [];
            if (res)
                res.map(row => table.push(Object.values(row)));
            Object.getOwnPropertyNames(res[0]).map(property => {
                let header;
                switch (property) {
                    case 'article_id':
                        header = 'Artículo';
                        break;
                    case 'article_description':
                        header = 'Descripción de artículo'
                        break;
                    case 'quantity':
                        header = 'Cantidad';
                        break;
                    case 'colors'://TODO: No es un valor único, sino un array
                        header = 'Colores';
                        break;
                    case 'fabrics'://TODO: No es un valor único, sino un array
                        header = 'Telas';
                        break;
                }
                titles.push(header);
            });
            if(!this.state.table || this.state.table.length === 0)
                this.setState({ filteredTable: table });
            this.setState({ titles, table, filteredTable: table});
            this.setFilters(titles);
        });
    }

    header = (name, index) => {//Devuelve un HTML tipo header que diga name
        return (<th key={index}>{name}</th>);
    }
    
    setFilters = (titles) => {//Crea los filtros en base a los títulos
        let filters = [];
        let filterInputs = [];
        titles.map((title) => {//TODO: 
            switch(title){
                case 'Artículo':
                case 'Descripción de artículo':
                case 'Telas':
                case 'Colores':
                    filters.push('input');
                    break;
                case 'Cantidad':
                    filters.push('number');
                    break;
                default:
                    filters.push('');
                    break;
                }
            filterInputs.push('');
            })
        this.setState({filters, filterInputs});
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
                    case 'date':
                        if(!(((filterInput.length === 10 && filterInput[5] === '/') || filterInput.length === 5) && filterInput[2] === '/')){
                            erase = false;
                            break;
                        }
                        let dateParts = filterInput.slice(1, filterInput.length).split('/');
                        let date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                        dateParts = cell.split('/');
                        cell = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                        switch(operator){
                            case ' ':
                                erase = false;
                                break;
                            case '>':
                                erase = date >= cell;
                                break;
                            case '<':
                                erase = date <= cell;
                                break;
                            case '=':
                                erase = date !== cell;
                                break;
                        }
                        erase = false;
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

    render() {
        const {filteredTable, titles, table} = this.state, data = { 'articles': 'Artículos', 'workshops': 'Talleres', 'payments': 'Pagos', 'tasks': 'Tareas'};
        let title = 'Elegir datos a mostrar', dropdownList = [];
        for (const key in data)
            dropdownList.push(key);
        return (
            <>
                <DropdownButton title={title} onSelect={e => {
                    this.setData(e);
                    title = data.e;
                }}>
                    {dropdownList.map((e, index) => <Dropdown.Item key={index} eventKey={e}>{data[e]}</Dropdown.Item>)}
                </DropdownButton>
                {(titles && filteredTable) ?
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
                                    case 'date':
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
                                    default:
                                        if(!filter[0])
                                            return <td key={i}></td>;
                                        return <td key={i}>
                                        <DropdownButton onSelect={(e) => {
                                            let aux = this.state.filterInputs;
                                            aux[i] = e;
                                            this.setState({filterInputs: aux});
                                            this.compareTable();
                                        }}>
                                            {filter.map((element, index) => 
                                            <Dropdown.Item key={index} eventKey={element}>{element}</Dropdown.Item>)}
                                        </DropdownButton></td>        
                                }
                            })}
                            </tr>
                            {filteredTable.map((row, i) => {
                                return (
                                    <tr key={i}>
                                        {row.map((cell, j) => <td key={j}>{cell}</td>)}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    : null}
            </>
        );
    }
}