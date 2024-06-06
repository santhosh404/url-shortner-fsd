import { Container } from '@mui/material'
import AuthProtected from './auth-protected/AuthProtected'
import { authProtected, routes } from './routes'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginProtected from './auth-protected/LoginProtected'


function App() {

  return (
    <>
      <Routes>
        <Route element={<LoginProtected />}>
          {routes.map((r, idx) => (
            <Route key={idx} path={r.path} element={<r.element />} />
          ))}
        </Route>
        <Route element={<AuthProtected />}>
          {authProtected.map((r, idx) => (
            <Route key={idx} path={r.path} element={<r.element />} />
          ))}
        </Route>

        {/* Default route */}
        <Route path='/' element={<Navigate to='/sign-in' />} />
      </Routes>
    </>

  )
}

export default App
