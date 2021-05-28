import {User} from "../utils/models";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import React from "react";
import UserView from "./UserView";

type Props = {
    users: User[]
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '26ch',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px'
    }
}));

const UserFollowForm = (props: Props) => {
    const classes = useStyles();

    return(
        <div>
            <List className={classes.root}>
                {props.users.map((row, index) => (
                    <UserView key={index} user={row}/>
                ))}
            </List>
        </div>
    );
}

export default UserFollowForm