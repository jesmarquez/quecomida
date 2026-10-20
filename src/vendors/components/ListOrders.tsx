import { useState, useEffect } from "react"
import { OrderItem } from "./OrderItem"
import { getOrders } from "../actions/get-orders.action";
import type { Order } from "../interfaces/order.interfaces";

export const ListOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function getOrdersVendor()  {
      const orders = await getOrders();
      setOrders(orders);
      console.log(orders);
    }
    getOrdersVendor();
  }, []);

  return (
    <div className="bg-surface-container rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr] gap-sm px-md py-sm bg-surface-container-highest border-b border-outline-variant/30 text-left font-label-md uppercase">
            <div>ID</div><div>Customer</div><div>Meal</div><div>Qty</div><div>Status</div>
        </div>

        {
          orders.map( (order, i ) => (
            <OrderItem key={ i } orderId = { order.id } customer= { order.customerEmail} meal={ order.mealPost.title } quantity={ order.quantity } status= { order.status }/>
          ))
        }
    </div>
  )
}
