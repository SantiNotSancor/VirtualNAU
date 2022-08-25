import React, {Component} from 'react';
import { ModalOpener } from '../modalOpener';
import './styles.css';
import viewQueryLogo from './Images/viewQuery.gif';

export class ViewQuery extends Component{

    render() {
        return (
            <ModalOpener buttonText='Ver pedidos' handleClose={this.resetState}
                cardClassName='cardVendor' containerClassName='containerVendor' buttonClassName='buttonVendor3' imageClassName='imgVendor' logo={viewQueryLogo} title={'Nuevo pedido'} /*children={this.showData()}*/ />
        );
    }
}