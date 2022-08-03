import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request } from '../textInputs';
import image from './Images/newTask.gif';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import './indexWorkshopAdm.css'

const initialState = {
    task: '',
    error: true,
    errors: [true, true, true, true, true, true, true],
    article: '',
    quantity: '',
    packages: '',
    cutDate: '',
    fabrics: '',
    colors: '',
    responsible: '',
    generalFeatures: '',
}

export class NewTaskButton extends Component {
    state = initialState;
    form = React.createRef();

    resetState = () => {
        let task = this.state.task;
        this.setState(initialState);
        this.setState({ task });
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

    handleEnter = (event) => {
        if (event.key.toLowerCase() !== 'enter')
            return;
        const form = this.form.current;
        const index = [...form].indexOf(event.target);
        if(form.elements[index + 1])
            form.elements[index + 1].focus();
        event.preventDefault();
    };

    myForm = () => {
        Axios.get('http://localhost:3307/getTaskCount').then(response => {
            let res = response.data[0].count;
            let limit = 9;//TODO: Cambiar a 9999
            res = (res + 1 > limit) ? 1 : res + 1;//Límite cantidad de tareas
            this.setState({ task: res });
        });
        return (
            <Form ref={this.form}>
                <h3>Tarea número {this.state.task}</h3>
                <Request toShow="article" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ article: event });
                    this.updateError(0, error);
                }} />

                <Request toShow="quantityArticle" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ quantity: event.target.value });
                    this.updateError(1, error);
                }} />

                <Request toShow="packages" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ packages: event.target.value });
                    this.updateError(2, error);
                }} />

                <Request toShow="fabrics" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ fabrics: event.target.value });
                    this.updateError(3, error);
                }} />

                <Request toShow="colors" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ colors: event.target.value });
                    this.updateError(4, error);
                }} />

                <Request toShow="responsible" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ responsible: event.target.value });
                    this.updateError(5, error);
                }} />

                <Request toShow="generalFeatures" handleEnter={this.handleEnter} onChange={(event, error) => {
                    this.setState({ generalFeatures: event.target.value });
                    this.updateError(6, error);
                }} />
            </Form>
        );
    }

    post = () => {
        let aux = this.state;
        this.resetState();
        Axios.post('http://localhost:3307/getDescriptionWhere', { id: aux.article }).then((response) => {
            let description = response.data[0].description;
            Axios.delete(`http://localhost:3307/deleteTask/${aux.task}`).then(() => {
                Axios.post('http://localhost:3307/updateTaskCount', { task: aux.task });
                Axios.post('http://localhost:3307/newTask',
                    {
                        id: aux.task, article: aux.article, description, quantity: aux.quantity, packages: aux.packages,
                        cutDate: moment(new Date()).format("DD/MM/YYYY"), fabrics: aux.fabrics, colors: aux.colors,
                        responsible: aux.responsible, generalFeatures: aux.generalFeatures
                    });
            });
        });
    }
    render() {
        return (
            <ModalOpener buttonText='Nueva tarea' children={this.myForm()} error={this.state.error} className={'title'}
                cardClassName='cardWorkshopAdm' buttonClassName='button2WorkshopAdm' logo={image} title={'Creación de tarea'} post={this.post} handleClose={this.resetState} />
            //Crea un botón que abre a un modal en el que aparecerá lo devuelto en this.myForm
        );
    }
}