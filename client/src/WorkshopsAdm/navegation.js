import React, { Component } from 'react';
import { ModalOpener } from '../modalOpener';
import image from './Images/Navegation.svg';

export class NavegationButton extends Component {
    myForm = () => {
        return (
            <ul>
                {/*Deberán aparecer los links hacia el resto de las páginas*/}
                <li><a href='www.google.com.ar'>Egreso de tareas</a></li>
                <li><a href='www.google.com.ar'>Ingreso de tareas</a></li>
                <li><a href='www.google.com.ar'>Talleres</a></li>
                <li><a href='www.google.com.ar'>Resumen de tareas</a></li>
            </ul>
        );
    }

    render() {
        return (
            <ModalOpener buttonText='Navegación' children={this.myForm()}
                className={'title'} logo={image} title={'Navegación'} post={()=>{}} />
            //Crea un botón que abre a un modal en el que aparecerá lo devuelto en this.myForm
        );
    }
}