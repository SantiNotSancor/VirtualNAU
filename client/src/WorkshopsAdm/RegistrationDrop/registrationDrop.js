import React from 'react';
import { ModalWork } from './modals';
import { ModalArt } from './modals';
import { ModalController } from '../../modal';
import PropTypes from 'prop-types';
import image from '../Images/registrationDrop.gif'

export class ArtWorkButton extends ModalController {

    state = {
        ...this.state,//Hereda los estados de ModalController (showModal: false)
        modify: 'reg'
    }

    showModal = e => {//Cuando se presione el botón se ejecuta
        this.setState({ showModal: true, modify: e })
        //modify toma el valor pasado en el botón y se muestra el modal
    }

    callModal = () => {
        if (this.props.article)
            return (
                <ModalArt handleClose={this.hideModal} show={this.state.showModal} modify={this.state.modify}/>
            );
        return (
            <ModalWork handleClose={this.hideModal} show={this.state.showModal} modify={this.state.modify}/>
        )
    }

    render() {
        return (
            <div className='card2WorkshopAdm'>
                <p className='pWorkshopAdm'>{this.props.article ? 'Artículo' : 'Actualizar datos de taller'}</p>
                <img id='imagen_diferente' src={image}/>
                <div className='containerWorkshopAdm'>
                    <button className='button4WorkshopAdm' onClick={() => this.showModal('reg')}>
                        Alta
                    </button>
                    <button className='button5WorkshopAdm' onClick={() => this.showModal('drop')}>
                        Baja
                    </button>
                    <button className='button6WorkshopAdm' onClick={() => this.showModal('update')}>
                        Modificar
                    </button>
                </div>

                {this.callModal()}
                {/*Llama al Modal encargado de los Artículos*/}
            </div>
        );
    }
}

ArtWorkButton.propTypes = {
    article: PropTypes.bool.isRequired //Especifica si se debe hacer un botón sobre artículos o talleres
}