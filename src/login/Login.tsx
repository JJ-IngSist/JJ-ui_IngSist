import React, { useReducer, useEffect } from 'react';
import LoginForm from "../auth/login";
import {post, userUrl} from "../utils/http";
import {useHistory} from "react-router-dom";

export type State = {
    username: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

type User = {
    username: string,
    password: string
}

const initialState:State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
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
        case 'loginFailed':
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

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
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
    }, [state.username, state.password]);

    let history = useHistory();

    const handleLogin = () => {
        const user: User = {username: state.username, password: state.password};
        post(userUrl + "login", user, {noAuth: true}).then(
            (response) => {
                document.cookie=`token=${response.token.token};`
                localStorage.setItem('id', response.id)
                history.push('/')
            }
        ).catch(error => {
            console.log(error)
            dispatch({
                        type: 'loginFailed',
                        payload: 'Incorrect username or password'
                    });
        })
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setUsername',
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
        <LoginForm handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleKeyPress={handleKeyPress} handleLogin={handleLogin} state={state}/>
    );
};

export default Login;
