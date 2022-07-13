import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print";
//import './modal.css'

export class ModalController extends Component {//Debe ser extendida por el elemento que va a abrir el modal

    state = {
        showModal: false//True si y sólo si se debe mostrar el modal
    }

    showModal = () => {//A llamar cuando se quiere mostrar el modal
        this.setState({ showModal: true });
    }

    hideModal = () => {//A llamar cuando se quiere esconder el modal
        this.setState({ showModal: false });
    }

}

export class ModalPrototype extends Component {//Debe ser invocada para crear el modal. Ver props 

    render() {
        return (
            <Modal show={this.props.show} dialogClassName="modal-dialog">
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.children}
                </Modal.Body>

                <Modal.Footer>
                    {(this.props.footer && this.props.footer.show)?
                    <ReactToPrint trigger={() => <Button>Imprimir</Button>}
                        content={() => this.props.footer.content}/> : <></>}
                    <Button variant="primary" type="submit" onClick={() => {
                        this.props.post();//Se cierra desde post si todo está en orden
                    }}>Confirmar</Button>
                    <Button variant="secundary" onClick={this.props.handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Modal >
        );
    }
}

ModalPrototype.propTypes = {
    post: PropTypes.func.isRequired,//Función que enviará al back-end los datos del form
    title: PropTypes.string.isRequired,//String que se mostrará como título del modal
    show: PropTypes.bool.isRequired,//Boolean que especifica si se debe o no mostrar el modal
    handleClose: PropTypes.func.isRequired,//Función que cerrará el modal al presionar el botón
    children: PropTypes.element.isRequired,//Hijo que aparecerá en el modal
    footer: PropTypes.object//Tiene a show y a content (lo que se debe imprimir)
}