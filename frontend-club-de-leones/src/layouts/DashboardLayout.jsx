import { me, logout } from "../services/auth"

import { useState } from "react"

import { Outlet, useLoaderData, useNavigate } from "react-router-dom"

import { Avatar } from "primereact/avatar"
import { TabMenu } from "primereact/tabmenu"


export async function loader() {
  const response = await me()
  if(response.status === 200) {
    return response.data
  }
  return redirect('/auth')
}

function DashboardLayout() {

  const navigate = useNavigate();

  const data = useLoaderData();
  const user = data;

  const logoutButton = () => {
    logout()
    localStorage.removeItem('token')
  }

  let routes = [
    {label: 'Inicio', icon: 'pi pi-fw pi-home',  command: () => navigate('/dashboard')},
    {label: 'Eventos', icon: 'pi pi-fw pi-calendar', command: () => navigate('/dashboard/events')},
    {label: user.user_type == 3 ? 'Alumnos' : 'Entrenadores', icon: 'pi pi-fw pi-users', command: () => navigate('/dashboard/trainers-and-students')},
    {label: 'Sedes', icon: 'pi pi-fw pi-map-marker', command: () => navigate('/dashboard/branches')},
    {label: 'Perfil', icon: <Avatar label={user.name.charAt(0)} size="normal" shape="circle" style={{width:"1.2rem", height: "1.2rem", marginRight: "0.3rem"}} />, command: () => navigate('/dashboard/perfil')},
  ]

  if(user.user_type == 2) {
    routes.push({label: 'Administración', icon: 'pi pi-fw pi-cog', command: () => navigate('/admin')})
  }


  return (
    <div>
      <TabMenu model={routes}/>  
      <Outlet context={{user}} />
    </div>
  )
}

export default DashboardLayout