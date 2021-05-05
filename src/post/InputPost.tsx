import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Post} from "../utils/models";
import Button from "@material-ui/core/Button";
import {ClickAwayListener, Icon} from "@material-ui/core";

type Props = {
    addPost: (post: Post) => void
}

const charLimit = 200;

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
        ableText: {
            margin: '0',
            color: theme.palette.text.secondary
        },
        disableText: {
            margin: '0',
            color: theme.palette.error.main
        },
    }),
);

const InputPost = (props: Props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState<Post>({text: '', threadId: 0});
    const [hidden, setHidden] = React.useState<boolean>(true);

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
                <ClickAwayListener onClickAway={() => setHidden(true)}>
                <TextField
                    id="outlined-multiline-static"
                    label="What's happening?"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={handleChange}
                    onFocus={() => setHidden(false)}
                    InputProps={{
                        endAdornment: (
                            <div className={classes.button}>
                                <Button onClick={handleClick}
                                        color={'primary'}
                                        endIcon={<Icon>send</Icon>}
                                        disabled={value.text === '' || value.text.length > charLimit}>
                                    Send
                                </Button>
                                <p hidden={hidden} className={charLimit - value.text.length >= 0 ?
                                    classes.ableText : classes.disableText}>{charLimit - value.text.length}</p>
                            </div>
                        )}
                    }
                />
                </ClickAwayListener>
            </div>
        </form>
    );
}

export default InputPost;
