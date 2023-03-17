import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from 'react-router-dom';

export const Protected = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const [Authenticated, setAuthenticated] = useState(false);
    const [Loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get('api/user').then( res => {
            if(res.status === 200 && res.data.user_role == 1) {
                setAuthenticated(true);
            }
            setLoading(false);
        });
        return() => {
            setAuthenticated(false);
        }
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(error) {
        if(error.response.status === 401) {
            navigate('/login');
        }
        return Promise.reject(error);
    }, []);

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if(error.response.status === 403) {
            navigate('/403');
        }
        else if(error.response.status === 404) {
            navigate('/404');
        }
        return Promise.reject(error);
    });

    // if(Loading) {
    //     return <h1>Loading...</h1>
    // }

    if (localStorage.getItem('auth_token')) { 
        return <Component {...rest} />;
    }
    return (
        <Navigate  
            replace
            state={{ from: rest.location }}
            to={{ pathname: "/login" }}
        />
    );
};
