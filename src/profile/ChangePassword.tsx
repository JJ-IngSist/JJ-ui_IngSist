import Layout from "../layout/Layout";
import React, {useEffect, useReducer} from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import {post, userUrl} from "../utils/http";
import {useHistory} from "react-router-dom";

type State = {
    oldPassword: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

type ChangePassword = {
    oldPassword: string
    password: string
}

const initialState:State = {
    oldPassword: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action = { type: 'setOldPassword', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'changeFailed', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setOldPassword':
            return {
                ...state,
                oldPassword: action.payload
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
        case 'changeFailed':
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

const ChangePassword = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.oldPassword.trim() && state.password.trim()) {
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
    }, [state.oldPassword, state.password]);

    let history = useHistory();

    const handlePasswordUpdate = () => {
        const password: ChangePassword = {oldPassword: state.oldPassword, password: state.password};
        post(userUrl + 'changePassword', password)
            .then(() => {
                history.push('/profile')
            })
            .catch()
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handlePasswordUpdate();
        }
    };

    const handleOldPasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setOldPassword',
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

    return(
        <div className="App">
            <Layout child={<ChangePasswordForm handleOldPasswordChange={handleOldPasswordChange} handlePasswordChange={handlePasswordChange} handleUpdatePassword={handlePasswordUpdate} handleKeyPress={handleKeyPress} state={state}/>}/>
        </div>
    )
}

export default ChangePassword;
