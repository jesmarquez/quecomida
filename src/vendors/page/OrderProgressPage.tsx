import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getOrder } from "../../customers/actions/get-order.action";
import type { Order, Status } from "../interfaces/order.interfaces";
import { CardOrder } from "../components/CardOrder";
import { CardStatus } from "../components/CardStatus";
import { CardItemsOrdered } from "../components/CardItemsOrdered";
import { toast } from "sonner";
import { updateOrder } from "../../customers/actions/update-order.action";
import { SpinButton } from "../../components/ui/SpinButton";


export const OrderProgressPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    async function getOrderById() {
      try {
        const data = await getOrder(id!);
        const dateOrder = new Date(data.createdAt).toDateString();
        let stepOrder = 0;
        switch (data.status) {
          case 'ORDERED':
            stepOrder = 1;
            break;
          case 'READY_FOR_PICKUP':
            stepOrder = 2;
            break;
          case 'HANDED_OVER':
            stepOrder = 3;
            break;
        }
        const newData = {...data, dateOrder: dateOrder, stepOrder: stepOrder }
        setOrder(newData);

      } catch (error) {
       console.log(error);
       toast('Error getting order!'); 
      }
    }
    getOrderById();
  },[id]);

  const handleStatus = async (status: Status) => {

    try {
      const data = await updateOrder(id!, status);
      console.log(data);
      toast('Order updated!');
    } catch (error) {
      console.log(error);
      toast.error('Error updating order!');
    }
    console.log(status);

  }
  return (
      <div
        className="flex flex-col w-full px-gutter md:px-lg py-lg max-w-container-max mx-auto gap-xl"
      >
        { !order && <SpinButton/>}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg relative">
          <div className="col-span-1 md:col-span-4 flex flex-col gap-md sticky top-[120px] self-start z-10">
            <div className="flex items-center gap-sm">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors group cursor-pointer">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
                  >arrow_back</span
                >
              </button>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest"
                >Back to Orders</span
              >
            </div>
            { order && <CardOrder id={ order.id } date={ order.dateOrder } customer= { order.customerEmail }/>
            }
          </div>
          <div className="col-span-1 md:col-span-8 flex flex-col gap-xl">
            {
              order && <CardStatus stepCurrent={ order.stepOrder } onHandleStatus={ handleStatus }/>
            }
            {
              order && <CardItemsOrdered quantity= {order.quantity} image = {order.mealPost.images[0].imageUrl } title = { order.mealPost.title } price={ order.mealPost.price }/>
            }
          </div>
        </div>
      </div>
  )
}
