import React, { Component } from "react";

const initialState = {
    password: "",
    actualPassword: "",
    user: "",
    error: false
};

export default class Login extends Component {
    state = initialState;

    componentDidMount = () => {
        this.setState({ actualPassword: "123" });
        // TODO: Tomar la contraseña actual guardada en la base de datos
    };

    submit = () => {
        // TODO: Mandar a la siguiente página y asignarle a ella el usuario this.state.user
    };

    render() {
        return(
        <form>
            <select onChange={(user) => {this.setState({ user: user.target.value }); console.log(user.target.value)}}>
                <option value="vendor">Vendedor</option>
                <option value="production" selected>
                    Producción
                </option>
                <option value="workshops">Administración de talleres</option>
                <option value="expedition">Expedición</option>
                <option value="manager">Gerencia</option>
            </select>
            <input onChange={(e) => this.setState({ password: e.target.value })}></input>
            {this.state.error ? <p>ERROR</p> : null}
            <button onClick={
                (e) => {
                    e.preventDefault();
                    const error = !this.state.user && (this.state.password !== this.state.actualPassword);
                    this.setState({ error });
                    console.log(this.state.actualPassword !== this.state.password);
                    console.log(error);
                    if (!error)
                        this.submit();
                }
            }>
                Enviar
            </button>
        </form>);
    }
}