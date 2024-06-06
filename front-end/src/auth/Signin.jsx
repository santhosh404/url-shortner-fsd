import { useState } from "react"; 
import { Container } from "@mui/material";
import SigninComponent from "../../components/auth/SigninComponent";
import { signIn } from "../../services/AuthServices";
import { useToast } from "../../custom-hooks/useToast";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [userPayload, setUserPayload] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false);
  const { Toast, showToast } = useToast();
  const navigate = useNavigate()

  const userValidation = Yup.object().shape({
    email: Yup.string().required('Email is required!').email('Invalid email id format!'),
    password: Yup.string().required("Password is required!")

  })

  const signInFormik = useFormik({
    initialValues: userPayload,
    validationSchema: userValidation,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const response = await signIn({ ...values })
        setLoading(false)
        showToast("success", "Login Success!");
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
        signInFormik.resetForm()
        navigate('/home')

      }
      catch (err) {
        setLoading(false)
        showToast('error', err.response.data.data.error || err.message);
      }
    }
  })
  return (
    <>
      <Container maxWidth="sm" className='mt-10'>
        <SigninComponent
          formik={signInFormik}
          userPayload={userPayload}
          loading={loading}
          setLoading={setLoading}
        />
      </Container>
      {Toast}
    </>
  )
}
