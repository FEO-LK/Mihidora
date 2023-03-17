import React from "react";
import {Button, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LogoutButton() {
    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if(res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                navigate('/login');
            }
        });
    }

    return (
        <React.Fragment>
            <Box component={"form"} onSubmit={logoutSubmit}>
                <Button color={'inherit'} type={"submit"}>
                    Logout
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default LogoutButton