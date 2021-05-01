import React, {useEffect} from "react";
import logo from "../logo.svg";
import {get, postUrl} from "../utils/http";

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
                setPosts(res)
            }
        ).catch()
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
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