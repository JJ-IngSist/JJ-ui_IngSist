import Layout from "../layout/Layout";
import ProfileContent from "./ProfileContent";
import React from "react";

const ProfileView = () => {

    return (
        <div className="App">
            <Layout child={<ProfileContent/>}/>
        </div>
    )
}

export default ProfileView;