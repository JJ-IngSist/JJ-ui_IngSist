import React, {useEffect, useState} from 'react';
import {Post, User} from "../utils/models";
import {Button} from "@material-ui/core";
import './ProfileContent.css'
import {get, postUrl, userUrl} from "../utils/http";
import Feed from "../layout/feed";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import EditProfileModal from "./EditProfileModal";

type Props = {
    id: number
}

const ProfileContent = (props: Props) => {

    const [user, setUser] = useState<User>({id: 0, name:'', username:'', email:'', password: ''});
    const [posts, setPosts] = useState<Post[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        get(userUrl + 'user/' + props.id)
            .then(res => setUser(res))
            .catch()
        get(postUrl + 'user/' + props.id + '/posts')
            .then(res => {
                setPosts(res)
                console.log(res);
            })
            .catch()
    }, [])

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    return (
        <div className="content">
            <div className={'banner'}>
                <div className={'flex-container'}>
                    <p className={'mail-style'}>{user.email  + '\t'}</p>
                    <p className={'mail-style'}> - </p>
                    <p className={'mail-style'}>{'\t' + user.username}</p>
                </div>

                <p className={'name-style'}>{user.name}</p>
                <IconButton onClick={handleOpenModal}><EditIcon/></IconButton>
                {user.id !== 0? <EditProfileModal open={openModal} setOpen={setOpenModal} userInfo={user} setUserInfo={setUser}/>
                    : <></>
                }
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
                            <p>{posts.length}</p>
                        </div>
                    </div>
                </div>
                <div className={'post-list'}>
                    <Feed posts={posts} firsts={posts} setPosts={setPosts} />
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;