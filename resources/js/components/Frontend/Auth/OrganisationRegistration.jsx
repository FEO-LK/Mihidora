import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import {
    CssBaseline, TextField, Box, Button, Typography, Container, FormControl, InputLabel, Select,
    MenuItem, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Link
} from "@mui/material";
import axios from "axios";

import Logo from "../../../../images/logo.jpg";

const styles = {
    AuthBackground: {
        backgroundImage: `url(${"../../../images/auth_bg.jpg"})`
    }
};

function OrganisationRegistration() {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        user_role: 2,
        reg_number: '',
        description: '',
        error_list: [],
    });
    const [orgTypeList, setOrgTypeList] = useState([]);
    const [orgType, setOrgType] = useState("");
    const [orgSize, setOrgSize] = useState("");

    useEffect(() => {
        getOrganizationTypes();

    }, []);

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const getOrganizationTypes = () => {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.get('/api/organisation-types').then(res => {
                if (res.data.status === 200) {
                    setOrgTypeList(res.data.organizationTypes);
                }
            });
        });
    }

    const selectOrgType = (event) => {
        setOrgType(event.target.value);
    };

    const selectOrgSize = (event) => {
        setOrgSize(event.target.value);
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            user_role: 2,
            org_type: orgType,
            org_size: orgSize,
            reg_number: registerInput.reg_number,
            description: registerInput.description,
        }
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_id', res.data.profileid);
                    localStorage.setItem('org_id', res.data.org_id);
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
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
                        <Grid item xs={6} className="login-form-left">

                        </Grid>
                        <Grid item xs={12} md={6} className="login-form">
                            <div className="form_wrap" style={{ margin: '80px auto', padding: "0 25px" }}>
                                <Link href="/"><img src={Logo} className="brand" /></Link>
                                <Box component={"form"} onSubmit={registerSubmit}>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='text'
                                            margin="normal"
                                            small
                                            label="Organisation Name"
                                            name="name"
                                            onChange={handleInput}
                                            value={registerInput.name}
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.name}</Typography>
                                    </FormControl>
                                    <FormControl fullWidth style={{marginBottom: '10px'}}>
                                        <InputLabel id="organisation-type-label">Organisation Type</InputLabel>
                                        <Select
                                            labelId="organisation-type-label"
                                            id="organisation-type"
                                            small
                                            value={orgType}
                                            label="Organisation Type"
                                            onChange={selectOrgType}
                                        >
                                            {orgTypeList.map(row => <MenuItem key={row.id} value={row.id}>{row.type}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel id="size-of-organization">Size of Organization</FormLabel>
                                        <RadioGroup
                                            row
                                            onChange={selectOrgSize}
                                        >
                                            <FormControlLabel value="1 - 10" control={<Radio />} label="1 - 10" />
                                            <FormControlLabel value="11 - 30" control={<Radio />} label="11 - 30" />
                                            <FormControlLabel value="31 - 60" control={<Radio />} label="31 - 60" />
                                            <FormControlLabel value="61 - 100" control={<Radio />} label="61 - 100" />
                                            <FormControlLabel value="Over 100" control={<Radio />} label="Over 100" />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='text'
                                            margin="normal"
                                            label="Registration No"
                                            name="reg_number"
                                            onChange={handleInput}
                                            value={registerInput.reg_number}
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.reg_number}</Typography>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='text'
                                            multiline
                                            rows={4}
                                            label="Description"
                                            name="description"
                                            onChange={handleInput}
                                            value={registerInput.description}
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.description}</Typography>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='email'
                                            margin="normal"
                                            label="Email"
                                            name="email"
                                            onChange={handleInput}
                                            value={registerInput.email}
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.email}</Typography>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='password'
                                            margin="normal"
                                            label="Password"
                                            name="password"
                                            onChange={handleInput}
                                            value={registerInput.password}
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.password}</Typography>
                                    </FormControl>
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
                                            <span style={{ color: '#93aa40', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: "4px" }}>Login</span>
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

export default OrganisationRegistration;