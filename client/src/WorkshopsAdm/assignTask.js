import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import image from './Images/assignTask.gif';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import moment from 'moment';

import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print";

const initialState = {
    name: '',
    task: '',
    deadline: '',
    weight: '',
    threads: '',
    price: 0,
    //Auto-asignar
    packages: '',
    description: '',
    quantity: '',
    //Otros
    error: true,
    errors: [true, true, true, true, true, true],
    selectedTask: null,
    tasks: [],
    title: 'Elegir Tarea',
    showPrint: false
};

export class AssignTaskButton extends Component {
    state = initialState;
    form = React.createRef();
    toPrint = React.createRef();

    resetState = () => {
        this.setState(initialState);
    }

    updateError = (index, error) => {
        let errors = [...this.state.errors];
        errors[index] = error;
        this.setState({ errors });

        let aux = false;
        errors.map((e, key) => {
            aux = aux && (key === index) ? error : e;
        });
        this.setState({ error: aux });
    }

    componentDidUpdate(prevState) {
        if (this.state.selectedTask === prevState.selectedTask && this.state.name === prevState.name)
            return;
        if (!this.state.name || !this.state.selectedTask || this.state.price)
            return;
        Axios.post('http://localhost:3307/getPrices',
            { name: this.state.name, article: this.state.selectedTask.article_id }).then((response) => {
                //Se debe encontrar el mayor de los id que sean menores a selectedTask.id o el mayor, si no tiene menores
                if (response.data.length === 0)
                    return;
                let currentId = this.state.selectedTask.id, aux = response.data[0];
                response.data.map((task) => {
                    if ((task.id > aux.id && task.id < currentId) || (task.id > currentId && (aux.id === 0 || aux.id > currentId)))
                        aux = task;
                })
                this.setState({ price: aux.price });
            });
    }

    handleEnter = (event) => {
        if (event.key.toLowerCase() !== 'enter')
            return;
        const form = this.form.current;
        const index = [...form].indexOf(event.target);
        if (form.elements[index + 1])
            form.elements[(index === -1) ? 1 : index + 1].focus();
        if (event.keyCode) //Si el evento es artificial ({key = 'enter'}), no se prevendrá el evento porque no existe
            event.preventDefault();
    };

    myForm = () => {
        let defaultDeadline = new Date();
        defaultDeadline.setDate(defaultDeadline.getDate() + 7);
        defaultDeadline = moment(defaultDeadline).format("DD/MM/YYYY")
        // if(!this.state.deadline)
        //     this.setState({deadline: defaultDeadline});
        Axios.post('http://localhost:3307/getTasks', { state: 'toAssign' }).then((response) => {
            this.setState({ tasks: response.data });
        });
        return (
            <Form ref={this.form}>
                {this.state.selectedTask ?
                    <>
                        <h3>Bultos: {this.state.selectedTask.packages}</h3>
                        <h3>Descripción: {this.state.selectedTask.article_description}</h3>
                        <h3>Cantidad: {this.state.selectedTask.quantity}</h3>
                    </>
                    : null}

                <TaskRequest setSelectedTask={(e) => {
                    this.setState({ selectedTask: e, quantity: e.quantity });
                    this.updateError(0, !!e);
                    this.handleEnter({ key: 'enter' });
                }} tasks={this.state.tasks} handleEnter={this.handleEnter}
                    title={this.state.title} setTitle={(e) => { this.setState({ title: e }) }} />

                <Request toShow="workshopName" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ name: event });
                    this.updateError(1, error);
                }} />

                <Request toShow="price" value={this.state.price.toString()} handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ price: event.target.value });
                    this.updateError(2, error);
                }} />

                <Request toShow="deadline" value={this.state.deadline} handleEnter={this.handleEnter} onChange={(event, error) => {
                    let deadline = event.target.value, currentYear = new Date().getFullYear();
                    //deadline += deadline.length < 10 ? '/' + currentYear : '';
                    this.setState({ deadline });
                    console.log('hi');
                    this.updateError(3, error);
                }} />

                <Request toShow="weight" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ weight: event.target.value });
                    this.updateError(4, error);
                }} />

                <Request toShow="threads" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ threads: event.target.value });
                    this.updateError(5, error);
                }} />
            </Form>
        );
    }

    print = () => {
        this.setState({ showPrint: true });
        var printContents = document.getElementById('toPrint').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        this.setState({ showPrint: false });
    }

    post = () => {
        let aux = this.state;
        this.resetState();
        Axios.put('http://localhost:3307/assignTask', {
            name: aux.name, task: this.state.selectedTask.id, deadline: aux.deadline, weight: aux.weight, threads: aux.threads,
            price: aux.price, exitDate: moment(new Date()).format("DD/MM/YYYY")
        });
    }

    render() {
        let {selectedTask, deadline, quantity, weight, threads, price} = this.state;
        let description = selectedTask ? selectedTask.article_description : '';
        return (
            <>

                {/* component to be printed */}
                <div style={{ display: "none" }}>
                    <ComponentToPrint ref={(el) => (this.toPrint = el)} data={{deadline, description, quantity, weight, threads, price}}/>
                </div>
                <ModalOpener buttonText='Asignar Tarea' handleClose={this.resetState}
                    footer={{ content: this.toPrint, show: !this.state.error }} error={this.state.error}
                    cardClassName='cardWorkshopAdm' containerClassName='containerWorkshopAdm' buttonClassName='button2WorkshopAdm' imageClassName='imgWorkshopAdm' logo={image} title={'Asignar Tarea'} post={this.post} children={this.myForm()} />
            {/* Crea un botón que abre a un modal en el que aparecerá lo devuelto en this.myForm */}
            </>
        );
    }
}

class ComponentToPrint extends React.Component {
    render(){
        const { data } = this.props;
        return (
            <div id="toPrint">
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Descripción de artículo</th>
                            <th>Cantidad</th>
                            <th>Peso</th>
                            <th>Hilos</th>
                            <th>Precio por unidad</th>
                            <th>Dinero</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ 'backgroundColor': 'green' }}>{/*Muestra el primero*/}
                            <td>{data.deadline}</td>
                            <td>{data.description}</td>
                            <td>{data.quantity}</td>
                            <td>{data.weight}</td>
                            <td>{data.threads}</td>
                            <td>{'$' + data.price}</td>
                            <td>{'$' + data.price * data.quantity}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}