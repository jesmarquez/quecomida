import { useState, useEffect } from "react"
import { OrderItem } from "./OrderItem"
import { getOrders } from "../actions/get-orders.action";
import type { Order } from "../interfaces/order.interfaces";
import { SpinButton } from "../../components/ui/SpinButton";
import { toast } from "sonner";

export const ListOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null >(null);

  useEffect(() => {
    let cancelled = false;

    async function getOrdersVendor()  {
      
      try {
        setLoading(true);
        const orders = await getOrders();
        setLoading(false);
        setOrders(orders);
      } catch (error) {
        if (!cancelled) {
          console.log(error);
          toast.error('Failed to load orders');
          setError('Failed to load orders');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }

      return() => {
        console.log('return effect');
        
        cancelled = true;
      }

    }
    getOrdersVendor();
  }, []);

  return (
    <div className="bg-surface-container rounded-xl shadow-sm overflow-hidden">
      { loading && (
        <div className="flex justify-center py-lg">
          <SpinButton/>
        </div>
      )}
      { !loading && !error && orders.length === 0 && (
        <div className="text-center py-lg text-on-surface-variant">
          No orders yet.
        </div>
      )}

      {
        !loading && !error && orders.length > 0 && (
          <>
        <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr] gap-sm px-md py-sm bg-surface-container-highest border-b border-outline-variant/30 text-left font-label-md uppercase">
            <div>ID</div><div>Customer</div><div>Meal</div><div>Qty</div><div>Status</div>
        </div>

        {
          orders.map( (order ) => (
            <OrderItem key={ order.id } orderId = { order.id } customer= { order.customerEmail} meal={ order.mealPost.title } quantity={ order.quantity } status= { order.status }/>
          ))
        }
        </>
      )}

    </div>
  )
}
