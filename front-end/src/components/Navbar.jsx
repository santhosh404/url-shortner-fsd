import { Avatar, Divider, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useMain } from '../context/MainContext';

export default function Navbar() {
    //context custom hook
    const { userDetails } = useMain()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <>
            <div className='border-b-2 p-3'>
                <div className='flex justify-between items-center'>
                    <Link className='text-[40px] font-[900]' to={'/home'}>ShortIt!</Link>
                    <div className='flex gap-5'>
                        <NavLink style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                borderBottom: isActive && "3px solid #1565c0",
                                color: isActive && "#1565c0",
                                padding: "8px"
                            };
                        }} to={"/home"}>Home</NavLink>
                        <NavLink style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                borderBottom: isActive && "3px solid #1565c0",
                                color: isActive && "#1565c0",
                                padding: "8px"
                            };
                        }} to={"/my-urls"}>My Urls</NavLink>
                    </div>
                    <Avatar sx={{ bgcolor: '#1565c0' }} onClick={handleClick} className='cursor-pointer'>{`${userDetails?.first_name?.charAt(0)}${userDetails?.last_name?.charAt(0)}`}</Avatar>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <div className='flex flex-col px-3 mb-2'>
                            <small className='font-bold'>{userDetails?.email}</small>
                            <small className='italic'>@{`${userDetails?.first_name} ${userDetails?.last_name}`}</small>
                        </div>
                        <Divider />
                        <MenuItem onClick={handleClose}>My Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </>
    )
}
