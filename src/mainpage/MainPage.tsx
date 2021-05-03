import React, {useEffect} from "react";
import {get, postUrl} from "../utils/http";
import SideDrawer from "../layout/sideDrawer";
import Feed from "../layout/feed";
import {Post} from "../utils/models";

const MainPage = () => {

    const [posts, setPosts] = React.useState<Post[]>([]);

    useEffect(() => {
        loadPosts()
    }, [])

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

    return (
        <div className="App">
            <SideDrawer/>
            <header className="App-header">
                <Feed posts={posts}/>
            </header>
        </div>
    )
}

export default MainPage;