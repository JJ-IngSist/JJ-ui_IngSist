import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Post} from "../utils/models";
import InputPost from "../post/InputPost";
import {post, postUrl} from '../utils/http';
import PostView from "../post/PostView";

type Props = {
    posts: Post[]
    setPosts: (posts: Post[]) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '26ch',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px'
        },
        inline: {
            display: 'inline',
            width: '90%',
        },
        flex: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        typo: {
            wordWrap: "break-word",
            display: 'inline',
            width: '90%',
        }
    }),
);

const Feed = (props: Props) => {
    const classes = useStyles();

    const addPost = (thePost: Post) => {
        post(postUrl + 'post', {text: thePost.text, user: thePost.userId, thread: thePost.threadId })
            .then(res =>
                props.setPosts([...props.posts, res]))
            .catch(err => console.log(err.message))
    }

    return (
        <div>
            <InputPost addPost={addPost}/>
            <List className={classes.root}>
                {props.posts.map((row, index) => (
                    <PostView post={row}/>
                ))}
            </List>
        </div>
    );
}

export default Feed;