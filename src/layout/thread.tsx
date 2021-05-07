import {Post} from "../utils/models";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import PostView from "../post/PostView";
import React from "react";

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

    return (
        <div>
            <List className={classes.root}>
                <PostView post={props.first}/>
                {props.posts.map((row, index) => (
                    <PostView key={index} post={row}/>
                ))}
            </List>
        </div>
    )
}

export default ThreadView;