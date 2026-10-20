import { useNavigate } from "react-router";
import { useAuth } from "../../auth/store/AuthContext"
import { useEffect } from "react";
import { ListOrders } from "../components/ListOrders";

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!getToken()) navigate('/auth/login');
  }, [] );

  return (
    <main className="w-full pt-20">
        <div className="flex flex-col w-full px-gutter max-w-container-max mx-auto pb-xl">
            <div className="flex justify-between items-end mb-lg mt-md">
                <h1 className="font-display-lg">Orders Received</h1>
                <div className="flex gap-md">
                    <button className="bg-surface-container-high px-md py-sm rounded-full">Export</button>
                    <button className="bg-primary text-on-primary px-md py-sm rounded-full">Filter</button>
                </div>
            </div>

            <ListOrders/>
        </div>
    </main>
  )
}
