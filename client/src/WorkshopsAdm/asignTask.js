import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request, TaskRequest } from '../textInputs';
import image from './Images/AsignTask.svg';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

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
    title: 'Elegir Tarea'
};

export class AsignTaskButton extends Component {
    state = initialState;
    form = React.createRef();

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

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedTask === prevState.selectedTask && this.state.name === prevState.name)
            return;
        if (!this.state.name || !this.state.selectedTask)
            return;
        Axios.post('http://localhost:3307/getPrices',
            { name: this.state.name, article: this.state.selectedTask.article_id }).then((response) => {
                //Se debe encontrar el mayor de los id que sean menores a selectedTask.id o el mayor, si no tiene menores
                if (response.data.length === 0)
                    return;
                let currentId = this.state.selectedTask.id, aux = response.data[0];
                console.log(aux);
                response.data.map((task) => {
                    if ((task.id > aux.id && task.id < currentId) || (task.id > currentId && (aux.id === 0 || aux.id > currentId)))
                        aux = task;
                })
                console.log(aux);
                this.setState({ price: aux.price });
            });
    }

    handleEnter = (event) => {
        if (event.key.toLowerCase() !== 'enter')
            return;
        const form = this.form.current;
        const index = [...form].indexOf(event.target);
        if (form.elements[index + 1])
            form.elements[(index === -1)? 1 : index + 1].focus();
        if (event.keyCode) //Si el evento es artificial ({key = 'enter'}), no se prevendrá el evento porque no existe
            event.preventDefault();
    };

    myForm = () => {
        Axios.post('http://localhost:3307/getTasks', { state: 'toAsign' }).then((response) => {
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
                    this.setState({ selectedTask: e });
                    this.updateError(0, !!e);
                    console.log('año');
                    this.handleEnter({ key: 'enter' });
                }} tasks={this.state.tasks} handleEnter={this.handleEnter}
                    title={this.state.title} setTitle={(e) => { this.setState({ title: e }) }} />

                <Request toShow="name" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ name: event });
                    this.updateError(1, error);
                }} />

                <Request toShow="price" value={this.state.price} handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ price: event.target.value });
                    this.updateError(2, error);
                }} />

                <Request toShow="deadline" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ deadline: event.target.value });
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

    post = () => {
        let aux = this.state;
        this.resetState();
        Axios.put('http://localhost:3307/asignTask', {
            name: aux.name, task: this.state.selectedTask.id, deadline: aux.deadline, weight: aux.weight, threads: aux.threads,
            price: aux.price, exitDate: moment(new Date()).format("DD/MM/YYYY")
        });
    }

    render() {
        return (
            <ModalOpener buttonText='Remito' handleClose={this.resetState}
                className={'title'} logo={image} title={'Asignar Tarea'} post={this.post} children={this.myForm()} />
            //Crea un botón que abre a un modal en el que aparecerá lo devuelto en this.myForm
        );
    }
}