import { useState } from "react"

import { me, logout } from "../services/auth"

import { Outlet, redirect, Link, useLocation, useLoaderData } from "react-router-dom"

import logo from "../assets/logo.png"

import { Button } from "primereact/button"

export async function loader() {
  const response = await me()
  if(response.data.user_type != 2) {
    return redirect('/')
  }
  return response.data
}

const logoutButton = () => {
  logout()
  localStorage.removeItem('token')
}

function AdminLayout() {

  const admin = useLoaderData()

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="md:h-screen md:flex">
      <div className="md:w-1/4 lg:w-1/5 bg-gray-100 shadow-2xl p-4 h-full flex flex-col overflow-auto">
        <div className="flex md:flex-col justify-center items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="m-auto w-12 md:w-36" />
          </Link>
          <h1 className="text-2xl font-bold text-center text-primary">Administración</h1>
          <Button icon={`pi ${showMenu ? 'pi-times' : 'pi-bars'}`} className="md:hidden ml-auto bg-primary" onClick={() => setShowMenu(!showMenu)} />
        </div>
        <div className={`mt-4 pb-4 ${showMenu ? 'block' : 'hidden'} md:block`}>
            <Link to="/admin" className={`font-bold p-2 space-x-3 rounded flex items-center transition-color hover:bg-gray-300 mb-2 shadow-md border-gray-200 ${useLocation().pathname === '/admin' ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white'}`} >
              <i className="pi pi-home" style={{ fontSize: '2rem' }}></i>
              <span className="ml-2">Inicio</span>
            </Link>
            <Link to="/admin/events" className={`font-bold p-2 space-x-3 rounded flex items-center transition-color hover:bg-gray-300 mb-2 shadow-md border-gray-200 ${useLocation().pathname === '/admin/events' ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white'}`} >
              <i className="pi pi-calendar" style={{ fontSize: '2rem' }}></i>
              <span className="ml-2">Eventos</span>
            </Link>
            <Link to="/admin/event-types" className={`font-bold p-2 space-x-3 rounded flex items-center transition-color hover:bg-gray-300 mb-2 shadow-md border-gray-200 ${useLocation().pathname === '/admin/event-types' ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white'}`} >
              <i className="pi pi-tag" style={{ fontSize: '2rem' }}></i>
              <span className="ml-2">Tipos</span>
            </Link>
            <Link to="/admin/branches" className={`font-bold p-2 space-x-3 rounded flex items-center transition-color hover:bg-gray-300 mb-2 shadow-md border-gray-200 ${useLocation().pathname === '/admin/branches' ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white'}`} >
              <i className="pi pi-map-marker" style={{ fontSize: '2rem' }}></i>
              <span className="ml-2">Sedes</span>
            </Link>
            <Link to="/admin/users" className={`font-bold p-2 space-x-3 rounded flex items-center transition-color hover:bg-gray-300 mb-2 shadow-md border-gray-200 ${useLocation().pathname === '/admin/users' ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white'}`} >
              <i className="pi pi-user" style={{ fontSize: '2rem' }}></i>
              <span className="ml-2">Usuarios</span>
            </Link>
        </div>
        <Link to={'/'} onClick={logoutButton} className={`${showMenu ? 'block' : 'hidden'} md:block w-full transition-colors bg-red-700 py-3 text-white text-center hover:bg-red-900 max-w-96 mx-auto font-bold`}>Cerrar Sesión</Link>
      </div>
      <div className="md:w-3/4 lg:w-4/5 p-4 overflow-auto">
        <Outlet admin={admin}/>
      </div>
    </div>
  )
}

export default AdminLayout
