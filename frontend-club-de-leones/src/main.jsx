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
        element: <Login />
      },
      {
        path:"register",
        element: <Register />
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
