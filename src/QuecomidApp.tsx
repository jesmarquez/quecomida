import { RouterProvider } from "react-router"
import { appRouter} from './router/app.router'
import { Toaster } from "sonner"

export const QuecomidApp = () => {
  return (
    <>
      <Toaster />
        <RouterProvider router={ appRouter } />
    </>
  )
}
