import Layout from "../layout/Layout";
import React, {useEffect, useState} from "react";
import {User} from "../utils/models";
import {get, userUrl} from "../utils/http";
import UserFollowForm from "./UserFollowForm";

const UserFollowing = (id: string) => {

    const [following, setFollowing] = useState<User[]>([]);

    const loadUser = () => {
        // @ts-ignore
        get(userUrl + 'user/' + id.match.params.id + '/following')
            .then(res => {
                setFollowing(res)
            })
            .catch()
    }

    useEffect(() => {
        loadUser()
    }, [])

    if (following.length > 0) {
        return (
            <div className="App">
                <Layout child={<UserFollowForm users={following}/>}/>
            </div>
        )
    } else {
        return (
            <div className="App">
            </div>
        )
    }
}

export default UserFollowing