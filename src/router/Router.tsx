import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from "react";
import MainPage from "../mainpage/MainPage";
import Login from "../login/Login";
import Register from "../register/Register";

const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/login"} component={Login}/>
                <Route path={"/register"} component={Register}/>
                <Route path={"/"} component={MainPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;