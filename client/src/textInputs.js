import React, { useState, useEffect, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ModalArt, ModalWork } from './WorkshopsAdm/RegistrationDrop/modals'
// import './autocomplete.css';

export const Request = ({ onChange, toShow, label, value, handleEnter }) => {//Pedirá un dato con un input tipo text

    const [error, setError] = useState(false);

    let placeholder, auxLabel = label, checked = (input) => input !== '';

    switch (toShow) {
        //GENERAL
        case 'observation':
            label = 'Observaciones';
            placeholder = 'Ingrese observaciones si las tiene';
            checked = (input) => true;
            break;

        //TALLERES
        case 'workshopName':
            label = 'Nombre del taller';
            placeholder = 'Ingrese el nombre del/la tallerista';
            break;
        case 'article':
            label = 'Número de artículo';
            placeholder = 'Ingrese el código único del artículo';
            break;
        case 'quantityArticle':
            label = 'Cantidad asignada';
            placeholder = 'Ingrese la cantidad de artículos';
            checked = (input) => !isNaN(input) && Number(input) > 0 && Number(input) === Math.round(Number(input));
            break;
        case 'money':
            label = 'Monto';
            placeholder = 'Ingrese el monto a pagar';
            checked = (input) => !isNaN(input) && Number(input) > 0;
            break;
        case 'price':
            label = 'Precio por unidad';
            placeholder = 'Ingrese el precio por unidad';
            checked = (input) => !isNaN(input) && Number(input) > 0;
            break;
        case 'description':
            label = 'Descripción';
            placeholder = 'Ingrese una breve descripción del artículo';
            break;
        case 'regName':
            label = 'Nombre del taller';
            placeholder = 'Ingrese el nombre del/la tallerista';
            checked = async (input) => {
                if (input === '')
                    return false
                let response = await Axios.get('http://localhost:3307/getNames');
                response = !response.data.find(e => e.name.toLowerCase() === input.toLowerCase());
                return response;
            };
            break;
        case 'regArticle':
            label = 'Número de artículo';
            placeholder = 'Ingrese el código del artículo';
            checked = async (input) => {
                if (input === '' || isNaN(input))
                    return false;
                let response = await Axios.post('http://localhost:3307/getDescriptionWhere', { id: input });
                return response.data.length === 0;
            };
            break;
        case 'weight':
            label = 'Peso de la tarea';
            placeholder = 'Ingrese el peso entregado';
            checked = (input) => !isNaN(input) && Number(input) > 0;
            break;
        case 'deadline':
            label = 'Fecha esperada';
            placeholder = 'Ingrese la fecha esperada (DD/MM/AAAA)';
            checked = (input) => {
                let error = false;
                let aux = input.split('/');
                aux.map((e) => {
                    if (isNaN(e))
                        error = true;
                })
                return ((input.length === 10 && input[5] === '/') || input.length === 5) && input[2] === '/' && !error;
            }
            break;
        case 'calification':
            label = 'Calificación';
            placeholder = 'Ingrese la calificación del 1 al 10';
            checked = (input) => !isNaN(input) && Number(input) > 0 && Number(input) <= 10 && Number(input) === Math.round(Number(input));
            break;
        case 'packages':
            label = 'Bultos';
            placeholder = 'Ingrese la cantidad de bultos';
            checked = (input) => !isNaN(input) && Number(input) > 0 && Number(input) === Math.round(Number(input));
            break;
        case 'fabrics':
            label = 'Telas';
            placeholder = 'Ingrese las telas';
            checked = (input) => true;
            break;
        case 'responsible':
            label = 'Responsables';
            placeholder = 'Ingrese las personas responsables';
            break;
        case 'generalFeatures':
            label = 'Características generales';
            placeholder = 'Ingrese las características generales';
            checked = (input) => true;
            break;
        case 'colors':
            label = 'Colores';
            placeholder = 'Ingrese los colores';
            break;
        case 'threads':
            label = 'Hilos';
            placeholder = 'Ingrese la cantidad de hilos';
            break;
        case 'customerName':
            label = 'Nombre del cliente';
            placeholder = 'Ingrese el nombre del/la cliente';
            break;
        default:
            console.error("ERROR, HA INGRESADO EL toShow " + toShow + " EN EL COMPONENTE TEXTINPUT");
    }

    label = (auxLabel) ? auxLabel : label;
    placeholder += '…';
    return (
        (toShow === 'workshopName') ? <NameRequest handleEnter={handleEnter} placeholder={placeholder} onChange={onChange} /> :
            ((toShow === 'article') ? <ArticleRequest handleEnter={handleEnter} placeholder={placeholder} onChange={onChange} /> :
                <Form.Group>
                    <Form.Label>{label}</Form.Label>
                    <InputGroup>
                        {(toShow === 'money' || toShow === 'price') ? <InputGroup.Text>$</InputGroup.Text> : <></>}
                        <FormControl type="text" placeholder={placeholder} value={value} onKeyDown={handleEnter} onChange={(e) => {
                            let res;
                            if (checked[Symbol.toStringTag] !== 'AsyncFunction') {
                                res = checked(e.target.value);
                                setError(!res);
                                onChange(e, error);
                            }
                            else
                                checked(e.target.value).then(result => {
                                    setError(!result);
                                    onChange(e, error);
                                });
                        }} />
                        {(toShow === 'weight') ? <InputGroup.Text>kg</InputGroup.Text> : <></>}
                    </InputGroup>
                    {error ? <em>El valor ingresado no es válido</em> : <></>}
                </Form.Group>)
    );
}
Request.propTypes = {
    onChange: PropTypes.func.isRequired, //Función a ejecutar cuando se modifica el input
    toShow: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    handleEnter: PropTypes.func
}
export class RawResourceRequest extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        handleEnter: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: "",

            
            showModal: false,
            suggestions: [],
            inicialized: false

        };
    }

    componentDidMount = () => {//TODO: MICHAT Obtener una lista con el formato id: nombre (descripción) de todas las materias primas
        if(this.inicialized)
            return
        // Axios.get('http://localhost:3307/getArticle').then((response) => {
        //     setArticle(response.data.map(article => article.id + ': ' + article.description));
        // })
        this.setState({suggestions: ['15: Cierre (Marca SanCor)', '4: Pasador (Amarillo)', '6: Cable (De cobre)']});//Porivisional para probar las funcionalidades
        this.setState({inicialized: true});
    }

    updateList = () => {//TODO: MICHAT Obtener una lista con el formato id: nombre (descripción) de todas las materias primas
        if(this.inicialized)
            return
        // Axios.get('http://localhost:3307/getArticle').then((response) => {
        //     setArticle(response.data.map(article => article.id + ': ' + article.description));
        // })
        this.setState({suggestions: ['15: Cierre (Marca SanCor)', '4: Pasador (Amarillo)', '6: Cable (De cobre)']});//Porivisional para probar las funcionalidades
        this.setState({inicialized: true});
    }

    clearText = () => {
        this.setState({activeSuggestion: 0, filteredSuggestions: [], showSuggestions: false,
            userInput: "", showModal: false})
    }

    onChange = e => {
        const { suggestions } = this.state;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput
        });
        this.props.onChange(userInput, suggestions.indexOf(userInput) < 0);
    };

    onClick = e => {
        let userInput = e.currentTarget.innerText;
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput
        });
        this.props.onChange(userInput, this.state.suggestions.indexOf(userInput) < 0);
    };

    myOnKeyDown = e => {
        const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state;
        // User pressed the enter key
        if (e.key.toLowerCase() === 'enter') {
            if (showSuggestions){
                this.setState({
                    activeSuggestion: 0,
                    showSuggestions: false,
                    userInput: filteredSuggestions[activeSuggestion]
                });
                this.props.onChange(filteredSuggestions[activeSuggestion],
                    this.state.suggestions.indexOf(userInput) < 0);
            }
            else
                this.props.handleEnter(e);
        }
        // User pressed the up arrow
        if (e.key.toLowerCase() === 'arrowup')
            if (activeSuggestion !== 0)
                this.setState({ activeSuggestion: activeSuggestion - 1 });
        // User pressed the down arrow
        if (e.key.toLowerCase() === 'arrowdown')
            if (activeSuggestion !== filteredSuggestions.length - 1)
                this.setState({ activeSuggestion: activeSuggestion + 1 });
    };

    render() {
        const {
            onChange,
            onClick,
            myOnKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion)
                                className = "suggestion-active";

                            return (
                                <li className={className} key={suggestion} onClick={onClick} onMouseEnter={e =>
                                    this.setState({ activeSuggestion: index })}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No se ha encontrado ninguna opción</em>
                        <Button onClick={() => {
                            this.setState({
                                showModal: true
                            })
                        }}>Ingresar</Button>
                    </div>
                );
            }
        }

        if (!this.state.showModal)
            return (
                <Fragment>
                    <FormControl
                        type="text"
                        onChange={onChange}
                        onKeyDown={myOnKeyDown}
                        value={userInput}
                    />
                    {suggestionsListComponent}
                </Fragment>
            );
        else
            return (<ModalWork handleClose={() => {
                this.setState({ showModal: false });
                this.updateList();
            }}
                show={this.state.showModal} registration={true} />);
    }
}

const ArticleRequest = ({ placeholder, onChange, handleEnter }) => {
    const [articles, setArticles] = useState([]);
    const [inicialized, setInicialized] = useState(false);

    const getList = () => {
        if(inicialized)
            return;
        Axios.get('http://localhost:3307/getArticles').then((response) => {
            setArticles(response.data.map(article => article.id + ': ' + article.description));
        });
        setInicialized(false);
    }

    useEffect(getList);

    const myOnChange = (event, error) => {
        if (event.indexOf(':') > 0)
            event = event.substr(0, event.indexOf(':'));
        onChange(event, error);
    }

    return (
        <Autocomplete suggestions={articles} onChange={myOnChange} handleEnter={handleEnter}
            placeholder={placeholder} updateList={getList} />
    );
}
ArticleRequest.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    handleEnter: PropTypes.func
}

const NameRequest = ({ label, placeholder, onChange, handleEnter }) => {

    const [list, setList] = useState([]);
    const [inicialized, setInicialized] = useState(false);
    
    const getList = () => {
        if(inicialized)
        return;
        Axios.get('http://localhost:3307/getNames').then((response) => {
            setList(response.data);
        });
        setInicialized(false);
    }
    
    useEffect(getList);
     
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Autocomplete suggestions={list.map((element) => { return element.name })} handleEnter={handleEnter}
                onChange={onChange} placeholder={placeholder} updateList={getList} />
        </Form.Group>
    );
}
NameRequest.propTypes = ArticleRequest.propTypes;

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array).isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        updateList: PropTypes.func.isRequired,
        handleEnter: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: "",
            showModal: false
        };
    }

    clearText = () => {
        this.setState({activeSuggestion: 0, filteredSuggestions: [], showSuggestions: false,
            userInput: "", showModal: false})
    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput
        });
        this.props.onChange(userInput, suggestions.indexOf(userInput) < 0);
    };

    onClick = e => {
        let userInput = e.currentTarget.innerText;
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput
        });
        this.props.onChange(userInput, this.props.suggestions.indexOf(userInput) < 0);
    };

    myOnKeyDown = e => {
        const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state;
        // User pressed the enter key
        if (e.key.toLowerCase() === 'enter') {
            if (showSuggestions){
                this.setState({
                    activeSuggestion: 0,
                    showSuggestions: false,
                    userInput: filteredSuggestions[activeSuggestion]
                });
                this.props.onChange(filteredSuggestions[activeSuggestion],
                    this.props.suggestions.indexOf(userInput) < 0);
            }
            else
                this.props.handleEnter(e);
        }
        // User pressed the up arrow
        if (e.key.toLowerCase() === 'arrowup')
            if (activeSuggestion !== 0)
                this.setState({ activeSuggestion: activeSuggestion - 1 });
        // User pressed the down arrow
        if (e.key.toLowerCase() === 'arrowdown')
            if (activeSuggestion !== filteredSuggestions.length - 1)
                this.setState({ activeSuggestion: activeSuggestion + 1 });
    };

    render() {
        const {
            onChange,
            onClick,
            myOnKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion)
                                className = "suggestion-active";

                            return (
                                <li className={className} key={suggestion} onClick={onClick} onMouseEnter={e =>
                                    this.setState({ activeSuggestion: index })}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No se ha encontrado ninguna opción</em>
                        <Button onClick={() => {
                            this.setState({
                                showModal: true
                            })
                        }}>Ingresar</Button>
                    </div>
                );
            }
        }

        if (!this.state.showModal)
            return (
                <Fragment>
                    <FormControl
                        placeholder={this.props.placeholder}
                        type="text"
                        onChange={onChange}
                        onKeyDown={myOnKeyDown}
                        value={userInput}
                    />
                    {suggestionsListComponent}
                </Fragment>
            );
        else
            return (<ModalWork handleClose={() => {
                this.setState({ showModal: false });
                this.props.updateList();
            }}
                show={this.state.showModal} registration={true} />);
    }
}

export const TaskRequest = ({ setSelectedTask, tasks, title, setTitle, handleEnter }) => {
    
    const [shown, setShown] = useState(false);
    
    if (!tasks)
        return null;

    return (
        <DropdownButton title={title} onToggle={setShown} onSelect={(e) => {
            setTitle('T' + tasks[e].id + ': ' + tasks[e].article_id + ' (' + tasks[e].article_description + ') x' + tasks[e].quantity + (tasks[e].price ? ' a $' + tasks[e].price : ''));
            setSelectedTask(tasks[e]);
        }} >
            {tasks.map((task, index) =>
                <Dropdown.Item key={task.id} eventKey={index}>
                    {task.id + ': ' + task.article_id + ' (' + task.article_description + ') x' + task.quantity + (task.price ? ' a $' + task.price : '')}
                </Dropdown.Item>)
            }
        </DropdownButton>
    );
}

// const ArticleRequest = ({ label, placeholder, onChange }) => {

//     const [id, setId] = useState('');
//     const [description, setDescription] = useState('');
//     const [error, setError] = useState(false);
//     const [show, setShow] = useState(false);

//     const getDescription = (userInput) => {
//         Axios.post('http://localhost:3307/getDescriptionWhere', { id: userInput }).then((response) => {
//             setError(response.data.length === 0);
//             if (response.data.length !== 0)
//                 setDescription(response.data[0].description);
//             else
//                 setDescription('');
//         });
//     }

//     const autoComplete = () => {
//         {/* TODO: Que muestre un autocomplete (como el de talleres) que recupere el art. por su desc.
//             Puede ser literalmente el mismo, que cada una de las opciones sea con el formato: "art: desc"
//             De esta forma, al buscar la desc, ya dice el artículo. Lo ideal searía que luego lo ingrese auto
//             máticamente*/}
//         return;
//     };

//     const popover = (
//         <Popover>
//             <Popover.Header as="h3">Descripción de artículo</Popover.Header>
//             <Popover.Body>
//                 {error ?
//                     <>
//                         <em>No existe este código de artículo</em>
//                         <Button onClick={() => {
//                             setId('');
//                             setShow(true);
//                         }}>Registrarlo</Button>
//                         <p>Buscarlo</p>
//                         {autoComplete()}
//                     </>
//                     : description}
//             </Popover.Body>
//         </Popover>
//     );

//     if (!show)
//         return (
//             <Form.Group className="mb-3">
//                 <Form.Label>{label}</Form.Label>
//                 <InputGroup>
//                     <OverlayTrigger show={id !== ''} placement="right" overlay={popover}>
//                         <FormControl type="text" placeholder={placeholder} onChange={(e) => {
//                             onChange(e);
//                             setId(e.target.value)
//                             getDescription(e.target.value);
//                         }} />
//                     </OverlayTrigger>
//                 </InputGroup>
//             </Form.Group>);
//     return (<ModalArt handleClose={() => setShow(false)} show={show} registration={true} />);
// }