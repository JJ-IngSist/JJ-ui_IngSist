import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from "react";
import MainPage from "../mainpage/MainPage";
import Login from "../login/Login";
import Register from "../register/Register";
import ShowThread from "../thread/Thread";
import ProfileView from "../profile/ProfileView";

const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/login"} component={Login}/>
                <Route path={"/register"} component={Register}/>
                <Route path={"/profile"} component={ProfileView}/>
                <Route path={"/thread/:id"} component={ShowThread}/>
                <Route path={"/"} component={MainPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;