import React, {useEffect, useState} from "react";
import {User} from "../utils/models";
import {get, userUrl} from "../utils/http";
import Layout from "../layout/Layout";
import UserFollowForm from "./UserFollowForm";

const UserFollowers = (id: string) => {

    const [followers, setFollowers] = useState<User[]>([]);

    const loadUser = () => {
        // @ts-ignore
        get(userUrl + 'user/' + id.match.params.id + '/followers')
            .then(res => {
                setFollowers(res)
            })
            .catch()
    }

    useEffect(() => {
        loadUser()
    }, [])

    if (followers.length > 0) {
        return (
            <div className="App">
                <Layout child={<UserFollowForm users={followers}/>}/>
            </div>
        )
    } else {
        return (
            <div className="App">
            </div>
        )
    }
}

export default UserFollowers