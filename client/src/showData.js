import React, { Component } from 'react';
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';

const initialState = {
    data: '', //El nombre de la BD de la que sacamos los datos
    table: [],//La tabla de datos
    actualTable: [],//La tabla a mostrar
    titles: [],//Los atributos de la BD
    headers: [],//Los títulos que se mostrarán en la tabla
    input: '',   //Ingreso de Inputbox para filtrar la tabla
    filters: [],
    list: []
};

export class ShowData extends Component {

    state = initialState;

    resetState = () => this.setState(initialState);

    setData = e => {
        Axios.get('http://localhost:3307/get' + e.charAt(0).toUpperCase() + e.slice(1)).then(response => {
            const res = response.data, table = [], titles = [];
            console.log(res);
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
                    case 'responsable':
                        header = 'Responsable/s';
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
                    case 'paid':
                        header = 'Pago';
                        break;
                }
                titles.push(header);
            });
            
            let filters = [];
            let list = [];
            titles.map((title) => {//TODO: 
                switch(title){
                    case 'Descripción':
                    case 'Nombre':
                    case 'Contacto':
                    case 'Código de artículo':
                    case 'Descripción de artículo':
                    case 'Telas':
                    case 'Colores':
                    case 'Responsable/s':
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
                        filters.push('dropbox');
                        break;
                    case 'Pago':
                        filters.push('checkbox');
                        break;
                    default:
                        filters.push('');
                        break;
                }
                list.push('');
            })
            console.log(filters);

            this.setState({ titles, table, data: e, filters, list});
        });
    }

    table = (row, index, titles) => {
        const { data } = this.state;
        return <tr key={index}>{row.map((e, i) => {
            let cell = e;
            return <td key={i}>{cell}</td>;
        })}</tr>
    }

    render() {
        const { table, titles } = this.state, data = { 'articles': 'Artículos', 'workshops': 'Talleres', 'payments': 'Pagos', 'tasks': 'Tareas' };
        let title = 'Elegir datos a mostrar', dropdownList = [];
        for (const key in data)
            dropdownList.push(key);
        return (
            <>
                <DropdownButton title={title} onSelect={e => {//Define la BD a mostrar
                    this.setData(e);
                    title = data.e;
                }}>
                    {dropdownList.map((e, index) => <Dropdown.Item key={index} eventKey={e}>{data[e]}</Dropdown.Item>)}
                </DropdownButton>
                {(titles && table) ?
                    <Table striped bordered>
                        <thead>
                            <tr>
                                {titles.map((title, i) => <th key={i}>{title}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            {this.state.filters.map((filter, i) => {
                                switch (filter) {
                                    case 'input':
                                        return <td key={i}><FormControl onChange={(e) => {
                                            let aux = this.state.list;
                                            aux[i] = e.target.value;
                                            this.setState({list: aux});
                                        }}/></td>
                                    case 'number':
                                        return <td key={i}><FormControl/><DropdownButton/></td>
                                    case 'date':
                                        return <td key={i}>FALTA AGREGAR</td>//TODO: AGREGAR
                                    case 'dropbox':
                                        return <td key={i}><DropdownButton /></td>
                                    case 'checkbox':
                                        return <td key={i}><Form.Check/></td>
                                    default:
                                        return <td key={i}></td>;
                                }
                            })}
                            </tr>
                            {table.map((row, i) => this.table(row, i, titles))}
                        </tbody>
                    </Table>
                    : null}
            </>
        );
    }
}