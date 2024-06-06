import React, { useState } from 'react'
import ForgotPasswordComponent from '../../components/auth/ForgotPasswordComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container } from '@mui/material';
import { forgotPassword } from '../../services/AuthServices';
import { useToast } from '../../custom-hooks/useToast';


export default function ForgotPassword() {

  const [loading, setLoading] = useState(false);
  const { Toast, showToast } = useToast();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email id is required!').email('Invalid email id!')
  })

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const response = await forgotPassword({ email: values.email });
        setLoading(false);
        showToast("success", response.data.data.response)
        formik.resetForm()
      }
      catch (err) {
        setLoading(false);
        showToast("error", err.response.data.data.error || err.message)
      }
    }
  })

  return (
    <>
      <Container maxWidth='sm' className='mt-10'>
        <ForgotPasswordComponent
          formik={formik}
          loading={loading}
        />
      </Container>
      {Toast}
    </>

  )
}
