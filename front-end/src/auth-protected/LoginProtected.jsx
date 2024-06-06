import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function LoginProtected() {

    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
            navigate('/home');
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