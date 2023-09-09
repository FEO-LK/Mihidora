import React from "react";
import { Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function LogoutLink() {
    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_id');
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.clear();
                console.log(localStorage.getItem('auth_id'));
                navigate('/login');
            }
        });
    }

    return (
        <div className="auth-link-wrap">
            <Link onClick={logoutSubmit} to="" className="theme-btn login-btn">Logout</Link>
        </div>
    )
}

export default LogoutLink