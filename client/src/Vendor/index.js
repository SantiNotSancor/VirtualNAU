import React, { Component, useEffect } from 'react';
import {AddStock} from './addStock';
import {NewQuery} from './newQuery';
// import {TickSuspended} from './tickSuspended';
// import {TickToDos} from './tickToDos';
// import './styles.css';

export default class Vendor extends Component {
  render() {
    return (
      <>
<<<<<<< HEAD
        {/* <style>{'body {background-color: #20154D; background-Image: url(http://localhost:3000/images/waveVendor.png); background-repeat: no-repeat; background-size: contain;'}</style>
        <h2 className='indexVendorh2'>¿Qué desea hacer?</h2>
        <div><NewQuery/></div> */}
        <div><AddStock/></div>
        {/* <div><ViewQuery/></div> */}
=======
        <style>{'body {background-color: #20154D; background-Image: url(http://localhost:3000/static/media/wave2.7146032980f03c6a0d0e.png); background-repeat: no-repeat;'}</style>
        <h2 className='indexVendorh2'>¿Qué desea hacer?</h2>
        <div><NewQuery /></div>
        <div><AddStock /></div>
        {/* <div className='card'><ViewQuery /></div> */}
>>>>>>> parent of 1c6b2c54 (Chau bootstrap)
        {/*<TickSuspended />
        <TickToDo /> */}
      </>
    );
  }
}