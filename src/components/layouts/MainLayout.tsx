import { Outlet } from "react-router"
import { Header } from "../ui/Header"
import { Footer } from "../ui/Footer"

export const MainLayout = () => {
  return (
    <div className="bg-background font-body-md text-on-background min-h-screen">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
