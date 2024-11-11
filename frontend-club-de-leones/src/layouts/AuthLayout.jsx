import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

function AuthLayout() {
  return (
    <div className="w-full md:h-screen flex flex-col justify-center bg-gray-100">
      <div className="w-full md:w-4/5 lg:w-2/3 md:h-3/4 m-auto md:shadow-lg bg-white rounded-lg flex flex-col md:flex-row gap-2">
        <div className="md:w-1/2 m-auto">
          <Link to="/">
            <img src={logo} alt="logo" className="m-auto w-72 md:w-auto" />
          </Link>
        </div>
        <div className="md:w-1/2 md:flex md:flex-col md:justify-center md:h-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
