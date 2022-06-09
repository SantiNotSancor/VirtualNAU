import React, { Component, useState, useEffect } from 'react';
import { ModalOpener } from '../modalOpener';
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
    observation: '',
    paid: false,
    workshopAccount: ''
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
                <Request toShow="workshopName" handleEnter={this.handleEnter} onChange={(value, error) => {
                    this.setState({ name: value });
                    this.updateError(0, error);
                }} />
                <Input name={this.state.name} onChange={(data, price, faulty, task, completed, paid, workshopAccount, usedAccount) => {
                    this.setState({
                        task, quantity: data.quantity, money: Number(data.money) + Number(usedAccount), weight: data.weight,
                        threads: data.threads, completed, price, faulty, paid, workshopAccount
                    });
                    this.updateError(1, false);
                }} />
            </Form>
        );
    }

    post = () => {
        let { completed, task, money, weight, name, quantity, price, threads, paid, workshopAccount } = this.state;
        if (!completed)
            this.resetState();
        Axios.post('http://localhost:3307/getTasks', { id: task }).then((response) => {
            Axios.put('http://localhost:3307/payWorkshop',
                { name: response.data[0].name, money: money - quantity * price })
        })
        Axios.post('http://localhost:3307/newPart',
            {
                name, task, date: moment(new Date()).format('DD/MM/YYYY'), quantity, threads, paid,
                weight: Number(weight).toFixed(1), money: Number(money).toFixed(1)
            }).then(() => {
                if (completed)
                    this.setState({ showObsModal: true });
            });
        Axios.put('http://localhost:3307/setAccount', { money: workshopAccount, name })//Actualizar el dinero que posee a cuenta el taller
    }

    completelyReturned = () => {
        Axios.put('http://localhost:3307/printObs',
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
                    title="Ingreso de tarea" post={this.post} error={this.state.error} handleClose={this.resetState} />
                {/*Crea un botón que abre a un modal en el que aparecerá lo devuelto en this.myForm*/}

                <ModalPrototype title="Calificar" show={this.state.showObsModal} post={this.sendObs} handleClose={(this.sendObs)}>
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

    const [title, setTitle] = useState('Elegir tarea'); //Título del selectBox. Primero va a ser 'Elegir tarea' pero luego va a mostrar la tarea elegida
    const [tasks, setTasks] = useState([]);//Todas las tareas que no se le pagaron por completo al taller
    const [parts, setParts] = useState([]);//Todas las entregas parciales de la tarea elegida
    const [input, setInput] = useState({ quantity: 0, weight: 0, money: 0, threads: 0 });//Lo ingresado por el usuario en la tabla
    const [selectedTask, setSelectedTask] = useState('');//La tarea elegida
    const [refund, setRefund] = useState(false);//¿Está cargando una devolución?
    const [completed, setCompleted] = useState(false);//¿El taller entregó el total de la mercadería?
    //const [actualAccount, setActualAccount] = useState('');//Dinero que le fue pagado al taller anteriormente (la cuenta corriente)
    const [account, setAccount] = useState('');//Dinero que le fue pagado al taller anteriormente (la cuenta corriente)
    const [quantityBackUp, setQuantityBackUp] = useState('');//Una variable auxiliar para recordar la cantidad, de esta forma podremos saber cuándo cambia

    useEffect(() => {
        if (name === '')
            return;
        Axios.post('http://localhost:3307/getUnpaidTasks', { name }).then((response) => {
            if (response.data.length === 0)
                return;
            setTasks(response.data);
        });
        console.log('update tasks');
    }, [name]);

    useEffect(() => {//Cuando selectedTask cambia...
        setInput({ quantity: 0, weight: 0, money: 0, threads: 0 });//Resetear los valores de Input (porque el usuario no ingresó nada)
        let moneyPaid = input.money;
        Axios.post('http://localhost:3307/getParts', { task: selectedTask.id }).then(response => {
            setParts(response.data)//Recuperar partes desde la BD y asignarselas a parts
            response.data.map(part => moneyPaid += part.money);//Sumar a moneyPaid todo lo pagado en cada parte
            if (name)//Si se sabe el nombre del taller...
                Axios.post('http://localhost:3307/getAccount', { name }).then(response => {//Recuperar de la BD la cuenta corriente del taller
                    setAccount(response.data[0].money);
                });
        });
    }, [selectedTask]);

    useEffect(() => {
        let delivered = input.quantity;
        let moneyPaid = isNaN(input.money) ? 0 : input.money;
        parts.map(part => moneyPaid = Number(moneyPaid) + Number(part.money));//Sumar a moneyPaid todo lo pagado en cada parte
        parts.map(part => delivered += part.quantity);//Sumar a delivered todas las cantidades entregadas en cada parte
        if (quantityBackUp !== input.quantity) {//Si se modificó la cantidad
            input.money = input.quantity * selectedTask.price - account;//Le recomienda al usuario pagar todo lo que debe pagar (lo entregado en esta parte * el precio acordado - la cuenta corriente de esta parte)
            input.money = input.money < 0 ? 0 : input.money;//No se le puede recomendar pagar un número negativo
            setQuantityBackUp(input.quantity);//Volver a actualizar la cantidad
        }
        onChange(input, selectedTask.price, selectedTask.quantity - delivered, selectedTask.id,//Se envían los cambios
            delivered === selectedTask.quantity || completed, selectedTask.quantity * selectedTask.price <= moneyPaid, input.quantity * selectedTask.price - moneyPaid - account, account);//TODO: Revisar fórmula para leftover (workshopAccount)
        //onChange(data, price, faulty, task, completed, paid, workshopAccount, usedAccount)//objeto con todo lo ingresado, precio, artículos fallados, id de tarea, si se entregaron todos los artículos, si se pagó la totalidad de la tarea, lo que le quedará de cuenta corriente al taller luego de la parte y la cantidad de dinero utilizado de la cuenta corriente
    }, [input, completed, refund]); // eslint-disable-line react-hooks/exhaustive-deps

    const inputField = (property, total) => {//Función que devuelve un inputbox para ingresar datos al objeto input. propery
        //property es la propiedad de input que se quiere modificar con el inputbox y total es el objeto que contiene todos los totales
        return (
            <FormControl value={input[property]}//Asignar al inputbox la variable input[property], es decir que cada vez que el inputbox se modifica, la variable también y vice versa
                onChange={(e) => {//Cuando cambia el inputbox...
                    let value = e.target.value;
                    if (isNaN(value) || (total[property] < value && property !== 'money'))//Si el valor es inválido...
                        return;//Cancelar
                    let aux = { ...input };
                    aux[property] = (value[value.length - 1] === '.') ? value : Number(value);
                    aux[property] = (refund) ?//Si se está haciendo una devolución de mercadería o se contó mal la mercadería en una parte anterior
                        -Math.abs(aux[property]) ://Poner en negativo lo ingresado (así se suma y no se resta al total)
                        (aux[property] < 0) ? 0 : aux[property];//Si la propiedad es negativa, convertir en 0
                    if (property === 'quantity' || property === 'threads')//Si la propiedad es cantidad o hilos...
                        aux[property] = Math.round(aux[property]);//No puede ser decimal
                    setInput({ ...aux });
                }} />
        );
    }

    const getTable = () => {

        let total = {
            quantity: selectedTask.quantity,
            weight: selectedTask.weight,
            money: selectedTask.quantity * selectedTask.price,
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
                            <td>{ }</td>
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
                    <td>{'$' + account}</td>
                    <td>{'$' + (total.money - input.money - account).toFixed(1)}</td>
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

    return (
        <>
            <div style={{ 'justifyContent': 'space-between', 'display': 'flex', 'alignItems': 'baseline' }}>
                <TaskRequest setSelectedTask={setSelectedTask} tasks={tasks} title={title} setTitle={setTitle} />
                <h4 style={{ 'color': getExceeded() ? 'red' : 'green' }}>
                    {(selectedTask === '') ? null : selectedTask.deadline}
                </h4>
            </div>
            {title === 'Elegir tarea' ? null :
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
                                <th>Dinero a cuenta</th>
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
                                <td></td>
                                <td></td>
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