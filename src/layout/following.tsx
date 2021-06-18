import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Post} from "../utils/models";
import PostView from "../post/PostView";

type Props = {
  posts: Post[]
  firsts: Post[]
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
  return (
    <div>
      <List className={classes.root}>
        {props.posts.length !== 0 ? props.posts.map((row, index) => (
          <PostView key={index} post={row} amount={true}/>
        )) : <p>No posts yet! Go follow some people</p>}
      </List>
    </div>
  );
}

export default Following;
