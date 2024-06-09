import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

export default function AuthProtected() {

    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setLoggedIn(false);
            navigate('/sign-in');
        }
        else {
            setLoggedIn(true);
        }
    }, [])

    return (
        <>
            {
                isLoggedIn ? <Outlet /> : null
            }
        </>
    )
}
