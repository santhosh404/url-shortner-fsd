import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

export default function LoginProtected() {

    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
            navigate('/user/home');
        }
        else {
            setLoggedIn(false);
        }
    }, [])

    return (
        <>
            {
                !isLoggedIn ? <Outlet /> : null
            }
        </>
    )
}