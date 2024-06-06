import React, { useState } from 'react';
import { Button, Card, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Google, Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton';

export default function SigninComponent({ formik, loading }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    return (
        <Card className='py-5 px-20'>
            <div className='flex justify-center gap-2 flex-col items-center'>
                <h1 className='text-3xl font-[900]'>Sign In</h1>
                <p>Already with us? Just go inside and Enjoy!</p>
            </div>

            {/* Inputs */}
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-4 my-5'>
                    <div className='flex flex-col gap-1'>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type='text'
                            size='small'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.email && formik.errors.email && (
                                <small className='text-[red]'>
                                    {formik.errors.email}
                                </small>
                            )
                        }
                    </div>

                    <div className='flex flex-col gap-1'>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" size='small'>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                size='small'
                                name='password'
                                endAdornment={
                                    <InputAdornment position="end" size='small'>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {
                            formik.touched.password && formik.errors.password && (
                                <small className='text-[red]'>
                                    {formik.errors.password}
                                </small>
                            )
                        }
                    </div>

                    <div className='flex justify-end'>
                        <Link to='/forgot-password' className='underline text-[#1976d2]'>Forgot Password?</Link>
                    </div>
                    <LoadingButton
                        className='font-[500] lowercase'
                        sx={{
                            textTransform: 'capitalize'
                        }}
                        variant="contained"
                        type='submit'
                        loading={loading}
                        startIcon={<Login />}
                    >
                        Sign In
                    </LoadingButton>
                </div>
            </form>
            <div className='flex gap-3 my-5 justify-center items-center'>
                <p>Don't have account ?</p>
                <Link to='/sign-up' className='underline text-[#1976d2]'>Sign Up</Link>
            </div>
            {/* <Divider>OR</Divider>
            <div className='flex flex-col gap-4 my-5'>
                <Button
                    className='font-[500] lowercase'
                    sx={{
                        textTransform: 'capitalize'
                    }}
                    variant="contained"
                    startIcon={<Google />}
                    color="error"
                >
                    Sign in with google
                </Button>
            </div> */}
        </Card>
    )
}
