import React, { Component } from 'react';
import { ArtWorkButton } from './RegistrationDrop/registrationDrop';
import { NewTaskButton } from './newTask';
import { NewPaymentButton } from './newPayment';
import { DeliverTaskButton } from './deliverTask';
import { AssignTaskButton } from './assignTask';
import { ShowData } from '../showData';
import '../styles.css';

export default class WorkshopsAdm extends Component {

  render() {
    return (
      <>
        <ul className='menu-selector'>

          <li><NewTaskButton /></li>
          <li><NewPaymentButton /></li>
          <li><AssignTaskButton /></li>
          <li><DeliverTaskButton /></li>
          <li><ArtWorkButton article={false} /></li>

        </ul>
        <ShowData />
      </>
    );
  }
}