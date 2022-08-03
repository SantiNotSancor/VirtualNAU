import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login/loginIndex';
import Vendor from './Vendor/indexVendor';
import WorkshopsAdm from './WorkshopsAdm/index';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  //<Login />,  
  //<Vendor />,
  <WorkshopsAdm />,
  document.getElementById('root')
);