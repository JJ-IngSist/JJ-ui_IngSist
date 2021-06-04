import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";
import {Link} from "@material-ui/core";
import {User} from "../utils/models";

type Props = {
    users: User[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ul: {
            listStyleType: 'none',
            position: 'absolute',
            textAlign: 'left'
        },
        li: {

        },
        link: {
            textDecoration: 'none',
            color: theme.palette.secondary.contrastText
        }
    }),
);

const ShowUsers = (props: Props) => {
    const classes = useStyles();

    return (
        <ul className={classes.ul}>
            {
                props.users.map((user: User) =>
                    <li className={classes.li}>
                        <Link className={classes.link} href={'/profile/' + user.id}>{user.username}</Link>
                    </li>)
            }
        </ul>
    );
}

export default ShowUsers;