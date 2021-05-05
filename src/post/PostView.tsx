import React from "react";
import {Post} from "../utils/models";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {post, userUrl} from "../utils/http";

type Props = {
    post: Post
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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


const PostView = (props: Props) => {
    const classes = useStyles();
    const [isChecked, setChecked] = React.useState<boolean>(props.post.liked || false);
    const [thePost, setThePost] = React.useState<Post>(props.post);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if(event.target.checked) {
            post(userUrl + 'user/like/' + props.post.id, {})
                .then(() =>
                    setThePost({...thePost, liked: isChecked, likes: thePost.likes ? thePost.likes+1: 1})
                )
                .catch(err => console.log(err))
        } else {
            post(userUrl + 'user/dislike/' + props.post.id, {})
                .then(() =>
                    setThePost({...thePost, liked: isChecked, likes: thePost.likes ? thePost.likes-1: 0}))
                .catch(err => console.log(err))
        }

    };

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={thePost.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <div className={classes.flex}>
                            {thePost.username}
                            <div>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {thePost.date}
                                </Typography>
                            </div>
                        </div>
                    }
                    secondary={
                        <div className={classes.flex}>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                className={classes.typo}
                            >
                                {thePost.text}
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox icon={<FavoriteBorder />}
                                              checkedIcon={<Favorite />}
                                              onChange={handleCheck}
                                              defaultChecked={isChecked}/>}
                                label={thePost.likes}
                            />
                        </div>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    )
}

export default PostView;