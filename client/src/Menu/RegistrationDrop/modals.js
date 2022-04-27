import React, { useState } from 'react';
import { ModalPrototype } from '../../modal';
import { Request } from '../../textInputs';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';

export const ModalArt = ({ handleClose, show, registration }) => {//Se encargará de los forms para dar de alta/baja a los artículos
    const [error, setError] = useState(false);
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');

    const myHandleClose = () => {
        handleClose();
        setId('');
        setDescription('');
        setError(false);
    }

    const post = () => {
        if (registration)
            Axios.post('http://localhost:3001/getDescriptionWhere', { id }).then((response) => {
                setError(response.data.length !== 0);
                if (response.data.length === 0)
                    Axios.post('http://localhost:3001/regArticle', { id, description });
            });
        else
            Axios.delete(`http://localhost:3001/dropArticle/${id}`).then(() => console.log('hi'));
        myHandleClose();
    }

    const myForm = () => {
        if (registration) {//de ser true, se está dando el alta, de lo contrario, la baja
            return (
                <Form>
                    <Request toShow="regArticle" onChange={(event) => {
                        setId(event.target.value);
                    }} />
                    {error ? <em>Este número de artículo ya fue ingresado, verifique si ya está dado de alta o pruebe otro número</em> : <></>}

                    <Request toShow="description" onChange={(event) => {
                        setDescription(event.target.value);
                    }} />
                </Form>
            );
        }
        else
            return (
                <Form>
                    <Request toShow="article" onChange={(event) => {
                        setId(event);
                    }} />
                </Form>
            );
    }

    return (
        <ModalPrototype show={show} handleClose={myHandleClose} children={myForm()}
            title={((registration) ? 'Alta' : 'Baja') + ' de artículo'} post={post} />//El modal debe mostrar el form especificado en Article
    );

}

ModalArt.propTypes = {
    handleClose: PropTypes.func.isRequired, //Función que cierra el modal
    show: PropTypes.bool.isRequired, //True si y sólo si se debe o no ver el modal
    registration: PropTypes.bool.isRequired //True si y sólo si se da un alta
}


export const ModalWork = ({ handleClose, show, registration }) => {//Se encargará de los forms para dar de alta/baja a los talleres
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState(false);

    const myHandleClose = () => {
        handleClose();
        setName('');
        setContact('');
        setError(false);
    }

    const post = () => {
        if (registration)
            Axios.post('http://localhost:3001/getNamesWhere', { name }).then((response) => {
                setError(response.data.length !== 0);
                if (response.data.length === 0)
                    Axios.post('http://localhost:3001/regWorkshop', { name, contact });
            });
        else
            Axios.delete(`http://localhost:3001/dropWorkshop/${name}`);
        myHandleClose();
    }

    const myForm = () => {
        if (registration) {//de ser true, se está dando el alta, de lo contrario, la baja
            return (
                <Form>
                    <Request toShow="regName" onChange={(element) => {
                        setName(element.target.value);
                    }} />
                    {error ? <em>Este taller ya fue ingresado, verifique si ya está dado de alta el taller o pruebe otro nombre</em> : <></>}
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
        else
            return (
                <Request toShow="name" onChange={(element) => {
                    setName(element);
                }} />
            );
    }

    return (
        <ModalPrototype show={show} handleClose={myHandleClose} children={myForm()}
            title={((registration) ? 'Alta' : 'Baja') + ' de taller'} post={post} />//El modal debe mostrar el form especificado en Workshop
    );
}

ModalWork.propTypes = ModalArt.propTypes;