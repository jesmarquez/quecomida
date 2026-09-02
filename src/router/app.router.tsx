import { createBrowserRouter } from 'react-router';
import { DashboardPage } from '../vendors/page/DashboardPage';
import { LoginPage } from '../auth/pages/loginPage';

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <p className="font-mono ...">Landing page is comming soon!</p>,
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
  },
  {
    path: "login",
    element: <LoginPage/>
  }

])