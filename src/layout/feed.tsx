import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Post, User} from "../utils/models";
import InputPost from "../post/InputPost";
import {post, postUrl} from '../utils/http';
import PostView from "../post/PostView";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

type Props = {
    posts: Post[]
    firsts: Post[]
    setPosts: (posts: Post[]) => void
    user: User
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '25ch',
            maxWidth: '26ch',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px',
            margin: '8px'
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
  const history = useHistory();

  const addPost = (thePost: Post) => {
    post(postUrl + 'post', {text: thePost.text, user: thePost.user, thread: thePost.threadId })
        .then(res =>
            props.setPosts([...props.posts, res]))
        .catch(err => console.log(err.message))
  }

  const goToLogin = () => {
      history.push('/login')
  }

  return (
      <div>
        {props.user.id === +localStorage.getItem('id') && +localStorage.getItem('id') !== 0 ? <InputPost addPost={addPost}/> : <></>}
        {+localStorage.getItem('id') === 0 ? <Button onClick={goToLogin}> Login </Button> : <></>}
          <List className={classes.root}>
            {props.posts !== [] ? props.posts.map((row, index) => (
              <PostView key={index} post={row}/>
            )) : <p> No posts yet! </p>}
          </List>
      </div>
  );
}

export default Feed;
