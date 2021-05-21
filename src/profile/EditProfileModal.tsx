import React, {useState} from "react";
import {Modal} from "@material-ui/core";
import {ChangePassword, User} from "../utils/models";
import {post, put, userUrl} from "../utils/http";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

type Props = {
    open: boolean,
    setOpen: (boolean) => void,
    userInfo: User,
    setUserInfo: (User) => void,
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        borderRadius: '10px',
        backgroundColor: theme.palette.background.paper

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    danger_zone: {
        backgroundColor: 'indianred',
        marginBottom: '16px',
        marginTop: '25px'
    }
}));

const EditProfileModal = (props: Props) => {

    const classes = useStyles();
    const [user, setUser] = useState<User>({id: props.userInfo.id,
        name: props.userInfo.name, username: props.userInfo.username, email: props.userInfo.email, password: '', description: ''});

    const handleClose = () => {
        put(userUrl + 'user/' + user.id, user)
            .then(res => {
                props.setUserInfo(res)
                props.setOpen(false)
                setUser(res)
            })
            .catch()
    }

    const handleNameChange = (event) => {
        setUser({...user, name: event.target.value})
    }

    const handleEmailChange = (event) => {
        setUser({...user, email: event.target.value})
    }

    const handleUsernameChange = (event) => {
        setUser({...user, username: event.target.value})
    }

    const handleDescriptionChange = (event) => {
        setUser({...user, description: event.target.value})
    }

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    type="name"
                                    label="Name"
                                    placeholder="Name"
                                    margin="normal"
                                    defaultValue={user.name}
                                    onChange={handleNameChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Email"
                                    margin="normal"
                                    defaultValue={user.email}
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="username"
                                    type="username"
                                    label="Username"
                                    placeholder="Username"
                                    margin="normal"
                                    defaultValue={user.username}
                                    onChange={handleUsernameChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    type="name"
                                    label="Description"
                                    placeholder="Description"
                                    margin="normal"
                                    defaultValue={user.description}
                                    onChange={handleDescriptionChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            color="primary"
                            className={classes.danger_zone}
                            variant="contained"
                            href={"/changePassword"}
                        >
                            Change password
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleClose}
                            // disabled={props.state.isButtonDisabled}
                        >
                            Update
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => props.setOpen(false)}
                            // disabled={props.state.isButtonDisabled}
                        >
                            Close
                        </Button>
                    </form>
                </div>
            </Container>
        </Modal>
    )


}

export default EditProfileModal;