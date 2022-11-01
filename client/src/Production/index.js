import React, { Component } from 'react';
import {NewTask} from './newTask';
import {ShowOrders} from './showOrders';
import {ModalShowData} from '../showData';
import './styles.css'


export default class Production extends Component {
  render() {
    return (
      <>
        <style>{'body {background-color: #20154D; background-Image: url(http://localhost:3000/wave3.png); background-repeat: no-repeat; background-size: cover'}</style>
        <h2 class='h2Production'>¿Qué desea hacer?</h2>
        <NewTask />
        <ShowOrders />
        <ModalShowData />
      </>
    );
  }
}