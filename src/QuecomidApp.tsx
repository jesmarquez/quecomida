import { RouterProvider } from "react-router"
import { appRouter} from './router/app.router'

export const QuecomidApp = () => {
  return (
    <>
      <RouterProvider router={ appRouter } />
    </>
  )
}
