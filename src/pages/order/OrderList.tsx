import OrderCard from "@/components/ui/orderCard";
import STATUS_ORDER from "@/constants/status.order";

const OrderList = () => {
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
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </>
  );
};

export default OrderList;
