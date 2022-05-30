import React, { Component } from 'react';
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';

const initialState = {
<<<<<<< HEAD
    data: '',
    table: '',
    titles: [],
    headers: []
=======
    data: '', //El nombre de la BD de la que sacamos los datos
    table: [],//La tabla de datos
    actualTable: [],//La tabla a mostrar
    titles: [],//Los atributos de la BD
    headers: [],//Los títulos que se mostrarán en la tabla
    input: '',//Ingreso de Inputbox para filtrar la tabla
    filters: [],//Lista que muestra el tipo de filtro
    filterInputs: [] //Lista que contiene lo ingresado por el usuario en cada filtro
>>>>>>> vendor
};

export class ShowData extends Component {

    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

    setData = e => {
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
<<<<<<< HEAD
            this.setState({ titles, table, data: e });
        });
    }

    header = (name, index) => {
        return (<th key={index}>{name}</th>);
=======
            
            let filters = [];
            let filterInputs = [];
            titles.map((title) => {//TODO: 
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
                    case 'Observaciones':
                        filters.push('input');
                        break;
                    case 'Saldo':
                    case 'Cantidad':
                    case 'Código':
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
            this.setState({ titles, table, actualTable: table, data: e, filters, filterInputs});
        });
    }

    compareTable = () => {//Le asigna a actualTable una versión filtrada de table 
        //TODO:     
        const {table, filterInputs} = this.state;
        let actualTable = table;
        console.log(table);//['', 'an']
        table.map((row, i) => {
            let erase = false;
            console.log(row);//[2004, 'Gorro de lana'];
            row.map((cell, j) => {
                let aux = typeof(cell) !== 'string'? toString(cell) : cell;
                if(!aux.includes(filterInputs[j])){
                    console.log('BORRAR');
                    erase = true;
                }
            })
            if(erase){
                actualTable.splice(i, 1);//Eliminar el elemento número i
                console.log("ELIMINAR   " + i);}
        })
        //Filtrar actualTable
        this.setState({actualTable});

>>>>>>> vendor
    }

    table = (row, index, titles) => {
        const { table, data } = this.state;
        if (data === 'payments' && !row[row.length - 1])
            return;
        return <tr key={index}>{row.map((e, i) => {
            let cell = e;
            if (data === 'payments' && i === row.length - 1)
                cell = '$' + e;
            else if (data === 'tasks' && i === 17)
                cell = (e === 1) ? 'Pago' : 'Impago';
            else switch(e){
                case 'toAssign': cell = 'A asignar'; break;
                case 'assigned': cell = 'Asignada'; break;
                case 'returned': cell = 'Devuelta'; break;
            };
            return (e || e === 0 || this.state.headers.indexOf(titles[i])) ? <td key={i}>{cell}</td> : null;
        })}</tr>
    }

    render() {
        const { actualTable, titles } = this.state, data = { 'articles': 'Artículos', 'workshops': 'Talleres', 'payments': 'Pagos', 'tasks': 'Tareas' };
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
                {(titles && actualTable) ?
                    <Table striped bordered>
                        <thead>
                            <tr>
                                {titles.map((title, i) => this.header(title, i))}
                            </tr>
                        </thead>
                        <tbody>
<<<<<<< HEAD
                            {table.map((row, i) => this.table(row, i, titles))}
=======
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
                                        return <td key={i}>FALTA AGREGAR</td>//TODO: AGREGAR
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
                            {actualTable.map((row, i) => this.table(row, i, titles))}
>>>>>>> vendor
                        </tbody>
                    </Table>
                    : null}
            </>
        );
    }
}