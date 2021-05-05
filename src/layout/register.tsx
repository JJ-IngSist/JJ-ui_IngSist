import React, {ChangeEventHandler} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Jibber Jabber - Universidad Austral
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RegisterForm(props: Props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.handleRegister}
                        disabled={props.state.isButtonDisabled}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Log In
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}