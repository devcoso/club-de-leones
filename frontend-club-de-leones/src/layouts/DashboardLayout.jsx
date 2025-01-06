import { me, logout } from "../services/auth"

import LoaderPage from "../pages/LoaderPage"

import { Outlet, useLoaderData, useNavigate, redirect, useNavigation } from "react-router-dom"

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
  const navigation = useNavigation();

  const data = useLoaderData();
  const user = data;

  const logoutButton = () => {
    logout()
    localStorage.removeItem('token')
  }

  let routes = [
    {label: 'Inicio', icon: 'pi pi-fw pi-home',  command: () => handleNavigate('/dashboard')},
    {label: 'Eventos', icon: 'pi pi-fw pi-calendar', command: () => handleNavigate('/dashboard/events')},
    {label: user.user_type == 3 ? 'Alumnos' : 'Entrenadores', icon: 'pi pi-fw pi-users', command: () => handleNavigate('/dashboard/trainers-and-students')},
    {label: 'Sedes', icon: 'pi pi-fw pi-map-marker', command: () => handleNavigate('/dashboard/branches')},
    {label: 'Perfil', icon: <Avatar label={user.name.charAt(0)} size="normal" shape="circle" style={{width:"1.2rem", height: "1.2rem", marginRight: "0.3rem"}} />, command: () => handleNavigate('/dashboard/perfil')},
  ]

  if(user.user_type == 2) {
    routes.push({label: 'Administración', icon: 'pi pi-fw pi-cog', command: () => handleNavigate('/admin')})
  }

  const isLoading =
  navigation.state === 'loading' &&
  (!navigation.formMethod || navigation.formMethod.toUpperCase() === 'GET');

  function handleNavigate(to) {
    if(!isLoading) {
      navigate(to)
    }
  } 

  return (
    <div className="bg-gray-100 min-h-screen">
      <TabMenu model={routes} className="sticky top-0 w-full z-10"/>  
      {isLoading ? (
        <div className="flex justify-center items-center my-32">
          <LoaderPage fullscreen={false}/>
        </div>
      ) : <Outlet context={{user}} />}
    </div>
  )
}

export default DashboardLayout