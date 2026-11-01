import { useNavigate } from "react-router";

interface OrderItemProps {
  orderId: string;
  customer: string;
  meal: string;
  quantity: number;
  status: string;
}
export const OrderItem = ({ orderId, customer, meal, quantity, status }: OrderItemProps ) => {
  const navigate = useNavigate();

  
  return (
    <div onClick={() => navigate(`/vendor/order-progress/${orderId}`)} className="grid grid-cols-[1fr_2fr_2fr_1fr_1.5fr] gap-sm px-md py-md border-b border-outline-variant/20 hover:bg-surface-container-highest/50 cursor-pointer">
      <div className="font-medium">{ orderId.substring(orderId.length - 5, orderId.length) }</div>
      <div className="truncate">{ customer }</div>
      <div className="font-headline-sm truncate">{ meal }</div>
      <div>{ quantity }</div>
      <div><span className="px-sm py-xs rounded-full bg-secondary-container text-on-secondary-container text-xs">{ status }</span></div>
    </div>
  )
}
