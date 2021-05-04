import React, {useEffect} from 'react';
import {get, postUrl} from '../utils/http';
import Layout from '../layout/Layout';
import Feed from '../layout/feed';
import {Post} from '../utils/models';

const MainPage = () => {

    const [posts, setPosts] = React.useState<Post[]>([]);

    const loadPosts = () => {
        get(postUrl + "posts").then(
            res => {
                console.log(res);
                setPosts(res)
                console.log(posts);
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
            <Layout child={<Feed posts={posts} setPosts={setPosts}/>}/>
        </div>
    )
}

export default MainPage;