import React, {useEffect, useReducer} from "react";
import {post, userUrl} from "../utils/http";
import {User} from "../utils/models";
import { useHistory } from "react-router-dom";
import RegisterForm from "../auth/register";

export type RegisterState = {
    name: { value:string, error:boolean }
    lastname:  { value:string, error:boolean }
    username: { value:string, error:boolean }
    email:  { value:string, error:boolean }
    password:  { value:string, error:boolean }
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

const initialState:RegisterState = {
    name: {value: '', error: false},
    lastname: {value: '', error: false},
    username: {value: '', error: false},
    email: {value: '', error: false},
    password: {value: '', error: false},
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action = { type: 'setName', payload: { value:string, error:boolean } }
    | { type: 'setEmail', payload: { value:string, error:boolean } }
    | { type: 'setUsername', payload: { value:string, error:boolean } }
    | { type: 'setPassword', payload: { value:string, error:boolean } }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'registerFailed', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: RegisterState, action: Action): RegisterState => {
    switch (action.type) {
        case 'setName':
            return {
                ...state,
                name: action.payload
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
        const user: User = {name: state.name.value,
            email: state.email.value,
            username: state.username.value,
            password: state.password.value};
        post(userUrl + "register", user).then(
            () => {
                history.push('/')
            }
        ).catch(() => {
            //falta dependiendo los errores del back que falle cada field en especifico.
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
                payload: { value: event.target.value, error: event.target.value === ''}
            });
        };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setUsername',
                payload: { value: event.target.value, error: event.target.value === ''}
            });
        };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
        const regex = /\S+@\S+\.\S+/;
            dispatch({
                type: 'setEmail',
                payload: { value: event.target.value, error: !regex.test(event.target.value)}
            });
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
        const regex = /(?=.{8,})/;
            dispatch({
                type: 'setPassword',
                payload: { value: event.target.value, error: !regex.test(event.target.value)}
            });
        };

    return (
        <RegisterForm handleUsernameChange={handleUsernameChange}
                      handlePasswordChange={handlePasswordChange}
                      handleNameChange={handleNameChange}
                      handleEmailChange={handleEmailChange}
                      handleKeyPress={handleKeyPress}
                      handleRegister={handleRegister}
                      state={state}/>
    );
};

export default Register;