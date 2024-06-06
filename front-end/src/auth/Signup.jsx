import React, { useState } from 'react';
import { Container } from '@mui/material';
import SignupComponent from '../../components/auth/SignupComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp } from '../../services/AuthServices';
import { useToast } from '../../custom-hooks/useToast';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [userPayload, setUserPayload] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false);
  const { Toast, showToast } = useToast();
  const navigate = useNavigate();

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

  const userValidation = Yup.object().shape({
    first_name: Yup.string().required('First name is required!'),
    last_name: Yup.string().required('Last name is required!'),
    email: Yup.string().required('Email is required!').email('Invalid email id format!'),
    password: Yup.string()
      .matches(passwordRules, { message: "Password should contain minimum 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." })
      .required("Password is required!")

  })

  const signUpFormik = useFormik({
    initialValues: userPayload,
    enableReinitialize: true,
    validationSchema: userValidation,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const response = await signUp({ ...values })
        setLoading(false)
        showToast( "success", "Wooo! We've created a requested user for you!");
        signUpFormik.resetForm()
        navigate('/sign-in')
      }
      catch (err) {
        setLoading(false)
        showToast('error', err?.response?.data?.data?.error || err.message);
      }
    }
  })

  return (
    <>
      <Container maxWidth="sm" className='mt-16'>
        <SignupComponent
          formik={signUpFormik}
          userPayload={userPayload}
          loading={loading}
          setLoading={setLoading}
        />
      </Container>
      {Toast}
    </>
  )
}
