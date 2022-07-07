import React, { Component, useEffect } from 'react';
import {AddStock} from './addStock';
import {NewQuery} from './newQuery';
// import {TickSuspended} from './tickSuspended';
// import {TickToDos} from './tickToDos';
import './indexVendor.css';
import backgroundImage from './Images/wave2.png'

export default class Vendor extends Component {
  render() {
    return (
      <>
      {/* <div style={{ backgroundImage: `url(${background})` }}></div> */}
        <style>{'body {background-color: #20154D;'+{backgroundImage: `url(/Images/wave2.png)`}+'; background-repeat: no-repeat;}, html'}</style>
        <h2>¿Qué desea hacer?</h2>
        <div className='card'><AddStock /></div>
        {/* <div className={indexVendor.card}><NewQuery /></div> */}
        {/*<TickSuspended />
        <TickToDo /> */}
      </>
    );
  }
}