import React, {useEffect} from "react";
import {Post} from "../utils/models";
import {get, postUrl} from "../utils/http";
import Layout from "../layout/Layout";
import ThreadView from "../layout/thread";

const ShowThread = (id: string) => {

    const [first, setFirst] = React.useState<Post>({id: 0, username: '', name: '', email: '', likes: 0, user: 0, liked: false, threadId: 0, date: null, text: ''});
    const [posts, setPosts] = React.useState<Post[]>([]);

    const loadPosts = () => {
        // @ts-ignore
        get(postUrl + "thread/" + id.match.params.id).then(
            res => {
                setFirst(res.firstPost)
                setPosts(res.posts)
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
            <Layout child={<ThreadView first={first} posts={posts} setPosts={setPosts}/>}/>
        </div>
    )
}

export default ShowThread;