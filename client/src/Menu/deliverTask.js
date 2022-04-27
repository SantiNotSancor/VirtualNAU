import React, { Component, useState, useEffect } from 'react';
import { ModalOpener } from './modalOpener';
import { Request, TaskRequest } from '../textInputs';
import Form from 'react-bootstrap/Form';
import image from './Images/DeliverTask.svg';
import moment from 'moment';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import { ModalPrototype } from '../modal';

const initialState = {
    error: true,
    errors: [true, true],
    showObsModal: false,
    task: '',
    name: '',
    quantity: '',
    money: '',
    weight: '',
    threads: '',
    price: '',
    faulty: '',
    completed: false,
    calification: '',
    observation: ''
}

export class DeliverTaskButton extends Component {

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
        errors.map((e, key) => 
            aux = aux && (key === index) ? error : e
        );
        this.setState({ error: aux });
    }

    handleEnter = (event) => {
        if (event.key.toLowerCase() !== 'enter')
            return;
        const form = this.form.current;
        const index = [...form].indexOf(event.target);
        if (form.elements[index + 1])
            form.elements[index + 1].focus();
    };

    myForm = () => {
        return (
            <Form id='toPrint' ref={this.form} onSubmit={e => e.preventDefault()}>
                <Request toShow='name' handleEnter={this.handleEnter} onChange={(value, error) => {
                    this.setState({ name: value });
                    this.updateError(0, error);
                }} />
                <Input name={this.state.name} onChange={(data, price, faulty, task, completed) => {
                    this.setState({
                        task, quantity: data.quantity, money: data.money, weight: data.weight,
                        threads: data.threads, completed, price, faulty
                    });
                    this.updateError(1, false);
                }} />
            </Form>
        );
    }

    post = () => {
        let aux = this.state;
        if (!aux.completed)
            this.resetState();
        Axios.post('http://localhost:3001/getTasks', { id: aux.task }).then((response) => {
            Axios.put('http://localhost:3001/payWorkshop',
                { name: response.data[0].name, money: aux.money - aux.quantity * aux.price })
        });
        Axios.post('http://localhost:3001/newPart',
            {
                name: aux.name, task: aux.task, date: moment(new Date()).format('DD/MM/YYYY'), quantity: aux.quantity,
                weight: Number(aux.weight).toFixed(1), money: Number(aux.money).toFixed(1), threads: aux.threads
            }).then(() => {
                if (aux.completed)
                    this.setState({ showObsModal: true });
            });
    }

    completelyReturned = () => {
        console.log(this.state);
        Axios.put('http://localhost:3001/printObs',
            {
                id: this.state.task, observations: this.state.observation, calification: this.state.calification,
                faulty: this.state.faulty
            });
    }

    print = () => {
        if (this.state.error) {
            alert('Error. No se puede imprimir una boleta inválida.');
            return;
        }
        var printContents = document.getElementById('toPrint').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    sendObs = () => {
        this.completelyReturned();
        this.resetState();
    }

    render() {
        return (
            <>
                <ModalOpener buttonText="Recibir tarea" children={this.myForm()} logo={image} className="title"
                    footer={{ label: 'Imprimir', func: this.print, show: !!document.getElementById("taskTable") }}
                    title="Ingreso de tarea" post={this.post} error={this.state.error} />
                {/*Crea un botón que abre a un modal en el que aparecerá lo devuelto en this.myForm*/}

                <ModalPrototype title="Calificar" show={this.state.showObsModal} post={this.sendObs} handleClose={this.sendObs}>
                    <>
                        <Request toShow="observation" onChange={(e) => this.setState({ observation: e.target.value })} />
                        <Request toShow="calification" onChange={(e) => this.setState({ calification: e.target.value })} />
                    </>
                </ModalPrototype>
            </>
        );
    }
}

export const Input = ({ onChange, name }) => {

    const [title, setTitle] = useState('Elegir tarea');
    const [tasks, setTasks] = useState([]);
    const [parts, setParts] = useState([]);
    const [input, setInput] = useState({ quantity: 0, weight: 0, money: 0, threads: 0 });
    const [selectedTask, setSelectedTask] = useState('');
    const [refund, setRefund] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [account, setAccount] = useState('');
    const [quantityBackUp, setQuantityBackUp] = useState('');

    useEffect(() => {
        setInput({ quantity: 0, weight: 0, money: 0, threads: 0 });
        Axios.post('http://localhost:3001/getParts', { task: selectedTask.id }).then(response => setParts(response.data));
        if (name)
            Axios.post('http://localhost:3001/getAccount', { name }).then(response => setAccount(response.data[0].money));
    }, [selectedTask]);

    useEffect(() => {
        let delivered = input.quantity;
        let totalMoney = selectedTask.quantity * selectedTask.price - account;
        parts.map(part => delivered += part.quantity);

        if (quantityBackUp !== input.quantity) {
            input.money = input.quantity * selectedTask.price;
            if (input.money > totalMoney)
                input.money = totalMoney;
            setQuantityBackUp(input.quantity);
        }
        onChange(input, selectedTask.price, selectedTask.quantity - delivered, selectedTask.id, (delivered === selectedTask.quantity || completed));
    }, [input, completed, refund]); // eslint-disable-line react-hooks/exhaustive-deps

    const inputField = (property, total) => {
        return (
            <FormControl value={input[property]}
                onChange={(e) => {
                    if (isNaN(e.target.value) || (total[property] < e.target.value && property !== 'money'))
                        return;
                    let aux = { ...input };
                    aux[property] = e.target.value;
                    aux[property] = (refund) ?
                        -Math.abs(aux[property]) :
                        (aux[property] < 0) ? 0 : aux[property];
                    if (property === 'quantity' || property === 'threads')
                        aux[property] = Math.round(aux[property]);
                    setInput({ ...aux });
                }} />
        );
    }

    const getTable = () => {

        let total = {
            quantity: selectedTask.quantity,
            weight: selectedTask.weight,
            money: selectedTask.quantity * selectedTask.price - account,
            threads: selectedTask.threads
        };
        return (
            <>
                {parts.map((part, index) => {
                    total = {
                        quantity: total.quantity - part.quantity,
                        weight: total.weight - part.weight,
                        money: total.money - part.money,
                        threads: total.threads - part.threads,
                    };
                    return (
                        <tr key={index}>{/*Muestra el medio*/}
                            <td>{part.date}</td>
                            <td>{part.quantity}</td>
                            <td>{total.quantity}</td>
                            <td>{Number(part.weight).toFixed(1)}</td>
                            <td>{Number(total.weight).toFixed(1)}</td>
                            <td>{part.threads}</td>
                            <td>{total.threads}</td>
                            <td>{'$' + Number(part.money).toFixed(1)}</td>
                            <td>{'$' + Number(total.money).toFixed(1)}</td>
                        </tr>
                    );
                })}
                <tr>{/*Muestra la última fila*/}
                    <td>{moment(new Date()).format('DD/MM/YYYY')}</td>
                    <td>{inputField('quantity', total)}</td>
                    <td>{total.quantity - input.quantity}</td>
                    <td>{inputField('weight', total)}</td>
                    <td>{(total.weight - input.weight).toFixed(1)}</td>
                    <td>{inputField('threads', total)}</td>
                    <td>{total.threads - input.threads}</td>
                    <td>{inputField('money', total)}</td>
                    <td>{'$' + (total.money - input.money).toFixed(1)}</td>
                </tr>
            </>
        )
    }

    const getExceeded = () => {//Devuelve true si se excedió la fecha de entrega
        if (!selectedTask.deadline)
            return;
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        var dateParts = selectedTask.deadline.split('/');
        var deadline = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        return today > deadline;
    }

    if (name !== '') {
        Axios.post('http://localhost:3001/getTasks', { name, state: 'asigned' }).then((response) => {
            if (response.data.length === 0)
                return;
            setTasks(response.data);
        });
    }

    return (
        <>
            <div style={{ 'justifyContent': 'space-between', 'display': 'flex', 'alignItems': 'baseline' }}>
                <TaskRequest setSelectedTask={setSelectedTask} tasks={tasks} title={title} setTitle={setTitle} />
                <h4 style={{ 'color': getExceeded() ? 'red' : 'green' }}>
                    {(selectedTask === '') ? null : selectedTask.deadline}
                </h4>
            </div>
            {title === 'Elegir tarea' ? <></> :
                <>
                    <Form.Check onChange={() => {
                        setRefund(!refund);
                        input.money = -input.money;
                        input.quantity = -input.quantity;
                        input.threads = -input.threads;
                        input.weight = -input.weight;
                    }} label="Devolución o corrección" />
                    <Form.Check onChange={() => setCompleted(!completed)} label="Tarea cerrada" />
                    <Table striped bordered id="taskTable">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Cantidad entregada por el taller</th>
                                <th>Cantidad total de la tarea</th>
                                <th>Peso entregado por el taller</th>
                                <th>Peso total</th>
                                <th>Hilos devueltos</th>
                                <th>Hilos totales</th>
                                <th>Dinero entregado</th>
                                <th>Dinero total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ 'backgroundColor': 'green' }}>{/*Muestra el primero*/}
                                <td>{selectedTask.exitDate}</td>
                                <td></td>
                                <td>{selectedTask.quantity}</td>
                                <td></td>
                                <td>{selectedTask.weight}</td>
                                <td></td>
                                <td>{selectedTask.threads}</td>
                                <td>{'$' + account + ' (A CTA)'}</td>
                                <td>{'$' + selectedTask.price * selectedTask.quantity}</td>
                            </tr>
                            {getTable()}
                        </tbody>
                    </Table>
                </>
            }
        </>
    );
}