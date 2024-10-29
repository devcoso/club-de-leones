import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div>
        <p>Hola desde layout</p>
        <Outlet />
    </div>
  )
}

export default AuthLayout
