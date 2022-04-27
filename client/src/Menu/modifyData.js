import React, { useState } from 'react';
import { ModalController, ModalPrototype } from '../modal';
import { Request } from '../textInputs';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';

export class ModifyDataButton extends ModalController {

    state = {
        ...this.state,//Hereda los estados de ModalController (showModal: false)
        article: false//True si y sólo si se está modificando al artículo
    }

    showModal = e => {//Cuando se presione el botón se ejecuta
        this.setState({ showModal: true, article: e.target.value === 'true' })
        //article toma el valor pasado en el botón y se muestra el modal
    }

    callModal = () => {
        if (this.props.article)
            return (
                <ModalArt handleClose={this.hideModal} show={this.state.showModal} />
            );
        return (
            <ModalWork handleClose={this.hideModal} show={this.state.showModal} />
        )
    }

    render() {
        return (
            <ul className='branched'>
                <li className='title'>
                    Modificar Datos
                </li>
                <li>
                    <ul className='branch'>
                        <li>
                            <button onClick={this.showModal} value={'false'}>
                                Taller
                            </button>
                        </li>
                        <li>
                            <button onClick={this.showModal} value={'true'}>
                                Artículo
                            </button>
                        </li>
                    </ul>
                </li>
                {this.callModal()}
            </ul>
        );
    }
}

export const ModalArt = ({ handleClose, show }) => {//Se encargará de los forms para modificar datos sobre artículos
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const post = () => {
        Axios.post('http://localhost:3001/create',
            { id, price, description }).then(() => {
                console.log('Artículos>Alta');
            });
    }

    const myForm = () => {
        return (
            <Form>
                <Request toShow="article" onChange={(event) => {
                    setId(event);
                }} />

                <Request toShow="price" onChange={(event) => {
                    setPrice(event.target.value);
                }} />

                <Request toShow="description" onChange={(event) => {
                    setDescription(event.target.value);
                }} />
            </Form>
        );
    }

    return (
        <ModalPrototype show={show} handleClose={handleClose} children={myForm()}
            title={'Modificación de artículo'} post={post} />//El modal debe mostrar el form especificado en Article
    );

}

ModalArt.propTypes = {
    handleClose: PropTypes.func.isRequired, //Función que cierra el modal
    show: PropTypes.bool.isRequired, //True si y sólo si se debe o no ver el modal
}

export const ModalWork = ({ handleClose, show }) => {//Se encargará de los forms para dar de alta/baja a los talleres
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const post = () => {
        Axios.post('http://localhost:3001/create',
            { name, contact });
    }

    const myForm = () => {
        return (
            <Form>
                <Request toShow="name" onChange={(element) => {
                    setName(element);
                }} />

                <Form.Group className="mb-3">
                    <Form.Label>Datos de contacto</Form.Label>
                    <Form.Control as="textarea" height="500px"
                        placeholder="Ingrese datos de contacto del tallerista…" onChange={(event) => {
                            setContact(event.target.value);
                        }} />
                </Form.Group>
            </Form>
        );
    }

    return (
        <ModalPrototype show={show} handleClose={handleClose} children={myForm()}
            title={'Modificación de taller'} post={post} />
    );
}

ModalWork.propTypes = ModalArt.propTypes;