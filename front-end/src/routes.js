import ActivateAccount from "./pages/auth/ActivateAccount"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import Home from "./pages/home/Home"
import MyProfile from "./pages/home/MyProfile"
import MyUrls from "./pages/home/MyUrls"
import ShortenUrl from "./pages/home/ShortenUrl"

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
        path: '/user/home',
        element: Home
    },
    {
        path: '/user/shorten-url',
        element: ShortenUrl
    },
    {
        path: '/user/my-urls',
        element: MyUrls
    },
    {
        path: '/user/my-profile',
        element: MyProfile
    }
]

export { routes, authProtected }