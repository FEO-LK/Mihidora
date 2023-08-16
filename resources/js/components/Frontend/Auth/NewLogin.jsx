import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Box, Button, TextField, CssBaseline, Typography, Container, Grid, FormControl, Link } from "@mui/material";
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Logo from "../../../../images/logo.jpg";

const styles = {
    AuthBackground: {
        backgroundImage: `url(${"../../../images/org_back_3.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotPasswordBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

function NewLogin() {
    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
        login_error: false,
        loading: false,
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault()

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('sanctum/csrf-cookie').then(response => {
            setLogin({...loginInput, loading: true, login_error: false});
            axios.post('/api/login', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_id', res.data.profileid);
                    localStorage.setItem('org_id', res.data.org_id);
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('user_role', res.data.usertype);
                    if (res.data.usertype == 0) {
                        navigate('/admin/users');
                    }
                    else if (res.data.usertype == 1) {
                        navigate('/');
                    }
                    else { // if org admin user and user type is 2
                        navigate('/dashboard');
                    }
                }
                else if (res.data.status === 401) {
                    // alert('error 401')
                    setLogin({ ...loginInput, login_error: true, loading: false });
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors, login_error: true, loading: false });
                }
            });
        });
    }

    return (
        <div className="auth_layout_wrap">
            <React.Fragment>
                <CssBaseline />
                <Container className="orgRegContainer" maxWidth="false" sx={{ minHeight: '100%', paddingLeft: '0px', paddingRight: '0px' }}>
                    <Grid container sx={{ minHeight: '100%' }}>
                        <Grid xs={12} md={6} className="login-form-left nw-login" style={styles.AuthBackground}>

                        </Grid>
                        <Grid xs={12} md={6} className="login-form" style={styles.forgotPasswordBox}>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={loginInput.loading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            <div className="form_wrap" style={{ margin: 'auto', padding: "0 25px", width: '75%' }}>
                                <Typography className="login-right-header" variant="h6" sx={{ textAlign: 'center', fontWeight: 600, marginBottom: '10px' }}>
                                    Login
                                </Typography>
                                <Link href="/"><img src={Logo} className="brand" /></Link>
                                <Box component={"form"} onSubmit={loginSubmit}>
                                    <FormControl fullWidth>
                                        {loginInput.login_error ?
                                            <Alert sx={{ marginBottom: '30px', marginTop: '30px' }} severity="error">
                                                Invalid Username or Password. Please try again!
                                            </Alert>
                                            : ""}
                                        <TextField
                                            margin="normal"
                                            type="text"
                                            label="E-mail"
                                            InputLabelProps={{
                                                style: { fontSize: 14 }
                                            }}
                                            name="email"
                                            autoComplete="email"
                                            onChange={handleInput}
                                            value={loginInput.email}
                                            variant="standard"
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    '&.Mui-focused': {
                                                        color: '#93aa40'
                                                    }
                                                }
                                            }}
                                        />
                                        <Typography variant="span" sx={{
                                            color: '#d60000de',
                                            fontSize: '13px',
                                        }}>{loginInput.error_list.email}</Typography>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            margin="normal"
                                            type="password"
                                            label="Password"
                                            InputLabelProps={{
                                                style: { fontSize: 14 }
                                            }}
                                            name="password"
                                            autoComplete="password"
                                            onChange={handleInput}
                                            value={loginInput.password}
                                            variant="standard"
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    '&.Mui-focused': {
                                                        color: '#93aa40'
                                                    }
                                                }
                                            }}
                                        />
                                        <Typography variant="span" sx={{
                                            color: '#d60000de',
                                            fontSize: '13px',
                                        }}>{loginInput.error_list.password}</Typography>
                                    </FormControl>
                                    <Typography classname="generic-link" variant="caption">
                                        <NavLink to="/forgot-password">
                                            <span style={{ marginLeft: "4px" }}>Forgot Password?</span>
                                        </NavLink>
                                    </Typography>
                                    <Button variant={"outlined"} type={"submit"} className="theme-btn">Login</Button>
                                    <Typography className="other_option-link">Don’t Have an Account?
                                        <NavLink to="/register-as">
                                            <span style={{ marginLeft: "4px" }}>Singup</span>
                                        </NavLink>
                                    </Typography>
                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default NewLogin;