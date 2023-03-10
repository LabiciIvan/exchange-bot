import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from '../src/components/ErrorPage';

import SignIn from '../src/components/Signin';
import SignUp from '../src/components/SignUp';
import Account from '../src/components/Account';
import Home from '../src/components/Home';
import ResetPassword from '../src/components/ResetPassword';
import ResetPasswordConfirm from '../src/components/ResetPasswordConfirm';

const routes = createBrowserRouter([
    {
        path: "/",
        element : <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/account",
        element : <Account/>
    },
    {
        path: "/sign-up",
        element : <SignUp />
    },
    {
        path: "/sign-in",
        element : <SignIn />
    },
    {
        path: "/reset-password",
        element : <ResetPassword/>
    },
    {
        path: "/reset-password/verify/:token",
        element : <ResetPasswordConfirm/>
    }
]);


const router = () => {
    return ( 
            <RouterProvider router={routes} />
     );
}
 
export default router;