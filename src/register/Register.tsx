import React, {useEffect, useReducer} from "react";
import {post, userUrl} from "../utils/http";
import {User} from "../utils/models";
import { useHistory } from "react-router-dom";
import RegisterForm from "../layout/register";

type State = {
    name: string
    lastname:  string
    username: string
    email:  string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

const initialState:State = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action = { type: 'setName', payload: string }
    | { type: 'setLastname', payload: string }
    | { type: 'setEmail', payload: string }
    | { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'registerFailed', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setName':
            return {
                ...state,
                name: action.payload
            };
        case 'setLastname':
            return {
                ...state,
                lastname: action.payload
            };
        case 'setEmail':
            return {
                ...state,
                email: action.payload
            };
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'registerFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };

    }
}

const Register = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.username && state.password && state.name && state.lastname && state.email) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }
    }, [state.name, state.lastname, state.username, state.email, state.password]);

    let history = useHistory();

    const handleRegister = () => {
        const user: User = {name: state.name, lastname: state.lastname, email: state.email, username: state.username, password: state.password};
        post(userUrl + "register", user).then(
            () => {
                history.push('/')
            }
        ).catch(() => {
            dispatch({
                type: 'registerFailed',
                payload: 'Incorrect registration'
            });
        })
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleRegister();
        }
    };

    const handleNameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setName',
                payload: event.target.value
            });
        };

    const handleLastnameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setLastname',
                payload: event.target.value
            });
        };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setUsername',
                payload: event.target.value
            });
        };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setEmail',
                payload: event.target.value
            });
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        };

    return (
        <RegisterForm handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleNameChange={handleNameChange} handleLastnameChange={handleLastnameChange} handleEmailChange={handleEmailChange} handleKeyPress={handleKeyPress} handleRegister={handleRegister} state={state}/>
    );
};

export default Register;