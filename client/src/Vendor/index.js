import React, { Component } from 'react';
import {AddStock} from './addStock';
import {NewQuery} from './newQuery';
// import {TickSuspended} from './tickSuspended';
// import {TickToDos} from './tickToDos';
import '../styles.css';

export default class Vendor extends Component {

  render() {
    return (
        <>
          <ul className='menu-selector'>
              <AddStock />
              <NewQuery />
              {/*<TickSuspended />
              <TickToDo /> */}
          </ul>
        </>
    );
  }
}