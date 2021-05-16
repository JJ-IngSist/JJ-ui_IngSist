import React, {useState} from 'react';
import {User} from "../utils/models";
import {Button} from "@material-ui/core";
import './ProfileContent.css'

const ProfileContent = () => {

    const [user, setUser] = useState<User>({name:'Rocio', username:'rochicapa', lastname:'Ferre', email:'rocio@ferre.com'});

    return (
        <div className="content">
            <div className={'banner'}>
                <p className={'mail-style'}>{user.email}</p>
                <p className={'name-style'}>{user.name} {user.lastname}</p>
            </div>
            <div className={'flex-container'}>
                <div className={'side-container'}>
                    <div className={'picture-container'}>
                        <Button variant="contained"
                                color="secondary"
                                className={'follow-button'}>Follow {user.name}</Button>
                    </div>
                    <div className={'profile-info'}>
                        <h3 className={'subtitle'}>About</h3>
                        <p className={'about-details'}>Me llamo rocio y soy alta capa los mejores posts del mundo estan aca. Seguime para ver el mejor contenido.</p>
                        <div className={'info-table'}>
                            <p>Followers</p>
                            <p>100</p>
                        </div>
                        <div className={'info-table'}>
                            <p>Following</p>
                            <p>50</p>
                        </div>
                        <div className={'info-table'}>
                            <p>Posts</p>
                            <p>4</p>
                        </div>
                    </div>
                </div>
                <div className={'post-list'}>
                    <p>posts...</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;