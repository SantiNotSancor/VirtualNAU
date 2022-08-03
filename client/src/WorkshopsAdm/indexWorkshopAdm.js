import React, { Component } from 'react';
import { ArtWorkButton } from './RegistrationDrop/registrationDrop';
//import { NewTaskButton } from './newTask';
import { NewPaymentButton } from './newPayment';
import { DeliverTaskButton } from './deliverTask';
import { AssignTaskButton } from './assignTask';
//  import { ShowData } from '../showData';
//import '../styles.css';
import './indexWorkshopAdm.css'

export default class WorkshopsAdm extends Component {

  render() {
    return (
      <>
        <style>{'body {background-color: #20154D; background-Image: url(http://localhost:3000/static/media/wave4.9a618c303bdccef75aa3.png); background-repeat: no-repeat;'}</style>  
        <h2 className='h2WorkshopAdm'>¿Qué desea hacer?</h2>
        <div><NewPaymentButton /></div>
        {/* <div><NewTaskButton /></div> */}
        <div><AssignTaskButton /></div>
        <div><DeliverTaskButton /></div>
        <div><ArtWorkButton article={false} /></div>
        {/* <div><ArtWorkButton article={true} /></div> */}
        {/* <ShowData /> */}
      </>
    );
  }
}