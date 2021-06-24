import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Post} from "../utils/models";
import PostView from "../post/PostView";
import InputPost from "../post/InputPost";
import {del, post, postUrl} from "../utils/http";

type Props = {
  posts: Post[],
  firsts: Post[],
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

const Following = (props: Props) => {
  const classes = useStyles();
  console.log(props.posts)

  const addPost = (thePost: Post) => {
    post(postUrl + 'post', {text: thePost.text, user: thePost.user, thread: thePost.threadId })
      .then(res =>
        props.setPosts([...props.posts, res]))
      .catch(err => console.log(err.message))
  }

  const handleDelete = (post: Post) => {
    del(postUrl + 'post/' + post.id)
      .then(() => {
        props.setPosts(props.posts.filter(p => p.id !== post.id))
      }).catch()
  }

  return (
    <div>
      {+localStorage.getItem('id') !== 0 ? <InputPost addPost={addPost}/> : <></>}
      <List className={classes.root}>
        {props.posts.length !== 0 ? props.posts.map((row, index) => (
          <PostView key={index} post={row} amount={true} handleDelete={handleDelete}/>
        )) : <p>No posts yet! Go follow some people</p>}
      </List>
    </div>
  );
}

export default Following;
