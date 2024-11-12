import { Outlet, Link } from "react-router-dom"

function MainLayout() {
  return (
    <div>
      <p>Main Layout</p>
      <Link to="/auth/login" className="text-primary">Inicia Sesión</Link>      
      <Outlet />
    </div>
  )
}

export default MainLayout