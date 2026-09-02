import { Outlet } from "react-router"
import { Header } from "../ui/Header"
import { Footer } from "../ui/Footer"

export const MainLayout = () => {
  return (
    <body className="bg-background font-body-md text-on-background">
      <Header/>
      <Outlet/>
      <Footer/>
    </body>
  )
}
