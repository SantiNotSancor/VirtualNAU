import React from 'react';
import { ModalArt, ModalWork } from './modals';
import { ModalController } from '../../modal';
import PropTypes from 'prop-types';

export class ArtWorkButton extends ModalController {

    state = {
        ...this.state,//Hereda los estados de ModalController (showModal: false)
        registration: false//True si y sólo si se está dando el alta al artículo
    }

    showModal = e => {//Cuando se presione el botón se ejecuta
        this.setState({ showModal: true, registration: e.target.value === 'true' })
        //registration toma el valor pasado en el botón y se muestra el modal
    }

    callModal = () => {
        if (this.props.article)
            return (
                <ModalArt handleClose={this.hideModal} show={this.state.showModal} registration={this.state.registration}/>
            );
        return (
            <ModalWork handleClose={this.hideModal} show={this.state.showModal} registration={this.state.registration}/>
        )
    }

    render() {
        return (
            <ul className='branched'>
                <li className='title'>
                    {this.props.article ? 'Artículo' : 'Taller'}
                </li>
                <li>
                    <ul className='branch'>
                        <li>
                            <button onClick={this.showModal} value={'true'}>
                                Alta
                            </button>
                        </li>
                        <li>
                            <button onClick={this.showModal} value={'false'}>
                                Baja
                            </button>
                        </li>
                    </ul>
                </li>
                {this.callModal()}
                {/*Llama al Modal encargado de los Artículos*/}
            </ul>
        );
    }
}

ArtWorkButton.propTypes = {
    article: PropTypes.bool.isRequired //Especifica si se debe hacer un botón sobre artículos o talleres
}