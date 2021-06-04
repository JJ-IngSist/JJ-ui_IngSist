import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from "react";
import MainPage from "../mainpage/MainPage";
import Login from "../login/Login";
import Register from "../register/Register";
import ShowThread from "../thread/Thread";
import ProfileView from "../profile/ProfileView";
import AuthRoute from "./AuthRoute";
import ChangePassword from "../profile/ChangePassword";
import UserFollowing from "../follow/UserFollowing";
import UserFollowers from "../follow/UserFollowers";
import FeedView from "../mainpage/FeedView";
import ChatView from "../chat/ChatView";

const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/login"} component={Login}/>
                <Route path={"/register"} component={Register}/>
                <AuthRoute path={"/profile/:id"} component={ProfileView}/>
                <AuthRoute path={"/changePassword"} component={ChangePassword}/>
                <Route path={"/user/:id/following"} component={UserFollowing}/>
                <Route path={"/user/:id/followers"} component={UserFollowers}/>
                <Route path={"/thread/:id"} component={ShowThread}/>
                <AuthRoute path={"/dms"} component={ChatView}/>
                <Route path={"/feed"} component={FeedView}/>
                <AuthRoute path={"/"} component={MainPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
