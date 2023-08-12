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
        backgroundImage: `url(${"../../../images/org_back_3.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resize:{
        fontSize:'10px'
      },
};

function OrgReg() {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        user_role: 2,
        reg_number: '',
        description: '',
        contact_number: '',
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
            contact_number: registerInput.phone,
        }
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 200) {
                    // localStorage.setItem('auth_id', res.data.profileid);
                    // localStorage.setItem('org_id', res.data.org_id);
                    // localStorage.setItem('auth_token', res.data.token);
                    // localStorage.setItem('auth_name', res.data.username);
                    navigate('/thank-you');
                }
                else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });

    }

    return (
        <div className="auth_layout_wrap">
            <React.Fragment>
                <CssBaseline />
                <Container className="orgRegContainer" maxWidth="false" sx={{ minHeight:'100%', paddingLeft:'0px', paddingRight:'0px' }}>
                    <Grid container sx={{ minHeight:'100%' }}>
                        <Grid xs={12} md={6} className="login-form-left" style={styles.AuthBackground}>
                        <Box 
                            component="div"
                            className="logoBox" 
                            sx={{ 
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                }}>
                            <Typography variant="h6">
                            Join
                            </Typography>
                            
                            <Link href="/">
                                <img src={Logo} className="brand" /></Link>
                            <Typography variant="subtitle2" gutterBottom>
                                Mihidora supports a culture of open data and collaboration. Researchers who possess or have generated valuable data and information that they are willing to share publicly may be eligible for an individual profile. For more information, please contact mihidorafeo@gmail.com.
                            </Typography>
                        </Box>
                            
                        </Grid>
                        <Grid item xs={12} md={6} className="login-form">
                            <div className="form_wrap" style={{ margin: '80px auto', padding: "0 25px", maxWidth:'600px' }}>
                                
                                <Box component={"form"} onSubmit={registerSubmit}>
                                    <FormControl fullWidth sx={{ marginBottom: '20px'}}>
                                        <TextField
                                            type='text'
                                            margin="normal"
                                            small
                                            label="Organisation Name"
                                            InputLabelProps={{
                                                style: { fontSize: 14 } 
                                              }}
                                            name="name"
                                            onChange={handleInput}
                                            value={registerInput.name}
                                            variant="standard"
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.name}</Typography>
                                    </FormControl>
                                    <FormControl fullWidth style={{ marginBottom: '10px' }}>
                                        <InputLabel sx={{ left: '-15px', fontSize:'14px' }} id="organisation-type-label">Organisation Type</InputLabel>
                                        <Select
                                            labelId="organisation-type-label"
                                            id="organisation-type"
                                            small
                                            value={orgType}
                                            label="Organisation Type"
                                            InputLabelProps={{
                                                style: { fontSize: 14 }
                                              }}
                                            onChange={selectOrgType}
                                            variant="standard"
                                        >
                                            {orgTypeList.map(row => <MenuItem key={row.id} value={row.id}>{row.type}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{fontSize:'14px' }} id="size-of-organization">Size of Organization</FormLabel>
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
                                            InputLabelProps={{
                                                style: { fontSize: 14 }
                                              }}
                                            name="reg_number"
                                            onChange={handleInput}
                                            value={registerInput.reg_number}
                                            variant="standard"
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.reg_number}</Typography>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='text'
                                            multiline
                                            rows={4}
                                            label="Description"
                                            InputLabelProps={{
                                                style: { fontSize: 14 }
                                              }}
                                            name="description"
                                            onChange={handleInput}
                                            value={registerInput.description}
                                            variant="standard"
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.description}</Typography>
                                    </FormControl>
                                    <FormControl fullWidth>

                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    type='tel'
                                                    margin="normal"
                                                    label="Phone"
                                                    InputLabelProps={{
                                                        style: { fontSize: 14 }
                                                      }}
                                                    name="phone"
                                                    onChange={handleInput}
                                                    value={registerInput.phone}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <Typography variant="span" className="required">{registerInput.error_list.phone}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    type='email'
                                                    margin="normal"
                                                    label="Email"
                                                    InputLabelProps={{
                                                        style: { fontSize: 14 }
                                                      }}
                                                    name="email"
                                                    onChange={handleInput}
                                                    value={registerInput.email}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <Typography variant="span" className="required">{registerInput.error_list.email}</Typography>
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='password'
                                            margin="normal"
                                            label="Password"
                                            InputLabelProps={{
                                                style: { fontSize: 14 }
                                              }}
                                            name="password"
                                            onChange={handleInput}
                                            value={registerInput.password}
                                            variant="standard"
                                        />
                                        <Typography variant="span" className="required">{registerInput.error_list.password}</Typography>
                                    </FormControl>
                                    <Typography variant="subtitle2" style={{marginTop: '20px'}} >    
                                    By registering with Mihidora Environmental Portal, you are agreeing to our
                                    <NavLink to="/terms">
                                            <span style={{ color: '#93aa40', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: "4px" }}>Terms & Conditions</span>.
                                    </NavLink>
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant={"outlined"}
                                        type={"submit"}
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{ margin: '20px auto 10px' }}
                                        className="theme-btn"
                                        
                                    >
                                        Register
                                    </Button>
                                    <Typography variant="subtitle2">Have an account already?
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

export default OrgReg;