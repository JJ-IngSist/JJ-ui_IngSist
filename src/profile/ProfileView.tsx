import React from 'react';
import Layout from '../layout/Layout';
import ProfileContent from "./ProfileContent";

const ProfileView = () => {

    return (
        <div className="App">
            <Layout child={<ProfileContent/>}/>
        </div>
    )
}

export default ProfileView;