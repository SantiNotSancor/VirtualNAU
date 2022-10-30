import React, { Component } from "react";
import Axios from "axios";
//import './index.css';
import logo from './images/nau.png';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import './styles.css'
// import Vendor from '../Vendor';

// import { 
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Link
// } from "react-router-dom";
// import './styles.css'
// import Vendor from '../Vendor';

const initialState = {
    password: "",
    user: "",
    validations: [],
    error: false
};

export default class Login extends Component {
    state = initialState;

    componentDidMount(){
        Axios.post('http://localhost:3307/getPasswords').then((response) => {
            let aux = response.data.reduce((accumulator, element) => {
                accumulator[element.name] = element.password;
                return accumulator;
            }, {});
            console.log(aux);
            this.setState({ validations: aux});
        });
    }

    submit = () => {
        let error = this.state.validations[this.state.user] === this.state.password;
        this.setState({ error });
        
        if (error) //Enviar a otra pestaña
            console.log('Correcto');

        //window.open(this.state.user,'_self');
        // TODO: Debe existir una página para cada usuario que se llame vendor, production, workshops, expedition o manager
    };

    render() {
        return (
            <div className="divLogin2">
                <style>{'body {background-color: #20154D; background-image: url("http://localhost:3000/images/wave.png"); background-repeat: no-repeat; background-position: 2px 280px; width: 100%; height: 700px; font-family: "SalmaAlfasans", sans-serif; background-size: contain; overflow: hidden;'}</style>
                <h1 className="h1Login"></h1>
                <div className="divLogin1">
                    <img className="logoLogin" src={logo}/>
                    <h1 className="h1Login">Iniciar sesión</h1>
                    <div>
                        <h2 className="h2Login">Seleccione tipo de usuario</h2>
                        <select className="selectLogin" name="Tipo de Usuario" id="usuario"
                            onChange={(user) => {
                                console.log(user.target.value)
                                Axios.post('http://localhost:3307/getPassword', { user: user.target.value }).then((response) =>
                                this.setState({ actualPassword: response.data[0].password, user: user.target.value }));
                            }}>
                            <option value="vendor">Vendedor</option>
                            <option value="production">Producción</option>
                            <option value="workshops">Administración de talleres</option>
                            <option value="expedition">Expedición</option>
                            <option value="manager">Gerencia</option>
                        </select>
                    </div>
                    <input className="inputLogin" type="password" placeholder="Contraseña" onChange={(e) => this.setState({ password: e.target.value })}></input>
                    {this.state.error ? <p className="pLogin">Contraseña incorrecta. Vuelva a intentarlo.</p> : null}
                    <br/>
                    <br/>
                    <button className="buttonLogin" onClick={
                        (e) => {
                            e.preventDefault();
                            const error = this.state.password !== this.state.actualPassword;
                            this.setState({ error });
                            if (!error)
                            this.submit();
                        }
                    }>Ingresar</button>
                </div>
            </div>
        );
    }
  }