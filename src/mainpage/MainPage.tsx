import React, {useEffect} from 'react';
import {get, postUrl} from '../utils/http';
import Layout from '../layout/Layout';
import Feed from '../layout/feed';
import {Post, User} from '../utils/models';

const MainPage = () => {

    const [posts, setPosts] = React.useState<Post[]>([]);
    const [firsts, setFirsts] = React.useState<Post[]>([]);
    const user: User = {id: +localStorage.getItem('id'), name: '', username: '', email: '', description: '', password: ''}

    const loadPosts = () => {
        get(postUrl + "posts/most-liked", {noAuth: true}).then(
            res => {
                setPosts(res.map((p: { madeByFollowed: any; }) => p.madeByFollowed))
                setFirsts(res.map((p: { firstOfThread: any; }) => p.firstOfThread))
            }
        ).catch( err => {
            console.log(err);
        })
    }

    useEffect(() => {
        loadPosts()
    }, [])

    return (
        <div className="App">
            <Layout child={<Feed posts={posts} setPosts={setPosts} firsts={firsts} user={user}/>}/>
        </div>
    )
}

export default MainPage;