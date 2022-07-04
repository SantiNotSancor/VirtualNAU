    import React, { Component } from 'react';
    import {AddStock} from './addStock';
    import {NewQuery} from './newQuery';
    // import {TickSuspended} from './tickSuspended';
    // import {TickToDos} from './tickToDos';
    import './Images/bodyvend.css';

    export default class Vendor extends Component {

      render() {
        return (
          <div className='body'>
            <AddStock />
            <NewQuery />
            {/*<TickSuspended />
            <TickToDo /> */}
          </div>
        );
      }
    }