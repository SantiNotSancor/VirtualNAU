import React, { Component } from 'react';
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';

const initialState = {
    data: '',
    table: '',
    titles: [],
    headers: []
};

export class ShowData extends Component {

    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

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
                }
                titles.push(header);
            });
            this.setState({ titles, table, data: e });
        });
    }

    header = (name, index) => {
        return (<th key={index}>{name}</th>);
    }

    table = (row, index, titles) => {
        const { table, data } = this.state;
        if (data === 'payments' && !row[row.length - 1])
            return;
        return <tr key={index}>{row.map((e, i) => {
            let cell = e;
            if (data === 'payments' && i === row.length - 1)
                cell = '$' + e;
            else switch(e){
                case 'toAssign': cell = 'A asignar'; break;
                case 'assigned': cell = 'Asignada'; break;
                case 'returned': cell = 'Devuelta'; break;
            };
            return (e || e === 0 || this.state.headers.indexOf(titles[i])) ? <td key={i}>{cell}</td> : null;
        })}</tr>
    }

    render() {
        const { table, titles } = this.state, data = { 'articles': 'Artículos', 'workshops': 'Talleres', 'payments': 'Pagos', 'tasks': 'Tareas' };
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
                {(titles && table) ?
                    <Table striped bordered>
                        <thead>
                            <tr>
                                {titles.map((title, i) => this.header(title, i))}
                            </tr>
                        </thead>
                        <tbody>
                            {table.map((row, i) => this.table(row, i, titles))}
                        </tbody>
                    </Table>
                    : null}
            </>
        );
    }
}