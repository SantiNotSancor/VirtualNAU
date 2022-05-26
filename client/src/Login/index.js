import React, { Component } from "react";
import Axios from "axios";

const initialState = {
    password: "",
    actualPassword: "",
    user: "",
    error: false
};

export default class Login extends Component {
    state = initialState;

    submit = () => {
        //window.open(this.state.user,'_self');
        // TODO: Debe existir una págnia para cada usuario que se llame vendor, production, workshops, expedition o manager
    };

    render() {
        return (
            <>
                <form>
                    <select onChange={(user) => {
                        Axios.post('http://localhost:3307/getPassword', { user: user.target.value }).then((response) =>
                            this.setState({ actualPassword: response.data[0].password, user: user.target.value }));
                    }}>
                        <option value="vendor">Vendedor</option>
                        <option value="production" selected>
                            Producción
                        </option>
                        <option value="workshops">Administración de talleres</option>
                        <option value="expedition">Expedición</option>
                        <option value="manager">Gerencia</option>
                    </select>
                    <input type="password" onChange={(e) => this.setState({ password: e.target.value })}></input>
                    {this.state.error ? <p>ERROR</p> : null}
                    <button onClick={
                        (e) => {
                            e.preventDefault();
                            const error = this.state.password !== this.state.actualPassword;
                            this.setState({ error });
                            if (!error)
                                this.submit();
                        }
                    }>
                        Enviar
                    </button>
                </form>
            </>
        );
    }
}