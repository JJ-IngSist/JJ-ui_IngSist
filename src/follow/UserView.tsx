import {User} from "../utils/models";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React from "react";

type Props = {
    user: User
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
        },
        comment: {
            color: '#7f7f7f',
            marginTop: '5px'
        },
        form: {
            marginRight: '0px'
        },
        thread: {
            textAlign: 'right',
            paddingRight: '10px'
        }
    }),
);

const UserView = (props: Props) => {
    const classes = useStyles();

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={props.user.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <div className={classes.flex}>
                            {props.user.username}
                        </div>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    );
}

export default UserView
