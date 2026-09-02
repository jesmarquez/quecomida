import { createBrowserRouter } from 'react-router';
import { DashboardPage } from '../vendors/page/DashboardPage';
import { LoginPage } from '../auth/pages/loginPage';
import { AddMealPage } from '../vendors/page/AddMealPage';
import { MainLayout } from '../components/layouts/MainLayout';

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "add-meal",
        element: <AddMealPage />
      }]
  },

])