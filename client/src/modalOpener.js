import React from 'react';
import { ModalController, ModalPrototype } from './modal';
import PropTypes from 'prop-types';

//Crea un botón que abre un modal

export class ModalOpener extends ModalController {

    render() {
        return (
            <div className={this.props.cardClassName}>
                    <img className={this.props.imageClassName} alt="" src={this.props.logo}/>
                <button className={this.props.buttonClassName} onClick={this.showModal}>{/*Hereda la función desde ModalController*/}
                    {this.props.buttonText}
                </button>
                <ModalPrototype show={this.state.showModal} handleClose={() => {
                    this.hideModal();
                    if(this.props.handleClose)
                        this.props.handleClose();
                }} footer={this.props.footer}
                    children={this.props.children} title={this.props.title} post={() => {
                        if (!this.props.error) {
                            this.props.post();
                            this.hideModal();
                        }
                        else
                            alert('Error');
                    }} />
                {/*Crea un Modal que se muestra si this.state.showModal y con hijo(s) this.props.children*/}
            </div>
        );
    }
}


ModalOpener.propTypes = {
    post: PropTypes.func.isRequired,//Enviará los datos al back-end
    title: PropTypes.string.isRequired,//Título del modal
    cardClassName: PropTypes.string,//Texto que le dará clase a el div
    buttonClassName: PropTypes.string,//Texto que le dará clase al boton
    imageClassName: PropTypes.string,//Texto que le dará clase a la imagen
    logo: PropTypes.string.isRequired,//Dirección relativa donde se encuentra el logo
    buttonText: PropTypes.string.isRequired,//Texto que aparecerá en el botón
    children: PropTypes.element.isRequired,//Hijo que aparecerá en el modal
    footer: PropTypes.object,
    error: PropTypes.bool,
    handleClose: PropTypes.func
}

ModalOpener.defaultProps = {
    error: false
}