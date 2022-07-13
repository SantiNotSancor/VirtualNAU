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
        <style>{'body {background-color: #20154D; background-Image: url(http://localhost:3000/static/media/wave2.7146032980f03c6a0d0e.png); background-repeat: no-repeat;'}</style>
        <h2 className='indexVendorh2'>¿Qué desea hacer?</h2>
        <div className='card'><NewQuery /></div>
        <div className='card'><AddStock /></div>
        {/* <div className='card'><ViewQuery /></div> */}
        {/*<TickSuspended />
        <TickToDo /> */}
      </>
    );
  }
}