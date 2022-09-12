import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print";
// import './WorkshopsAdm/styles.css'
// import './modal.css'

export class ModalController extends Component {//Debe ser extendida por el elemento que va a abrir el modal
        // Get the modal
        // var modal = document.getElementById("myModal");

        // // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // // Get the <span> element that closes the modal
        // var span = document.getElementsByClassName("close")[0];

        // // When the user clicks on the button, open the modal
        // btn.onclick = function() {
            // this.style.display = "block";
        // }

        // // When the user clicks on <span> (x), close the modal
        // span.onclick = function() {
        //   modal.style.display = "none";
        // }

        // // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function(event) {
        //   if (event.target == modal) {
        //     modal.style.display = "none";
        //   }
        // }

        
        state = {
            showModal: false//True si y sólo si se debe mostrar el modal
        }
        
    showModal = (modal) => {//A llamar cuando se quiere mostrar el modal
        // this.setState({ showModal: true });
        this.getElementById(modal).style.display = "block";
    }

    hideModal = () => {//A llamar cuando se quiere esconder el modal
        // var btn = document.getElementById({this.props.close});
        this.setState({ showModal: false });
    }

}

export class ModalPrototype extends Component {//Debe ser invocada para crear el modal. Ver props 

    render() {
        return (
            <div className="modal modalDiv" /*dialogClassName="modal-dialog"*/>
                    <h1 className='titleModal'>{this.props.title}</h1>
                    <div>
                        {this.props.children}
                    </div>

                    <div>
                        {(this.props.footer)?
                        <ReactToPrint trigger={() => <button>Imprimir</button>}
                        content={() => this.props.footer.content}/> : <></>}
                        <button className='confirm' variant="primary" type="submit" onClick={() => {
                            this.props.post();//Se cierra desde post si todo está en orden
                        }}>Confirmar</button>
                        <button className='cancel' variant="secundary" onClick={this.props.handleClose}>Cancelar</button>
                    </div>
            </div >
        );
    }
}

ModalPrototype.propTypes = {
    post: PropTypes.func.isRequired,//Función que enviará al back-end los datos del form
    title: PropTypes.string.isRequired,//String que se mostrará como título del modal
    // show: PropTypes.bool.isRequired,//Boolean que especifica si se debe o no mostrar el modal
    handleClose: PropTypes.func.isRequired,//Función que cerrará el modal al presionar el botón
    children: PropTypes.element.isRequired,//Hijo que aparecerá en el modal
    footer: PropTypes.object,//Tiene a show y a content (lo que se debe imprimir)
}