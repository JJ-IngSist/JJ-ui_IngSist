import Layout from "../layout/Layout";
import ProfileContent from "./ProfileContent";
import React, {useEffect, useState} from "react";
import {get, userUrl} from "../utils/http";
import {User} from "../utils/models";

const ProfileView = (id: string) => {

    const [user, setUser] = useState<User>({id: 0, name:'', username:'', email:'', password:''});

    const loadUser = () => {
        // @ts-ignore
        get(userUrl + "user/" + id.match.params.id).then(
            res => {
                setUser(res)
            }
        ).catch()
    }

    useEffect(() => {
        loadUser()
    }, [])

    if (user.id !== 0) {
        return (
            <div className="App">
                <Layout child={<ProfileContent user={user} logged={+localStorage.getItem('id')}/>}/>
            </div>
        )
    } else {
        return (
            <div className="App">
            </div>
        )
    }
}

export default ProfileView;