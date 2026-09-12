import { createBrowserRouter, Navigate } from 'react-router';
import { DashboardPage } from '../vendors/page/DashboardPage';
import { LoginPage } from '../auth/pages/LoginPage';
import { AddMealPage } from '../vendors/page/AddMealPage';
import { MainLayout } from '../components/layouts/MainLayout';
import { MealsPage } from '../customers/pages/MealsPage';
import { OrdersPage } from '../vendors/page/OrdersPage';
import { PlaceOrderPage } from '../customers/pages/PlaceOrderPage';
import { OrderConfirmedPage } from '../customers/pages/OrderConfirmedPage';

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: '/',
        element: <MealsPage/>
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "orders",
        element: <OrdersPage/>
      },
      {
        path: "add-meal",
        element: <AddMealPage />
      },
      {
        path: "place-order",
        element: <PlaceOrderPage/>
      },
      {
        path: "order-confirmed",
        element: <OrderConfirmedPage/>
      }

    ]
  },
  {
    path: "auth",
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login"/>
      },
      {
        path: "login",
        element: <LoginPage/>
      }
    ]
  }
])