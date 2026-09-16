import { RouterProvider } from "react-router"
import { appRouter} from './router/app.router'
import { Toaster } from "sonner"
import { AuthProvider } from "./auth/store/AuthContext"

export const QuecomidApp = () => {
  return (
    <AuthProvider>
      <Toaster />
      <RouterProvider router={ appRouter } />
    </AuthProvider>
  )
}
