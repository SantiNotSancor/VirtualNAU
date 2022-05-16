import React from 'react';
import { ModalWork } from './modals';
import { ModalController } from '../../modal';
import PropTypes from 'prop-types';

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
        // if (this.props.article)
        //     return (
        //         <ModalArt handleClose={this.hideModal} show={this.state.showModal} modify={this.state.modify}/>
        //     );
        console.log(this.state.modify);
        return (
            <ModalWork handleClose={this.hideModal} show={this.state.showModal} modify={this.state.modify}/>
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
                            <button onClick={() => this.showModal('reg')}>
                                Alta
                            </button>
                        </li>
                        <li>
                            <button onClick={() => this.showModal('drop')}>
                                Baja
                            </button>
                        </li>
                        <li>
                            <button onClick={() => this.showModal('update')}>
                                Modificar
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