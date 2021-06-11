import {Post} from "../utils/models";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import PostView from "../post/PostView";
import React from "react";
import {post, postUrl} from "../utils/http";
import AnswerPost from "../post/AnswerPost";

type Props = {
    first: Post
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

const ThreadView = (props: Props) => {
  const classes = useStyles();
  debugger

  const addPost = (thePost: Post) => {
    post(postUrl + 'post', {text: thePost.text, user: thePost.user, thread: thePost.threadId })
      .then(res =>
        props.setPosts([...props.posts, res]))
      .catch(err => console.log(err.message))
  }

  return (
    <div>
      {props.first.id !== 0 ?
        <List className={classes.root}>
          <PostView post={props.first} amount={false}/>
          {+localStorage.getItem('id') !== 0 ? <AnswerPost first={props.first} addPost={addPost}/> : <></>}
          {props.posts.map((row, index) => (
            <PostView key={index} post={row} amount={false}/>
          ))}
        </List> : <></>}
    </div>
  )
}

export default ThreadView;