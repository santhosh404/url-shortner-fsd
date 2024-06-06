import React, { useState } from 'react';
import { Card, Divider, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';


export default function SignupComponent({ formik, loading, setLoading }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <Card className='py-10 px-20'>
            <div className='flex justify-center gap-2 flex-col items-center'>
                <h1 className='text-3xl font-[900]'>Sign Up</h1>
                <p>Get started with us and do lot more stuffs!</p>
            </div>

            {/* Inputs */}
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-4 my-5'>
                    <div className='flex flex-col gap-1'>
                        <TextField
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            type='text'
                            size='small'
                            name='first_name'
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.first_name && formik.errors.first_name && (
                                <small className='text-[red]'>
                                    {formik.errors.first_name}
                                </small>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-1'>
                        <TextField
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            type='text'
                            size='small'
                            name='last_name'
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.last_name && formik.errors.last_name && (
                                <small className='text-[red]'>
                                    {formik.errors.last_name}
                                </small>
                            )
                        }
                    </div>
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


                    <LoadingButton
                        type='submit'
                        loading={loading}
                        variant="contained"
                        sx={{
                            textTransform: 'capitalize'
                        }}
                    >
                        Sign Up
                    </LoadingButton>
                </div>
            </form>
            <div className='flex gap-2 my-2 justify-center items-center'>
                <p>Already have account ?</p>
                <Link to='/sign-in' className='underline text-[#1976d2]'>Sign In</Link>
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
