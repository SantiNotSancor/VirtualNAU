import React, { Component } from 'react';
import {NewTask} from './newTask';
import {ShowOrders} from './showOrders';


export default class Production extends Component {
  render() {
    return (
      <>
        <h2>¿Qué desea hacer?</h2>
        <ShowOrders />
        <NewTask />
      </>
    );
  }
}