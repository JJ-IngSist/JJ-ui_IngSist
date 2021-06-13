import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React, {ChangeEventHandler} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

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
    oldPassword: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

type Props = {
    handleOldPasswordChange: ChangeEventHandler<HTMLInputElement>,
    handlePasswordChange: ChangeEventHandler<HTMLInputElement>,
    handleKeyPress: (event: React.KeyboardEvent) => void,
    handleUpdatePassword : () => void,
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

const ChangePasswordForm = (props: Props) => {
    const classes = useStyles();

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        error={props.state.isError}
                        fullWidth
                        id="oldPassword"
                        type="password"
                        label="Old Password"
                        placeholder="Old Password"
                        margin="normal"
                        helperText={props.state.helperText}
                        onChange={props.handleOldPasswordChange}
                        onKeyPress={props.handleKeyPress}
                    />
                    <TextField
                        error={props.state.isError}
                        fullWidth
                        id="password"
                        type="password"
                        label="New Password"
                        placeholder="New Password"
                        margin="normal"
                        helperText={props.state.helperText}
                        onChange={props.handlePasswordChange}
                        onKeyPress={props.handleKeyPress}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.handleUpdatePassword}
                        disabled={props.state.isButtonDisabled}
                    >
                        Update Password
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default ChangePasswordForm;
