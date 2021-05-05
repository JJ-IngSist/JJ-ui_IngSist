import React, {ChangeEventHandler} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Grid, Link} from "@material-ui/core";

type State = {
    username: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

type Props = {
    handleNameChange: ChangeEventHandler<HTMLInputElement>,
    handleLastnameChange: ChangeEventHandler<HTMLInputElement>,
    handleEmailChange: ChangeEventHandler<HTMLInputElement>,
    handleUsernameChange: ChangeEventHandler<HTMLInputElement>,
    handlePasswordChange: ChangeEventHandler<HTMLInputElement>,
    handleKeyPress: (event: React.KeyboardEvent) => void,
    handleRegister : () => void,
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
            backgroundColor: '#282c34',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100vh'
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
            borderRadius: '8px',
            backgroundColor: theme.palette.secondary.light,
            paddingBottom: '8px'
        },
        text: {
            color: theme.palette.background.default
        },
        link: {
            paddingLeft: '8px'
        }
    })
);

export default function RegisterForm(props: Props) {
    const classes = useStyles();
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Register" />
                <CardContent>
                    <div>
                        <TextField
                            error={props.state.isError}
                            fullWidth
                            id="name"
                            type="name"
                            label="Name"
                            placeholder="Name"
                            margin="normal"
                            onChange={props.handleNameChange}
                            onKeyPress={props.handleKeyPress}
                        />

                        <TextField
                            error={props.state.isError}
                            fullWidth
                            id="lastname"
                            type="lastname"
                            label="Lastname"
                            placeholder="Lastname"
                            margin="normal"
                            onChange={props.handleLastnameChange}
                            onKeyPress={props.handleKeyPress}
                        />

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
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            onChange={props.handleEmailChange}
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
                        onClick={props.handleRegister}
                        disabled={props.state.isButtonDisabled}>
                        Register
                    </Button>
                </CardActions>
                <Link href="/login" variant="body2" className={classes.link}>
                    Already have an account? Sign in
                </Link>
            </Card>
        </form>
    );
}