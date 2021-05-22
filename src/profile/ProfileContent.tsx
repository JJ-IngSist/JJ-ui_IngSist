import React, {useEffect, useState} from 'react';
import {Post, User} from "../utils/models";
import {Button} from "@material-ui/core";
import './ProfileContent.css'
import {get, post, postUrl, userUrl} from "../utils/http";
import Feed from "../layout/feed";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import EditProfileModal from "./EditProfileModal";

type Props = {
    user: User,
    logged: number
}

const ProfileContent = (props: Props) => {

    const [user, setUser] = useState<User>({id: 0, name:'', username:'', email:'', password: ''});
    const [posts, setPosts] = useState<Post[]>([]);
    const [followers, setFollowers] = useState<number>(0);
    const [following, setFollowing] = useState<number>(0);
    const [follow, setFollow] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        setUser(props.user)
        get(userUrl + 'user/' + props.user.id + '/amount-followers')
            .then(res => {
                setFollowers(res)
            })
            .catch()
        get(userUrl + 'user/' + props.user.id + '/amount-following')
            .then(res => {
                setFollowing(res)
            })
            .catch()
        debugger
        get(userUrl + 'user/' + props.user.id + '/is-following')
            .then(res => {
                setFollow(res)
            })
            .catch()
        get(postUrl + 'user/' + props.user.id + '/posts')
            .then(res => {
                setPosts(res)
            })
            .catch()
    }, [])

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleFollow = () => {
        if (follow) {
            post(userUrl + 'user/' + props.user.id + '/unfollow', {})
                .catch()
        } else {
            post(userUrl + 'user/' + props.user.id + '/follow', {})
                .catch()
        }
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
                {user.id === props.logged ? <IconButton onClick={handleOpenModal}><EditIcon/></IconButton> : <></> }
                {user.id !== 0 && user.id === props.logged ? <EditProfileModal open={openModal} setOpen={setOpenModal} userInfo={user} setUserInfo={setUser}/>
                    : <></>
                }
            </div>
            <div className={'flex-container'}>
                <div className={'side-container'}>
                    {follow ?
                        <div className={'picture-container'}>
                        {user.id !== props.logged ?
                            <Button variant="contained"
                                    color="secondary"
                                    className={'follow-button'}
                                    onClick={handleFollow}>Unfollow {user.name}</Button>
                            : <></>}

                    </div> :
                        <div className={'picture-container'}>
                        {user.id !== props.logged ?
                            <Button variant="contained"
                                    color="secondary"
                                    className={'follow-button'}
                                    onClick={handleFollow}>Follow {user.name}</Button>
                            : <></>}

                    </div>}

                    <div className={'profile-info'}>
                        <h3 className={'subtitle'}>About</h3>
                        <p className={'about-details'}>{user.description}</p>
                        <div className={'info-table'}>
                            <p>Followers</p>
                            <p>{followers}</p>
                            {/*<IconButton><ArrowForwardIosIcon/></IconButton>*/}
                        </div>
                        <div className={'info-table'}>
                            <p>Following</p>
                            <p>{following}</p>
                            {/*<IconButton><ArrowForwardIosIcon/></IconButton>*/}
                        </div>
                        <div className={'info-table'}>
                            <p>Posts</p>
                            <p>{posts.length}</p>
                        </div>
                    </div>
                </div>
                <div className={'post-list'}>
                    <Feed posts={posts} firsts={posts} setPosts={setPosts} user={user} />
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;