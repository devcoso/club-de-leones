import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { PrimeReactProvider } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';

//Layout
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

//Pages
  //Auth
  import Login from './pages/auth/Login';
  import Register from './pages/auth/Register';
  import ForgotPassword from './pages/auth/ForgotPassword';

//Loaders
  //Auth
  import { loader as mainLoader } from './layouts/MainLayout';

//Actions
  //Auth
  import { action as registerAction } from './pages/auth/Register';
  import { action as loginAction } from './pages/auth/Login';


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
        
      },
      {
        path:"login",
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
        element: <ForgotPassword />
      }
    ]
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path:"login",
        element: <Login />
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider value={{unstyled:true, pt: Tailwind}}>
      <RouterProvider
        router={router}
        fallbackElement={<i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>}
      />
    </PrimeReactProvider>
  </StrictMode>,
)
