import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import image from './Images/newPayment.gif';
import './indexWorkshopAdm.css'


const initialState = {
    errors: [true, true],
    error: true,
    name: '',
    money: ''
}

export class NewPaymentButton extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.resetState = this.resetState.bind(this);
        this.updateError = this.updateError.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.myForm = this.myForm.bind(this);
        this.post = this.post.bind(this);
    }
    
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
            <Form ref={this.form}>
                <Request toShow="workshopName" handleEnter={this.handleEnter} onChange={(value, error) => {
                    this.setState({ name: value });
                    this.updateError(0, error);
                }} />
                <Request toShow="money" handleEnter={this.handleEnter} onChange={(e, error) => {
                    this.setState({ money: e.target.value });
                    this.updateError(1, error);
                }} />
            </Form>
        );
    }

    post = () => {
        const { name, money } = this.state;
        Axios.put('http://localhost:3307/payWorkshop', { name, money });
        this.resetState();
    }

    print = () => {
        window.print();
    }

    render() {
        return (
            <ModalOpener buttonText='Nuevo pago' handleClose={this.resetState} footer={{ label: 'Imprimir', func: this.FunctionalComponentToPrint, show: !this.state.error }}
                cardClassName='cardWorkshopAdm' containerClassName='containerWorkshopAdm' buttonClassName='button1WorkshopAdm' imageClassName='imgWorkshopAdm' className={'title'} logo={image} title={'Pagar'} post={this.post} children={this.myForm()} />
        );
    }
}

// const FunctionalComponentToPrint = React.forwardRef<printable | null; Props>((props, ref) => { 
//     return <div ref={ref}><p>My Component Content Here</p></div>;
//   });

//  class printable extends Component {
//     render(){
//         return(
//             <>
                
//             </>
//         )
//     }
//  }