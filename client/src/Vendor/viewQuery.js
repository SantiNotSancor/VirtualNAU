import React, {Component} from 'react';
import { ModalOpener } from '../modalOpener';
import viewQueryLogo from './Images/viewQuery.gif';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';

const initialState = {
    filterInputs: [undefined, undefined, undefined, undefined, undefined, undefined, undefined], /*La cantidad de filtros es estática.*/
    table: [],              /*La tabla de datos sin filtrar. Actualmente, se muestra la tabla completa, pero se puede mejorar el sistema para que se realice la primera consulta una vez se haya ingresado un dato a uno de los filtros.*/
    filteredTable: []      /*La tabla de datos filtrada.*/
};

export class ViewQuery extends Component{

    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

    setData = () => {
        Axios.get(/*Hacerle un localhost a la tabla de datos cuando la termine Michat ->*/'*/get').then(response => {
            const table = []; 
            if (response.data){
                table = response.data.map(row => Object.values(row));
                this.setState({table, filteredTable: table});
            }
        });
    };

    filter(filterType, i) { {/*Crea la fila de los filtros y modifica el array filterInputs*/}
        switch(filterType) {
            case "number":
                return <td>
                    <input type='number' onChange={(e) => {
                        let aux = this.state.filterInputs;
                        if(aux[i] === '')
                            aux[i] = ' ';
                        let firstChar = aux[i][0];
                        aux[i] = firstChar + e.target.value;
                        this.setState({filterInputs: aux});
                        this.updateTable(filterType);
                    }}></input>
                    <select onSelect={(e) => {
                    let aux = this.state.filterInputs;
                    if(aux[i] === '')
                        aux[i] = e;
                    else
                        aux[i] = e + aux[i].substring(1);
                    this.setState({filterInputs: aux});
                    this.updateTable(filterType);
                    }}>
                        <option value='>'>Mayor</option>
                        <option value='<'>Menor</option>
                        <option value='='>Igual</option>
                    </select>
                </td>
            case 'string':
                return <td>
                    <input type='text' onChange={(e) => {
                        let aux = this.state.filterInputs;
                        aux[i] = e.target.value;
                        this.setState({filterInputs: aux});
                        this.updateTable();
                    }}></input>
                </td>
        }
    }

    updateTable = (filterType) => {                                      /*Actualiza la tabla mostrada con el input de los filtros*/
        const {table, filterInputs} = this.state;
        let filteredTable = table.slice().filter(row => row.every((cell, j) => {
            let filterInput = filterInputs[j];
            let operator = filterInput[0];
            switch(filterType) {
                case 'string':
                    let cellString = typeof(cell) !== 'string'? cell.toString() : cell;
                    return cellString.toLowerCase().includes(filterInput)
                case 'number':
                    let number = filterInput.slice(1, filterInput.length);
                    if(filterInput === '')
                        return true;                            /*Si no hay números a los que comparar, se devolverá true*/

                    number = Number(number);
                    switch(operator){
                        case ' ':
                            return true;                        /*Si no hay operador, no se sabe como comparar, por lo que devuelve true */
                        case '>':
                            return number < cell;               /*Si el numero es mayor o igual a la celda, devuelve false*/
                        case '<':
                            return number > cell;               /*Si el numero es mayor o igual a la celda, devuelve false*/
                        case '=':
                            return number === cell;              /**Si el numero  es diferente a la celda, devuelve false*/
                    }
                    break;
            }
        }));
        if (this.state.filteredTable !== filteredTable)    /*Si la tabla de this.state.filteredTable (que es la tabla mostrada actualmente) es diferente a filteredTable (que es la actualización de la tabla), se actualizará el estado de filteredTable.*/
            this.setState({filteredTable});                /*Si las dos tablas son iguales, no hay necesidad de actualizar filteredTable.*/
    }

    myQueries() {
        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>ID</th> {/*Título del Diseño*/}
                        <th>Nombre del Cliente</th> {/*Título del Diseño*/}
                        <th>ID Artículo</th> {/*Título del Diseño*/}
                        <th>Descripción del Artículo</th> {/*Título del Diseño*/}
                        <th>Cantidad</th> {/*Título del Diseño*/}
                        <th>Colores</th> {/*Título del Diseño*/}
                        <th>Fecha de Entrada</th> {/*Título del Diseño*/}
                    </tr>
                </thead>
                <tr>
                    {this.filter('number', 0)}
                    {this.filter('string', 1)}
                    {this.filter('number', 2)}
                    {this.filter('string', 3)}
                    {this.filter('number', 4)}
                    {this.filter('string', 5)}
                    {this.filter('string', 6)}
                </tr>
                {this.state.table.map(row => {  {/*La cantidad de rows es variable, dependiendo de la cantidad de registros que haya en la tabla*/}
                    <tr>
                        <td></td>   {/*Variable del GET de la BBDD*/}
                        <td></td>   {/*Variable del GET de la BBDD*/}
                        <td></td>   {/*Variable del GET de la BBDD*/}
                        <td></td>   {/*Variable del GET de la BBDD*/}
                    </tr>
                })}
            </Table>
            
        );
    }

    render() {
        return (
            <ModalOpener buttonText='Visualizar Pedidos' handleClose={this.resetState}
                cardClassName='cardVendor' containerClassName='containerVendor' buttonClassName='buttonVendor3' imageClassName='imgVendor' logo={viewQueryLogo} title={'Visualizar Pedidos'} post={this.post()} children={this.myQueries()} />
        );
    }
    

    post() {
        // Este post existe para no sacar el isRequired del prop "post" de modalOpener en caso de que sea necesario.
        return function() {};
    }
}


{/* <Table striped bordered>
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
</Table> */}