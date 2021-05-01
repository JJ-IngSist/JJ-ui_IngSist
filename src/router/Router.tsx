import {BrowserRouter, Route} from 'react-router-dom';
import React from "react";
import MainPage from "../mainpage/MainPage";

const Router = () => {

    return (
        <BrowserRouter>
            <Route path={"/"} component={MainPage}/>
        </BrowserRouter>
    )
}

export default Router;