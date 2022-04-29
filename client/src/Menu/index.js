import React, { Component } from 'react';
import { ArtWorkButton } from './RegistrationDrop/registrationDrop';
import { NewTaskButton } from './newTask';
import { DeliverTaskButton } from './deliverTask';
import { ModifyDataButton } from './modifyData';
import { AsignTaskButton } from './asignTask';
import './styles.css';
import { ShowData } from './showData';

export default class Menu extends Component {

  render() {
    return (
      <>
        <ul className='menu-selector'>

          <li><NewTaskButton /></li>
          <li><AsignTaskButton /></li>
          <li><DeliverTaskButton /></li>
          <li><ArtWorkButton article={false} /></li>
          <li><ArtWorkButton article={true} /></li>
          <li><ModifyDataButton /></li>

        </ul>
        <ShowData titles={['id', 'descripcion']} table={[[2024, 5054], ['Cartucherita', 'Riñonera']]}/>
      </>
    );
  }
}