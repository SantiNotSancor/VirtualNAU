import React, { useState } from 'react';
import { ModalPrototype } from '../../modal';
import { Request } from '../../textInputs';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';


export const ModalWork = ({ handleClose, show, modify }) => {//Se encargará de los forms para dar de alta/baja a los talleres
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
        if (modify === 'reg')
            Axios.post('http://localhost:3307/getNamesWhere', { name }).then((response) => {
                setError(response.data.length !== 0);
                if (response.data.length === 0)
                    Axios.post('http://localhost:3307/regWorkshop', { name, contact });
            });
        if (modify === 'drop')
            Axios.delete(`http://localhost:3307/dropWorkshop/${name}`);
        if (modify === 'update')
            Axios.post('http://localhost:3307/updateWorkshop',{ name, contact });
        myHandleClose();
    }

    const myForm = () => {
        if (modify === 'reg') {//de ser true, se está dando el alta, de lo contrario, la baja
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
        if (modify === 'drop')
            return (
                <Request toShow="workshopName" onChange={(element) => {
                    setName(element);
                }} />
            );
        if (modify === 'update')
        return (
            <Form>
                <Request toShow="workshopName" onChange={(element) => {
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
    let title;
    if (modify === 'reg')
        title = 'Alta';
    if (modify === 'drop')
        title = 'Baja';
    if (modify === 'update')
        title = 'Actualización';
    return (
        <ModalPrototype show={show} handleClose={myHandleClose} children={myForm()}
            title={title + ' de taller'} post={post} />//El modal debe mostrar el form especificado en Workshop
    );
}

ModalWork.propTypes = {
    handleClose: PropTypes.func.isRequired, //Función que cierra el modal
    show: PropTypes.bool.isRequired, //True si y sólo si se debe o no ver el modal
    modify: PropTypes.string.isRequired //'reg' Alta, 'drop' baja y 'update' actualizar
}

export const ModalArt = ({ handleClose, show, modify }) => {//Se encargará de los forms para dar de alta/baja a los artículos
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
        if (modify === 'reg')
            Axios.post('http://localhost:3307/getDescriptionWhere', { id }).then((response) => {
                setError(response.data.length !== 0);
                if (response.data.length === 0)
                    Axios.post('http://localhost:3307/regArticle', { id, description });
            });
        if (modify === 'drop')
            Axios.delete(`http://localhost:3307/dropArticle/${id}`).then(() => console.log('hi'));
        if (modify === 'update')
            Axios.put('http://localhost:3307/updateArticle', { id, description });
        myHandleClose();
    }

    const myForm = () => {
        if (modify === 'reg') {//de ser true, se está dando el alta, de lo contrario, la baja
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
        if(modify === 'drop')
            return (
                <Form>
                    <Request toShow="article" onChange={(event) => {
                        setId(event);
                    }} />
                </Form>
            );
        if(modify === 'update')
            return(
                <Form>
                    <Request toShow="article" onChange={(event) => {
                        setId(event);
                    }} />

                    <Request toShow="description" onChange={(event) => {
                        setDescription(event.target.value);
                    }} />
                </Form>
            );
    }
    let title;
    if (modify === 'reg')
        title = 'Alta';
    if (modify === 'drop')
        title = 'Baja';
    if (modify === 'update')
        title = 'Actualizar';
    return (
        <ModalPrototype show={show} handleClose={myHandleClose} children={myForm()}
            title={title + ' de artículo'} post={post} />//El modal debe mostrar el form especificado en Article
    );

}

ModalArt.propTypes = {
    handleClose: PropTypes.func.isRequired, //Función que cierra el modal
    show: PropTypes.bool.isRequired, //True si y sólo si se debe o no ver el modal
    modify: PropTypes.string.isRequired //'reg' Alta, 'drop' baja y 'update' actualizar
}
