import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {
    CssBaseline, TextField, Box, Button, Typography, Container, FormControl, InputLabel, Select,
    MenuItem, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Link
} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


import Logo from "../../../../images/logo.jpg";
import { ContactlessOutlined } from "@mui/icons-material";

const styles = {
    AuthBackground: {
        backgroundImage: `url(${"../../../images/org_back_3.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resize: {
        fontSize: '10px'
    },
    forgotPasswordBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

function ResetPassword(props) {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        password: '',
        password_confirmation: '',
        email: '',
        token: '',
        error_list: [],
        loading: false,
        alert: false,
        alert_message: ''
    });
    const [status, setStatus] = useState(false)

    useEffect(() => {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams.get('token'));
        console.log(urlParams.get('email'));
        setRegister({
            ...registerInput,
            email: urlParams.get('email'),
            token: urlParams.get('token')
        })
    }, []);

    const handleInput = (e) => {
        e.persist();
        setRegister({
            ...registerInput,
            [e.target.name]: e.target.value,
            error_list: {
                [e.target.name]: false
            }
        });
    }

    const registerSubmit = (e) => {
        console.log(registerInput);
        e.preventDefault();
        if (registerInput.password_confirmation !== registerInput.password) {
            setRegister({
                ...registerInput,
                error_list: {
                    password: 'Passwords to not match'
                }
            });
            return;
        }
        setRegister({ ...registerInput, loading: true });
        const data = {
            email: registerInput.email,
            token: registerInput.token,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation
        }
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/reset-password', data).then(res => {
                if (res.data.status === 200) {
                    setRegister({ ...registerInput, loading: false });
                    setStatus(true);
                }
                else if (res.data.status === 401) {
                    setRegister({ ...registerInput, alert: true, alert_message: res.data.message });
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    const handleErrorNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setRegister({...registerInput, alert : false});
    };

    return (
        <div className="auth_layout_wrap">
            <React.Fragment>
                <CssBaseline />
                <Container className="orgRegContainer" maxWidth="false" sx={{ minHeight: '100%', paddingLeft: '0px', paddingRight: '0px' }}>
                    <Grid container sx={{ minHeight: '100%' }}>
                        <Grid xs={12} md={6} className="login-form-left" style={styles.AuthBackground}>

                        </Grid>
                        <Grid item xs={12} md={6} className="login-form" style={styles.forgotPasswordBox}>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={registerInput.loading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            <div className="form_wrap" style={{ margin: 'auto', padding: "0 25px", width: '75%' }}>
                                <Box component={"form"} onSubmit={registerSubmit}>
                                    <Link href="/">
                                        <img src={Logo} className="brand" style={{ marginBottom: '40px' }} /></Link>

                                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Update your password
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Please set a new password for you account.
                                    </Typography>
                                    {status ?
                                        <Alert sx={{ marginBottom: '30px', marginTop: '30px' }} severity="success">
                                            Password successfully updated!
                                            <NavLink to="/login">
                                                <span style={{ color: '#000000', textTransform: 'Capitalise', marginLeft: "4px", fontWeight: '600' }}>Back to Login</span>
                                            </NavLink>
                                        </Alert>
                                        :
                                        <div>
                                            <TextField
                                                type='password'
                                                margin="normal"
                                                error={registerInput.error_list.password}
                                                helperText={registerInput.error_list.password}
                                                required
                                                label="Password"
                                                InputLabelProps={{
                                                    style: { fontSize: 14 }
                                                }}
                                                name="password"
                                                onChange={handleInput}
                                                value={registerInput.password}
                                                fullWidth
                                                variant="standard"
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        '&.Mui-focused': {
                                                            color: '#93aa40'
                                                        }
                                                    }
                                                }}
                                            />
                                            <TextField
                                                type='password'
                                                margin="normal"
                                                required
                                                error={registerInput.error_list.password_confirmation}
                                                helperText={registerInput.error_list.password_confirmation}
                                                label="Confirm Password"
                                                InputLabelProps={{
                                                    style: { fontSize: 14 }
                                                }}
                                                name="password_confirmation"
                                                onChange={handleInput}
                                                value={registerInput.password_confirmation}
                                                fullWidth
                                                variant="standard"
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        '&.Mui-focused': {
                                                            color: '#93aa40'
                                                        }
                                                    }
                                                }}
                                            />
                                            <Typography variant="span" className="required">{registerInput.error_list.email}</Typography>
                                            <Button
                                                fullWidth
                                                variant={"outlined"}
                                                type={"submit"}
                                                sx={{ mt: 3, mb: 2 }}
                                                style={{ margin: '20px auto 10px' }}
                                                className="theme-btn"
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    }


                                    <Typography variant="subtitle2">
                                        <NavLink to="/">
                                            <span style={{ color: '#93aa40', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: "4px" }}>Back to Home</span>
                                        </NavLink>
                                    </Typography>

                                </Box>

                            </div>
                        </Grid>
                    </Grid>
                </Container>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={registerInput.alert} autoHideDuration={5000}
                    onClose={handleErrorNotification}
                    TransitionComponent={SlideTransition}
                    key="Slide">
                    <Alert onClose={handleErrorNotification} severity="error" sx={{ width: '100%' }}>
                        {registerInput.alert_message}
                    </Alert>
                </Snackbar>
            </React.Fragment>
        </div>
    );
}

export default ResetPassword;