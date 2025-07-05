import { ComponentType, lazy } from "react";

const Home = lazy(() => import('../pages/home'))
const Admin = lazy(() => import('../pages/admin/admin'))
const ManageUser = lazy(() => import('../pages/admin/manageUser'))
const SignUp = lazy(() => import('../pages/signUp'))
const LogIn = lazy(() => import('../pages/logIn'))
const ForgotPassword = lazy(() => import('../pages/forgotPassword'))
const ResetPassword = lazy(() => import('../pages/resetPassword'))
const Page404 = lazy(() => import('../pages/page404'))
const WaitingVerification = lazy(() => import('../pages/waitingVerification'))
const WaitingResetPw = lazy(() => import('../pages/waitingResetPw'))
const Activate = lazy(() => import('../pages/activate'))

interface Route {
    path: string,
    component: ComponentType
}

const publicRoutes: Route[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/admin-gory',
        component: Admin
    },
    {
        path: '/admin-manage-user',
        component: ManageUser
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/login',
        component: LogIn
    },
    {
        path: '/forgot-password',
        component: ForgotPassword
    },
    {
        path: '/reset-password/:usernameEncode',
        component: ResetPassword
    },
    {
        path: '/page404',
        component: Page404
    },
    {
        path: 'signup/waiting-verification',
        component: WaitingVerification
    },
    {
        path: '/waiting-reset-password',
        component: WaitingResetPw
    },
    {
        path: '/activate-account/:usernameEncode',
        component: Activate
    }
]

const privatePublic: Route[] = []

export {
    publicRoutes,
    privatePublic
}