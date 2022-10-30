import React, { Component, useEffect } from 'react';
import {AddStock} from './addStock';
import {NewQuery} from './newQuery';
import {ModalShowData} from '../showData';
// import {ViewQuery} from './viewQuery.js';
// import {TickSuspended} from './tickSuspended';
// import {TickToDos} from './tickToDos';
import './styles.css';

export default class Vendor extends Component {
  render() {
    return (
      <>
        <style>{'body {background-color: #20154D; background-Image: url("http://localhost:3000/images/wave2.png");; background-repeat: no-repeat; background-size: contain;'}</style>
        <h2 className='indexVendorh2'>¿Qué desea hacer?</h2>
        <NewQuery />
        <AddStock />
        <ModalShowData />
        {/* <div className='card'><ViewQuery /></div> */}
        {/*<TickSuspended />
        <TickToDo /> */}
      </>
    );
  }
}