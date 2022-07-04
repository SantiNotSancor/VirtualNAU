import React, { Component } from "react";
import Axios from "axios";
import './bodylogin.css';
import logo from './nau.png';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Vendor from '../Vendor/index';

const initialState = {
    password: "",
    actualPassword: "",
    user: "",
    error: false
};

export default class Login extends Component {
    state = initialState;

    componentDidUpdate(prevState){
        if(prevState.password !== this.state.password || prevState.actualPassword !== this.state.actualPassword)
            this.setState({ error: this.state.password !== this.state.actualPassword });
    }

    submit = () => {
        console.log('Correcto');

        //window.open(this.state.user,'_self');
        // TODO: Debe existir una págnia para cada usuario que se llame vendor, production, workshops, expedition o manager
    };

    path(){
        if (this.state.error)
            return;
        return '/' + this.state.user;
    }

    render() {
        return (
            <div>
                <img className="logo" src={logo}/>
                <h1></h1>
                <div>
                    <h1>Iniciar sesión</h1>
                    <h2>Seleccione tipo de usuario</h2>
                    <select name="Tipo de Usuario" id="usuario"
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
                    <p></p>
                    <input type="password" placeholder="Contraseña" onChange={(e) => this.setState({ password: e.target.value })}></input>
                    {this.state.error ? <p>Contraseña incorrecta. Vuelva a intentarlo.</p> : null}
                    <p></p>
                    {/* <Router>
                        <Link to={this.path()}> */}
                            <button className="button" style={{"verticalAlign":"middle"}} onClick={
                            (e) => {
                                e.preventDefault();
                                const error = this.state.password !== this.state.actualPassword;
                                this.setState({ error });
                                if (!error)
                                    this.submit();
                            }
                        }>
                                Ingresar
                            </button>
                        {/* </Link>
                        <Routes>
                            <Route path="/vendor" element={<Vendor />} />
                        </Routes>
                    </Router> */}
                </div>
            </div>
        );

        // return (
        // <Router>
        //     <div>
        //     <nav>
        //         <ul>
        //         <li>
        //             <Link to="/vendor"><button>Home</button></Link>
        //         </li>
        //         <li>
        //             <Link to="/about">About</Link>
        //         </li>
        //         <li>
        //             <Link to="/users">Users</Link>
        //         </li>
        //         </ul>
        //     </nav>
        //     <Routes>
        //         <Route path="/about" element={<About />} />
        //         <Route path="/users" element={<Users/>} />
        //         <Route path="/vendor" element={<Vendor/>} />
        //     </Routes>
        //     </div>
        // </Router>
        // );
    }
  }
  
  function Home() {
    return <p>Home</p>;
  }
  
  function About() {
    return <p>About</p>;
  }
  
  function Users() {
    return <p>Users</p>;
  }