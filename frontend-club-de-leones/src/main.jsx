import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';

//Layout
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

//Pages
  import Loader from './pages/Loader';
  import Page404 from './pages/Page404';
  //Auth
  import Login from './pages/auth/Login';
  import Register from './pages/auth/Register';
  import ForgotPassword from './pages/auth/ForgotPassword';
  import ResetPassword from './pages/auth/ResetPassword';
  //Admin
  import AdminHome from './pages/admin/Home';
  import AdminEvents from './pages/admin/Events';
  import AdminEventTypes from './pages/admin/EventTypes';
  import AdminBranches from './pages/admin/Branches';
  import AdminUsers from './pages/admin/Users';

//Loaders
  //Layouts
  import { loader as mainLoader } from './layouts/MainLayout';
  import { loader as authLoader } from './layouts/AuthLayout';
  import { loader as adminLoader } from './layouts/AdminLayout';
  //Admin
  import { loader as adminEventTypesLoader } from './pages/admin/EventTypes';

//Actions
  //Auth
  import { action as registerAction } from './pages/auth/Register';
  import { action as loginAction } from './pages/auth/Login';
  import { action as forgotPasswordAction } from './pages/auth/ForgotPassword';
  import { action as resetPasswordAction } from './pages/auth/ResetPassword';


const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path:"",
        element: <p>Home</p>
      }
    ],
    loader: mainLoader
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index:true,
        element: <Login />,
        action: loginAction,
      },
      {
        path:"register",
        element: <Register />,
        action: registerAction,
      },
      {
        path:"forgot-password",
        element: <ForgotPassword />,
        action: forgotPasswordAction,
      },
      {
        path:"reset-password/:token",
        element: <ResetPassword />,
        action: resetPasswordAction,
      }
    ],
    loader: authLoader
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index:true,
        element: <AdminHome />
      },
      {
        path:"events",
        element: <AdminEvents />
      },
      {
        path:"event-types",
        element: <AdminEventTypes />,
        loader: adminEventTypesLoader
      },
      {
        path:"branches",
        element: <AdminBranches />
      },
      {
        path:"users",
        element: <AdminUsers />
      }
    ],
    loader: adminLoader
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider value={{unstyled:true, pt: Tailwind}}>
      <RouterProvider
        router={router}
        fallbackElement={<Loader />}
      />
    </PrimeReactProvider>
  </StrictMode>,
)
