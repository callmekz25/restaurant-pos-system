import OrderCard from "@/components/ui/orderCard";
import STATUS_ORDER from "@/constants/status.order";

const OrderList = () => {
  const orderList = [
    {
      id: 1,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "pending",
    },
    {
      id: 2,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "processing",
    },
    {
      id: 3,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "pending",
    },
    {
      id: 4,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "completed",
    },
    {
      id: 5,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "completed",
    },
    {
      id: 6,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "pending",
    },
    {
      id: 7,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "pending",
    },
    {
      id: 8,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "canceled",
    },
    {
      id: 9,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "refuned",
    },
    {
      id: 10,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "canceled",
    },
    {
      id: 11,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "pending",
    },
    {
      id: 10,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "processing",
    },
    {
      id: 11,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "processing",
    },
    {
      id: 12,
      order_code: "31458",
      total_items: 4,
      createdAt: Date.now(),
      total_amout: 100000,
      order_status: "completed",
    },
  ];
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
        {orderList.map((order) => {
          return (
            <OrderCard
              statusOrder={order.order_status}
              key={order.id}
              orderCode={order.order_code}
              total_amount={order.total_amout}
              total_items={order.total_items}
              dateTime={order.createdAt}
            />
          );
        })}
      </div>
    </>
  );
};

export default OrderList;
