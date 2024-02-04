import { Outlet } from "react-router-dom";
import Navbar from '../components/NavBar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
