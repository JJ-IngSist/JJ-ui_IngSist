import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Post} from "../utils/models";
import InputPost from "../newPost/InputPost";
import {post, postUrl} from '../utils/http';

type Props = {
    posts: Post[]
    setPosts: (posts: Post[]) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px'
        },
        inline: {
            display: 'inline',
        },
        flex: {
            display: 'flex',
            justifyContent: 'space-between',
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
                    <div>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={row.name} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <div className={classes.flex}>
                                        {row.username}
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {row.date}
                                        </Typography>
                                    </div>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {row.text}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        </div>
    );
}

export default Feed;