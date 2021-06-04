import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";
import {Avatar, Divider, Link, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {User} from "../utils/models";

type Props = {
    users: User[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
            position: 'absolute',
            marginTop: '5px',
            maxHeight: '500px',
            overflow: 'auto'
        },
        ul: {
            listStyleType: 'none',
            position: 'absolute',
            textAlign: 'left'
        },
        link: {
            lineHeight: '2.8',
            textDecoration: 'none',
            color: theme.palette.secondary.contrastText
        }
    }),
);

const ShowUsers = (props: Props) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                props.users.map((user) =>
                    <div>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={user.username}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Link className={classes.link} href={'/profile/' + user.id}>{user.username}</Link>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>)
            }
        </List>
    );
}

export default ShowUsers;