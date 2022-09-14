import React, { Component } from 'react';
import { ArtWorkButton } from './RegistrationDrop/registrationDrop';
//import { NewTaskButton } from './newTask';
import { NewPaymentButton } from './newPayment';
import { DeliverTaskButton } from './deliverTask';
import { AssignTaskButton } from './assignTask';
//  import { ShowData } from '../showData';
import './styles.css'

import { ModalPrototype } from '../modal'; //BORRAR DESPUES

export default class WorkshopsAdm extends Component {

  render() {
    return (
      <>
        <style>{'body {background-color: #20154D; background-Image: url(http://localhost:3000/wave4.png); background-repeat: no-repeat; background-size: contain'}</style>  
        <h2 className='h2WorkshopAdm'>¿Qué desea hacer?</h2>
        <ModalPrototype 
        post = {() => {}} title="Prueba"  handleClose ={() => {}} children={<></>}
        />
        
        
        {/* <div><NewPaymentButton /></div> */}
        {/* <div><NewTaskButton /></div> */}
<<<<<<< HEAD
        {/* <div><AssignTaskButton /></div> */}
        {/* <div><DeliverTaskButton /></div> */}
        {/* <div><ArtWorkButton article={false} /></div> */}
        {/* <div className='selectWorkshopAdm'> */}
        
        {/* </div> */}
=======
        <div><AssignTaskButton /></div>
        <div><DeliverTaskButton /></div>
        <div><ArtWorkButton article={false} /></div>
>>>>>>> parent of 1c6b2c54 (Chau bootstrap)
        {/* <div><ArtWorkButton article={true} /></div> */}
        {/* <ShowData /> */}
      </>
    );
  }
}