import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

function AuthLayout() {
  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <div className="w-full md:w-4/5 lg:w-2/3 h-full md:h-3/4 m-auto shadow-lg bg-gray-100 rounded-lg flex flex-col md:flex-row gap-2">
        <div className="md:w-1/2 m-auto">
          <Link to="/">
            <img src={logo} alt="logo" className="m-auto" />
          </Link>
        </div>
        <div className="md:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
