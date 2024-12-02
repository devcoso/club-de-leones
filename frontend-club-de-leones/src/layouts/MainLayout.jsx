import { me } from "../services/auth"

import { Outlet, Link, useLoaderData } from "react-router-dom"

export async function loader() {
  const response = await me()
  if(response.status === 200) {
    return response.data
  }
  return null
}

function MainLayout() {

  const data = useLoaderData();
  const user = data;

  return (
    <div>
      <p>Main Layout</p>
      {user ? 
        <>
          <p>Hola {user.name}</p>
          <Link to={'/'} onClick={() => localStorage.removeItem('token')} className="w-full text-ce bg-red-700 py-3 text-white text-center hover:bg-red-900 max-w-96 mx-auto block">Cerrar Sesión</Link>
        </>
        : 
        <Link to="/auth/login" className="text-primary">Inicia Sesión</Link>     
      } 
      <Outlet />
    </div>
  )
}

export default MainLayout