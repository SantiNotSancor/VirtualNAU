import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import { Request } from '../textInputs';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import image from './Images/newPayment.gif';
import './styles.css'


const initialState = {
    errors: [true, true],
    error: true,
    name: '',
    money: ''
}

export class NewPaymentButton extends Component {

    toPrint = React.createRef();

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
            <div  className='modalPayment' style={{display: "none"}} /*id="myModal"*/>
                <Form ref={this.form}>
                    <div /*className='modalPayment-content'*/>
                        <span className="close">&times;</span>
                        <Request toShow="workshopName" handleEnter={this.handleEnter} onChange={(value, error) => {
                            this.setState({ name: value });
                            this.updateError(0, error);
                        }} />
                        <Request toShow="money" handleEnter={this.handleEnter} onChange={(e, error) => {
                            this.setState({ money: e.target.value });
                            this.updateError(1, error);
                        }} />
                    </div>
                </Form>
            </div>
            // <!-- The Modal -->
            // <div id="myModal" class="modal">
            
            //   <!-- Modal content -->
            //   <div class="modal-content">
            //     <span class="close">&times;</span>
            //     <p>Some text in the Modal..</p>
            //   </div>
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
        let {name, money} = this.state;
        return (
            <>
<<<<<<< HEAD
                {/* component to be printed */}
                <div style={{ display: "none" }}>
                <ComponentToPrint ref={(el) => (this.toPrint = el)} data={{name, money}}/>
                </div>
                <ModalOpener buttonText='Nuevo pago' handleClose={this.resetState}
                    footer={{ content: this.toPrint, show: !this.state.error }} error={this.state.error}
                    cardClassName='cardWorkshopAdm' containerClassName='containerWorkshopAdm' buttonClassName='button1WorkshopAdm' imageClassName='imgWorkshopAdm' className={'title'} logo={image} title={'Pagar'} post={this.post} children={this.myForm()} modalClass="modalPayment" modalContentClass="modalNewPayment-content" modalId="myModal"
                />
=======
            {/* component to be printed */}
            <div style={{ display: "none" }}>
            <ComponentToPrint ref={(el) => (this.toPrint = el)} data={{name, money}}/>
            </div>
            <ModalOpener buttonText='Nuevo pago' handleClose={this.resetState}
                footer={{ content: this.toPrint, show: !this.state.error }} error={this.state.error}
                cardClassName='cardWorkshopAdm' containerClassName='containerWorkshopAdm' buttonClassName='button1WorkshopAdm' imageClassName='imgWorkshopAdm' className={'title'} logo={image} title={'Pagar'} post={this.post} children={this.myForm()} />
>>>>>>> parent of 1c6b2c54 (Chau bootstrap)
            </>
        );
    }

}

class ComponentToPrint extends React.Component {
    render(){
        const { data } = this.props;
        return (
<<<<<<< HEAD
            <div id="toPrint" className='modalPayment'>
                <table>
=======
            <div id="toPrint">
                <Table striped bordered>
>>>>>>> parent of 1c6b2c54 (Chau bootstrap)
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ 'backgroundColor': 'green' }}>
                            <td>{data.name}</td>
                            <td>{'$' + data.money}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}