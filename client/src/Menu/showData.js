import React, { Component } from 'react';
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';

const initialState = {
    data: '',
    table: '',
    titles: '',
};

export class ShowData extends Component {

    state = initialState;

    resetState = () => {
        this.setState(initialState);
    }

    setData = e => {

        Axios.get('http://localhost:3001/get' + e.charAt(0).toUpperCase() + e.slice(1)).then(response => {
            const res = response.data;
            const table = [];
            console.log(res);
            res.map(row => table.push(Object.values(row)));
            this.setState({ titles: Object.getOwnPropertyNames(res[0]), table });
        });
    }

    render() {
        const { table, titles } = this.state, data = { 'articles': 'Artículos', 'workshops': 'Talleres', 'payments': 'Pagos', 'tasks': 'Tareas' };
        return (
            <>
                <DropdownButton title={title} onSelect={e => {
                    this.setData(e);
                    title = data.e;
                }}>
                    {data.map(e => <Dropdown.Item eventKey={e}>{data.e}</Dropdown.Item>)}
                </DropdownButton>
                {(titles && table) ?
                    <Table striped bordered>
                        <thead>
                            <tr>
                                {titles.map((title, i) => <th key={i}>{title}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {table.map((row, i) => {
                                return <tr key={i}>{row.map((cell, j) => {
                                    return <td key={j}>{cell}</td>;
                                })}</tr>
                            })}
                        </tbody>
                    </Table>
                    : null}
            </>
        );
    }
}