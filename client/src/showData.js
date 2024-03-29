import React, { Component } from 'react';
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import { ModalOpener } from './modalOpener';
import viewQueryLogo from './Vendor/Images/viewQuery.gif';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const initialState = {
    data: '', //El nombre de la BD de la que sacamos los datos
    table: [],//La tabla de datos sin filtrar
    filteredTable: [],//La tabla a mostrar
    titles: [],//Los atributos de la BD
    headers: [],//Los títulos que se mostrarán en la tabla
    input: '',//Ingreso de Inputbox para filtrar la tabla
    filters: [],//Lista que muestra el tipo de filtro
    filterInputs: [] //Lista que contiene lo ingresado por el usuario en cada filtro
};

export class ModalShowData extends Component {

    render() {
        return (
            <ModalOpener buttonText='Ver datos' handleClose={this.resetState}
            cardClassName='cardVendor' containerClassName='containerVendor' buttonClassName='buttonVendor3' imageClassName='imgVendor' logo={viewQueryLogo} title={'Visualizar Datos'} children={<ShowData />} />
        );
    }
}

export class ShowData extends Component {

    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

    setData = e => {//Consigue los datos de la base de datos, en base a e, que le especifica qué datos buscar   
        console.log('hi');
        Axios.get('http://localhost:3307/get' + e.charAt(0).toUpperCase() + e.slice(1)).then(response => {
            const res = response.data, table = [], titles = [];
            if (res)
                res.map(row => table.push(Object.values(row)));
            Object.getOwnPropertyNames(res[0]).map(property => {
                let header;
                switch (property) {
                    case 'date':
                        header = 'Fecha';
                        break;
                    case 'id':
                        header = 'Código';
                        break;
                    case 'description':
                        header = 'Descripción';
                        break;
                    case 'name':
                        header = 'Nombre';
                        break;
                    case 'contact':
                        header = 'Contacto';
                        break;
                    case 'money':
                        header = (this.state.data === 'Workshop') ? 'Cuenta corriente' : 'Saldo';
                        break;
                    case 'article_id':
                        header = 'Código de artículo';
                        break;
                    case 'article_description':
                        header = 'Descripción de artículo';
                        break;
                    case 'quantity':
                        header = 'Cantidad';
                        break;
                    case 'packages':
                        header = 'Bultos';
                        break;
                    case 'cutDate':
                        header = 'Fecha de corte';
                        break;
                    case 'fabrics':
                        header = 'Telas';
                        break;
                    case 'colors':
                        header = 'Colores';
                        break;
                    case 'responsible':
                        header = 'responsible/s';
                        break;
                    case 'generalFeatures':
                        header = 'Detalles';
                        break;
                    case 'state':
                        header = 'Estado';
                        break;
                    case 'exitDate':
                        header = 'Fecha de salida';
                        break;
                    case 'deadline':
                        header = 'Fecha esperada';
                        break;
                    case 'weight':
                        header = 'Peso';
                        break;
                    case 'price':
                        header = 'Precio unitario';
                        break;
                    case 'threads':
                        header = 'Hilos entregados';
                        break;
                    case 'calification':
                        header = 'Calificación';
                        break;
                    case 'observations':
                        header = 'Observaciones';
                        break;
                    case 'faulty':
                        header = 'Fallados';
                        break;
                }
                titles.push(header);
            });
            console.log(table);
            console.log(titles);
            this.setState({ titles, table, filteredTable: table, data: e });
            this.setFilters(titles);
        });
    }

    header = (name, index) => {//Devuelve un HTML tipo header que diga name
        return (<th key={index}>{name}</th>);
    }
    
    setFilters = (titles) => {//Crea los filtros en base a los títulos
        let filters = [];
        let filterInputs = [];
        titles.map((title) => {//TODO: ¿Hecho?
            switch(title){
                case 'Descripción':
                case 'Nombre':
                case 'Contacto':
                case 'Código de artículo':
                case 'Descripción de artículo':
                case 'Telas':
                case 'Colores':
                case 'responsible/s':
                case 'Detalles':
                case 'Código':
                case 'Observaciones':
                    filters.push('input');
                    break;
                case 'Saldo':
                case 'Cantidad':
                case 'Bultos':
                case 'Precio unitario':
                case 'Peso':
                case 'Hilos entregados':
                case 'Calificación':
                case 'Fallados':
                    filters.push('number');
                    break;
                case 'Fecha':
                case 'Fecha de corte':
                case 'Fecha de salida':
                case 'Fecha esperada':
                    filters.push('date');
                    break;
                case 'Estado':
                    filters.push(['Todos', 'Asignado', 'No Asignado', 'Devuelto']);
                    break;
                case 'Pago':
                    filters.push(['Todos', 'Pago', 'No Pago']);
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
        //TODO: table se actualiza a filteredTable ¿Hecho?
        
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