import React, {useEffect} from "react";
import {get, postUrl} from "../utils/http";
import Header from "../layout/header";

export type Post = {
    id: number,
    text: string,
    userId: number,
}

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
            <Header/>
            <header className="App-header">
                <p>
                    This is every Post there is!
                </p>
                {posts.length > 0 ? posts.map((row, index1) => (
                    <div key={index1} className={"post-list"}>
                        <span>{row.text}</span>
                    </div>
                )) : (
                   <span>There are no posts yet! :(</span>
                )}
            </header>
        </div>
    )
}

export default MainPage;