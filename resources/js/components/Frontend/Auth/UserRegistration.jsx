import React, { useState } from "react";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { CssBaseline, TextField, Box, Button, Typography, Container, Grid } from "@mui/material";
import axios from "axios";

import Logo from "../../../../images/logo.jpg";

const styles = {
    AuthBackground: {
        backgroundImage: `url(${"../../../images/auth_bg.jpg"})`
    }
};

function UserRegistration() {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        user_role: 1,
        status: 1,
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            user_role: registerInput.user_role,
            status: 1
        }

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    // swal("Success", res.data.message,"success");
                    navigate('/login');
                }
                else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });

    }

    return (
        <div className="auth_layout_wrap" style={styles.AuthBackground}>
            <React.Fragment>
                <CssBaseline />
                <Container>
                    <Grid container>
                        <Grid item xs={7} className="login-form-left">

                        </Grid>
                        <Grid item xs={12} md={5} className="login-form">
                            <div className="form_wrap" style={{ margin: '80px auto', padding: "0 25px" }}>
                                <Link href="/"><img src={Logo} className="brand" /></Link>
                                <Box component={"form"} onSubmit={registerSubmit}>
                                    <TextField
                                        type='text'
                                        margin="normal"
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        onChange={handleInput}
                                        value={registerInput.name}
                                    />
                                    <Typography variant="span">{registerInput.error_list.name}</Typography>
                                    <TextField
                                        type='email'
                                        margin="normal"
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        onChange={handleInput}
                                        value={registerInput.email}
                                    />
                                    <Typography variant="span">{registerInput.error_list.email}</Typography>
                                    <TextField
                                        type='password'
                                        margin="normal"
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        onChange={handleInput}
                                        value={registerInput.password}
                                    />
                                    <Typography variant="span">{registerInput.error_list.password}</Typography>
                                    <Button
                                        fullWidth
                                        variant={"outlined"}
                                        type={"submit"}
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{margin: '20px auto 10px'}}
                                        className="theme-btn"
                                    >
                                        Register
                                    </Button>
                                    <Typography>Have an account already?
                                        <NavLink to="/login">
                                            <span style={{color: '#93aa40', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: "4px" }}>Login</span>
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

export default UserRegistration;