import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {
    CssBaseline, TextField, Box, Button, Typography, Container, FormControl, InputLabel, Select,
    MenuItem, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Link
} from "@mui/material";
import axios from "axios";

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
    resize: {
        fontSize: '10px'
    },
    forgotPasswordBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

function ForgotPassword() {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        email: '',
        error_list: [],
    });
    const [status, setStatus] = useState(false)

    useEffect(() => {


    }, []);

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        setStatus(true);
        e.preventDefault();
        const data = {
            email: registerInput.email
        }
        axios.get('sanctum/csrf-cookie').then(response => { 
            axios.post('/api/forgot-password', data).then(res => {
                if(res.data.status === 200) {
                    // setStatus(true);
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
        <div className="auth_layout_wrap">
            <React.Fragment>
                <CssBaseline />
                <Container className="orgRegContainer" maxWidth="false" sx={{ minHeight: '100%', paddingLeft: '0px', paddingRight: '0px' }}>
                    <Grid container sx={{ minHeight: '100%' }}>
                        <Grid xs={12} md={6} className="login-form-left" style={styles.AuthBackground}>

                        </Grid>
                        <Grid item xs={12} md={6} className="login-form" style={styles.forgotPasswordBox}>
                            <div className="form_wrap" style={{ margin: 'auto', padding: "0 25px", width: '75%' }}>
                                <Box component={"form"} onSubmit={registerSubmit}>
                                    <Link href="/">
                                        <img src={Logo} className="brand" style={{ marginBottom: '40px' }} /></Link>

                                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Forgot your password?
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Please enter the email address you registered with us and we'll send you a link to set a new password.
                                    </Typography>
                                    {status ?
                                        <Alert sx={{ marginBottom: '30px', marginTop:'30px'}} severity="success"> 
                                            We have emailed the instructions to reset your password on 
                                            <span style={{ color: '#000000', fontSize: '12px', textTransform: 'Capitalise', marginLeft: "4px", fontWeight: '600' }}>{registerInput.email}</span>. Please check your inbox 
                                        </Alert>
                                        :
                                        <div>
                                            <TextField
                                                type='email'
                                                margin="normal"
                                                required
                                                label="Email"
                                                InputLabelProps={{
                                                    style: { fontSize: 14 }
                                                }}
                                                name="email"
                                                onChange={handleInput}
                                                value={registerInput.email}
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
                                                Submit
                                            </Button>
                                        </div>
                                    }


                                    <Typography variant="subtitle2">
                                        <NavLink to="/login">
                                            <span style={{ color: '#93aa40', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: "4px" }}>Back to login</span>
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

export default ForgotPassword;