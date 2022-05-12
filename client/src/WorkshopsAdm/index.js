import React, { Component } from 'react';
import { ArtWorkButton } from './RegistrationDrop/registrationDrop';
import { NewTaskButton } from './newTask';
import { DeliverTaskButton } from './deliverTask';
import { AsignTaskButton } from './asignTask';
import '../styles.css';
import { ShowData } from './showData';

export default class WorkshopsAdm extends Component {

  render() {
    return (
      <>
        <ul className='menu-selector'>

          <li><AsignTaskButton /></li>
          <li><DeliverTaskButton /></li>
          <li><ArtWorkButton article={false} /></li>

        </ul>
        {/* <ShowData titles={['id', 'descripcion']} table={[[2024, 5054], ['Cartucherita', 'Riñonera']]}/> */}
      </>
    );
  }
}