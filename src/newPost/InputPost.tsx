import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Post} from "../utils/models";
import Button from "@material-ui/core/Button";
import {Icon} from "@material-ui/core";

type Props = {
    addPost: (post: Post) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        button: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

const InputPost = (props: Props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState<Post>({text: '', threadId: 0});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const post = {...value, text: event.target.value}
        setValue(post);
    };

    const handleClick = () => {
        props.addPost(value);
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Que estas pensando?"
                    multiline
                    rows={4}
                    variant="outlined"
                />
            </div>

            <div className={classes.root}>
                <Button onClick={handleClick}
                        endIcon={<Icon>send</Icon>}>
                   Send
                </Button>
            </div>
        </form>
    );
}

export default InputPost;
