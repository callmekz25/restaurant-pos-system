import Loading from "@/components/ui/loading";
import OrderCard from "@/components/ui/orderCard";
import STATUS_ORDER from "@/constants/status.order";
import { useGetOrders } from "@/hooks/order";
import OrderStatis from "@/interfaces/order/orderStatis.interface";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrders();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Orders</h3>
        <div className="flex items-center gap-10">
          {STATUS_ORDER.map((st) => {
            return (
              <button
                className="text-sm font-medium text-gray-600"
                key={st.label}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className=" grid grid-cols-4 gap-4 mt-4 ">
        {orders &&
          orders.length > 0 &&
          orders.map((order: OrderStatis) => {
            return (
              <OrderCard
                statusOrder={order.status}
                key={order.orderId}
                orderId={order.orderId}
                total={order.total}
                total_items={order.foods.length}
                dateTime={order.timeIn}
              />
            );
          })}
      </div>
    </>
  );
};

export default OrderList;
