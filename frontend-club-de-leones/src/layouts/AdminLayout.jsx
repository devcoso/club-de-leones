import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <div>
      <p>Admin Layout</p>
      <Outlet />
    </div>
  )
}

export default AdminLayout
