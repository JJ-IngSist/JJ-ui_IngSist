import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React, {ChangeEventHandler} from "react";

type State = {
    username: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

type Props = {
    handleUsernameChange: ChangeEventHandler<HTMLInputElement>,
    handlePasswordChange: ChangeEventHandler<HTMLInputElement>,
    handleKeyPress: (event: React.KeyboardEvent) => void,
    handleLogin : () => void,
    state: State,

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            backgroundColor: theme.palette.background.default,
            height: '100%'
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`,
            backgroundColor: theme.palette.background.default
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1,
            backgroundColor: theme.palette.primary.main
        },
        header: {
            textAlign: 'center',
            color: '#fff',
            backgroundColor: theme.palette.primary.main
        },
        card: {
            marginTop: theme.spacing(10),
            backgroundColor: theme.palette.secondary.light
        },
        text: {
            color: theme.palette.background.default
        }
    })
);

export default function LoginForm(props: Props) {
    const classes = useStyles();
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Login App" />
                <CardContent>
                    <div>
                        <TextField
                            error={props.state.isError}
                            fullWidth
                            id="username"
                            type="username"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            onChange={props.handleUsernameChange}
                            onKeyPress={props.handleKeyPress}
                        />

                        <TextField
                            error={props.state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            InputProps={{
                                classes: {
                                    input: classes.text
                                }
                            }}
                            helperText={props.state.helperText}
                            onChange={props.handlePasswordChange}
                            onKeyPress={props.handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.loginBtn}
                        onClick={props.handleLogin}
                        disabled={props.state.isButtonDisabled}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}