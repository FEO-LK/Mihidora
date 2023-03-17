import React, {useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {Box, Button, TextField, CssBaseline, Typography, Container, Grid, FormControl, Link } from "@mui/material";

import Logo from "../../../../images/logo.jpg";

const styles = {
	AuthBackground: {
		backgroundImage: `url(${"../../../images/auth_bg.jpg"})`
	}
};

function Login() {
    const navigate = useNavigate();

    const [loginInput, setLogin] = useState ({
		email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin( {...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault()

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('sanctum/csrf-cookie').then(response => { 
            axios.post('/api/login', data).then(res => {
                if(res.data.status === 200) {
                    localStorage.setItem('auth_id', res.data.profileid);
                    localStorage.setItem('org_id', res.data.org_id);
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('user_role', res.data.usertype);
                    if(res.data.usertype == 0) {
                        navigate('/admin/dashboard');
                    }
                    else if(res.data.usertype == 1) {
                        navigate('/');
                    }
                    else { // if org admin user and user type is 2
                        navigate('/dashboard');
                    }
                }
                else if(res.data.status === 401) {
                    alert('error 401')
                }else {
                    setLogin({...loginInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return (
        <div className="auth_layout_wrap" style={styles.AuthBackground}>
		<React.Fragment>
			<CssBaseline />
			<Container>
				<Grid container height="100vh" direction="row" alignItems="center">
					<Grid item xs={7} className="login-form-left">

					</Grid>
					<Grid item xs={12} md={5} className="login-form">
                        <div className="form_wrap" style={{padding: "0 25px"}}>    
                            <Link href="/"><img src={Logo} className="brand" /></Link>
                            <Box component={"form"} onSubmit={loginSubmit}>
                                <FormControl fullWidth>
                                    <TextField
                                        margin="normal"
                                        type="text"
                                        label="E-mail"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleInput}
                                        value={loginInput.email}
                                    />
                                    <Typography variant="span">{loginInput.error_list.email}</Typography>
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        margin="normal"
                                        type="password"
                                        label="Password"
                                        name="password"
                                        autoComplete="password"
                                        onChange={handleInput}
                                        value={loginInput.password}
                                    />
                                    <Typography variant="span">{loginInput.error_list.password}</Typography>
                                </FormControl>  
                                <Typography variant="caption">
                                    <NavLink to="">
                                        <span style={{marginLeft:"4px"}}>Forgot password?</span>
                                    </NavLink>
                                </Typography>   
                                <Button variant={"outlined"} type={"submit"} className="theme-btn">Login</Button>
                                <Typography className="other_option-link">Don’t Have an Account?
                                    <NavLink to="/register-as">
                                        <span style={{marginLeft:"4px"}}>Singup</span>
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

export default Login;