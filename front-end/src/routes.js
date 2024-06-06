import ActivateAccount from "./pages/auth/ActivateAccount"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import Home from "./pages/home/Home"
import MyUrls from "./pages/home/MyUrls"

const routes = [
    { 
        path: '/sign-in',
        element: Signin
    },
    {
        path: '/sign-up',
        element: Signup
    },
    {
        path: '/activate-account/:id',
        element: ActivateAccount
    },
    {
        path: '/forgot-password',
        element: ForgotPassword
    },
    {
        path: '/reset-password/:id/:token',
        element: ResetPassword
    }
];

const authProtected = [
    {
        path: '/home',
        element: Home
    },
    {
        path: '/my-urls',
        element: MyUrls
    }
]

export { routes, authProtected }