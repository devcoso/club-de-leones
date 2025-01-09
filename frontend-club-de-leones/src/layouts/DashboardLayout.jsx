import { me } from "../services/auth"

import { useState } from "react"

import { Outlet, useLoaderData, redirect, useNavigation, Link } from "react-router-dom"

import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"

import logo from '../assets/logo.png'
import LoaderPage from "../pages/LoaderPage"
import DisabledLink from "../components/dashboard/DisabledLink"


export async function loader() {
  const response = await me()
  if(response.status === 200) {
    return response.data
  }
  return redirect('/auth')
}

function DashboardLayout() {

  const navigation = useNavigation();

  const data = useLoaderData();
  const user = data;

  const [showMenu, setShowMenu] = useState(false)

  const isLoading =
  navigation.state === 'loading' &&
  (!navigation.formMethod || navigation.formMethod.toUpperCase() === 'GET'); 

  const people = user.user_type == 3 ? 'Alumnos' : user.user_type == 2 ? 'Personas' : 'Entrenadores'

  return (
    <div className="bg-gray-100 min-h-screen pb-3">
        <div className="bg-white flex flex-col lg:flex-row justify-between shadow-md rounded-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <Link to="/">
              <img src={logo} alt="logo" className="w-20 mx-5 my-1" />
          </Link>
          <Button icon={`pi ${showMenu ? 'pi-times' : 'pi-bars'}`} className="lg:hidden ml-auto bg-primary hover:bg-primary-dark m-2" onClick={() => setShowMenu(!showMenu)} />  
        </div>
        <div className={`${showMenu ? 'block' : 'hidden'} lg:flex lg:flex-row`}>
            <DisabledLink isDisabled={isLoading}  to="/dashboard">
              <i className="pi pi-home" style={{ fontSize: '1.5rem' }}></i>
              <span className="ml-2">Inicio</span>
            </DisabledLink>
            <DisabledLink isDisabled={isLoading} to="/dashboard/events" activePaths={['/dashboard/event/']}>
              <i className="pi pi-calendar" style={{ fontSize: '1.5rem' }}></i>
              <span className="ml-2">Eventos</span>
            </DisabledLink>
            <DisabledLink isDisabled={isLoading} to="/dashboard/trainers-and-students">
              <i className="pi pi-users" style={{ fontSize: '1.5rem' }}></i>
              <span className="ml-2">{people}</span>
            </DisabledLink>
            <DisabledLink isDisabled={isLoading} to="/dashboard/branches">
              <i className="pi pi-building-columns" style={{ fontSize: '1.5rem' }}></i>
              <span className="ml-2">Sedes</span>
            </DisabledLink>
            <DisabledLink isDisabled={isLoading} to="/dashboard/perfil">
              <Avatar label={user.name.charAt(0)} size="normal" shape="circle" style={{width: '1.5rem', height:'1.5rem'}} />
              <span className="ml-2">Perfil</span>
            </DisabledLink>
            { user.user_type == 2 &&  
              <DisabledLink isDisabled={isLoading} to="/admin">
                <i className="pi pi-cog" style={{ fontSize: '1.5rem' }}></i>
                <span className="ml-2">Administración</span>
              </DisabledLink>
            }
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-32">
          <LoaderPage fullscreen={false}/>
        </div>
      ) : <Outlet context={{user}} />}
    </div>
  )
}

export default DashboardLayout