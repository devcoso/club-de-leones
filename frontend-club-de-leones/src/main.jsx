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

//Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

//Pages
import Home from './pages/Home';
import LoaderPage from './pages/LoaderPage';
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
  //Dasboard
  import Main from './pages/dashboard/Main';
  import Events from './pages/dashboard/Events';
  import Event from './pages/dashboard/Event';
  import Branches from './pages/dashboard/Branches';
  import Perfil from './pages/dashboard/Perfil';
  import TrainersAndStudents from './pages/dashboard/TrainersAndStudents';

//Loaders
  //Layouts
  import { loader as dashboardLoader } from './layouts/DashboardLayout';
  import { loader as authLoader } from './layouts/AuthLayout';
  import { loader as adminLoader } from './layouts/AdminLayout';
  //Admin
  import { loader as adminEventTypesLoader } from './pages/admin/EventTypes';
  import { loader as adminBranchesLoader } from './pages/admin/Branches';
  import { loader as adminUsersLoader } from './pages/admin/Users';
  import { loader as adminEventsLoader } from './pages/admin/Events';
  //Dashboard
  import { loader as branchesLoader } from './pages/dashboard/Branches';
  import { loader as trainersAndStudentsLoader } from './pages/dashboard/TrainersAndStudents';
  import { loader as eventsLoader } from './pages/dashboard/Events';

//Actions
  //Auth
  import { action as registerAction } from './pages/auth/Register';
  import { action as loginAction } from './pages/auth/Login';
  import { action as forgotPasswordAction } from './pages/auth/ForgotPassword';
  import { action as resetPasswordAction } from './pages/auth/ResetPassword';
  //Admin
  import { action as adminEventTypesAction } from './pages/admin/EventTypes';
  import { action as adminBranchesAction } from './pages/admin/Branches';
  import { action as adminEventsAction } from './pages/admin/Events';


const router = createBrowserRouter([
  {
    index:true,
    element: <Home />
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index:true,
        element: <Main />
      },
      {
        path:"events",
        element: <Events />,
        loader: eventsLoader
      },
      {
        path:"event/:id",
        element: <Event />
      },
      {
        path:"branches",
        element: <Branches />,
        loader: branchesLoader
      },
      {
        path:"perfil",
        element: <Perfil />
      },
      {
        path:"trainers-and-students",
        element: <TrainersAndStudents />,
        loader: trainersAndStudentsLoader
      },
    ],
    loader: dashboardLoader
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
        element: <AdminEvents />,
        loader: adminEventsLoader,
        action: adminEventsAction
      },
      {
        path:"event-types",
        element: <AdminEventTypes />,
        loader: adminEventTypesLoader,
        action: adminEventTypesAction
      },
      {
        path:"branches",
        element: <AdminBranches />,
        loader: adminBranchesLoader,
        action: adminBranchesAction
      },
      {
        path:"users",
        element: <AdminUsers />,
        loader: adminUsersLoader
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
        fallbackElement={<LoaderPage />}
      />
    </PrimeReactProvider>
  </StrictMode>,
)
