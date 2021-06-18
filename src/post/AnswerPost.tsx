import {Post} from "../utils/models";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";
import {ClickAwayListener, Icon} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type Props = {
  first: Post,
  addPost: (post:Post) => void
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

const AnswerPost = (props: Props) => {

  const classes = useStyles();
  const [value, setValue] = React.useState<Post>({text: '', threadId: props.first.threadId});
  const [hidden, setHidden] = React.useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const post = {...value, text: event.target.value}
    setValue(post);
  };

  const handleClick = () => {
    props.addPost(value);
    // @ts-ignore
    document.getElementById('outlined-multiline-static').value = ''
    value.text = ''
    setHidden(true)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <ClickAwayListener onClickAway={() => setHidden(true)}>
          <TextField
            id="outlined-multiline-static"
            label="Be part of this thread"
            multiline
            rows={4}
            variant="outlined"
            onChange={handleChange}
            onFocus={() => setHidden(false)}
            InputProps={{
              endAdornment: (
                <div className={classes.button}>
                  <Button onClick={() => {
                    handleClick();
                  }}
                          color={'primary'}
                          className={'send'}
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

export default AnswerPost;