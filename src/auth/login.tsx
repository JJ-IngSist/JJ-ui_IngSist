import React, {ChangeEventHandler, Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {GOOGLE_AUTH_URL} from "../Constants";
import googleLogo from '../resources/google-logo.png';

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
    handleUsernameChange: ChangeEventHandler<HTMLInputElement>,
    handlePasswordChange: ChangeEventHandler<HTMLInputElement>,
    handleKeyPress: (event: React.KeyboardEvent) => void,
    handleLogin : () => void,
    state: State,
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    or_separator: {
        borderBottom: '1px solid #eee',
        padding: '10px 0',
        position: 'relative',
        display: 'block',
        marginTop: '20px',
        marginBottom: '30px',
        fontSize: '1em'
    },
    image: {
        height: '32px',
        float: 'left',
        marginRight: '5px',
    },
    link: {
        marginBottom: '15px',
        fontSize: '16px',
        marginTop: '16px',
        textDecoration: 'none',
        color: theme.palette.text.primary,
        alignItems: 'center',
        display: 'flex'
    },
    social_login: {
        display: 'flex'
    }
}));


export default function LoginForm(props: Props) {
    const classes = useStyles();

    class SocialLogin extends Component {
        render() {
            return (
                <div className={classes.social_login}>
                    <a className={classes.link} href={GOOGLE_AUTH_URL}>
                        <img src={googleLogo} alt="Google" className={classes.image}/>
                        <p> Log in with Google</p>
                    </a>
                </div>
            );
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <br/>
                <SocialLogin />
                <div className={classes.or_separator}>
                    <span className="or-text">OR</span>
                </div>
                <form className={classes.form} noValidate>
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
                        helperText={props.state.helperText}
                        onChange={props.handlePasswordChange}
                        onKeyPress={props.handleKeyPress}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.handleLogin}
                        disabled={props.state.isButtonDisabled}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}