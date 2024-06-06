import React, { useState } from 'react'
import ForgotPasswordComponent from '../../components/auth/ForgotPasswordComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container } from '@mui/material';
import { resetPassword } from '../../services/AuthServices';
import { useToast } from '../../custom-hooks/useToast';
import ResetPasswordComponent from '../../components/auth/ResetPasswordComponent';
import { useNavigate, useParams } from 'react-router-dom';


export default function ResetPassword() {

  const [loading, setLoading] = useState(false);
  const { Toast, showToast } = useToast();
  const { id, token } = useParams()
  const navigate = useNavigate()



  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(passwordRules, { message: "Password should contain minimum 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." })
      .required("Password is required!"),

    confirmPassword: Yup.string()
      .matches(passwordRules, { message: "Password should contain minimum 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." })
      .required("Password is required!")
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        showToast("error", "Password and Confirm Password is not matching!")
        return;
      }
      setLoading(true)
      try {
        const response = await resetPassword({ new_password: values.password }, id, token);
        setLoading(false);
        showToast("success", response.data.data.response)
        formik.resetForm()
        navigate('/');
      }
      catch (err) {
        console.log(err)
        setLoading(false);
        showToast("error", err.response.data.data.error || err.message)
      }
    }
  })

  return (
    <>
      <Container maxWidth='sm' className='mt-10'>
        <ResetPasswordComponent
          formik={formik}
          loading={loading}
        />
      </Container>
      {Toast}
    </>

  )
}
