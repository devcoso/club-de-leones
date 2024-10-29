import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div>
      <p>Main Layout</p>
      <Outlet />
    </div>
  )
}

export default MainLayout