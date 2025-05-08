import { CircleCheckIcon, ClockIcon, SearchIcon } from "lucide-react";
import CarouselStatus from "../ui/carouselStatus";
import { useGetOrders } from "@/hooks/order";
import Loading from "../ui/loading";
import OrderStatis from "@/interfaces/order/orderStatis.interface";
import getCharacterLastName from "@/utils/getCharacterLastName";
import OrderStatus from "@/enum/orderStatus";
const RecentOrders = () => {
  const { data: orders, isLoading, error } = useGetOrders();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-[0_0_30%] max-w-[30%] px-2 ">
      <div className=" bg-white rounded-md p-4 h-full border">
        <h3 className=" font-semibold text-lg mb-4">Recent Orders</h3>
        <CarouselStatus />
        <div className="flex items-center relative bg-[#f5f1f1] rounded-md  mt-4 ">
          <button className=" absolute left-2 top-[50%] -translate-y-[50%]">
            <SearchIcon className="size-5 opacity-60" />
          </button>
          <input
            type="text"
            placeholder="Search for recent orders..."
            name=""
            id=""
            className="w-full pr-2 pl-8 py-2 text-sm font-normal placeholder:text-sm outline-none"
          />
        </div>
        <div className="flex flex-col gap-8 mt-5 overflow-y-auto max-h-[53vh] pr-1">
          {orders.map((order: OrderStatis) => {
            return (
              <div key={order.orderId} className="flex justify-between ">
                <div className="flex gap-3">
                  <div className="bg-yellow-400 h-fit text-sm font-semibold flex items-center justify-center p-3 px-4 rounded text-black">
                    {order.serverName
                      ? getCharacterLastName(order.serverName)
                      : ""}
                  </div>
                  <div className="flex flex-col  ">
                    <div className="max-h-[80px]  overflow-hidden">
                      <span className="text-md font-medium">
                        {order.serverName}
                      </span>
                      <div className="flex flex-col mt-2 gap-1">
                        {order.foods.map((food, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center max-w-[120px] gap-1 text-[13px] opacity-70 font-medium truncate"
                            >
                              <span className="whitespace-nowrap">
                                x{food.amount}
                              </span>
                              <span className="truncate whitespace-nowrap">
                                {food.foodName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {order.foods && order.foods.length > 2 && (
                      <span className=" text-[13px] opacity-55 font-medium mt-1">
                        +{order.foods.length - 2} items
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between  items-end">
                  <div
                    className={`flex    items-center gap-1 rounded-full h-fit py-1 px-2 ${
                      order.status === OrderStatus.UNFINISHED
                        ? "bg-[#daebfb] text-blue-600"
                        : " bg-[#dafbe5] text-green-600"
                    }`}
                  >
                    {order.status === OrderStatus.UNFINISHED ? (
                      <ClockIcon className="size-3.5" />
                    ) : (
                      <CircleCheckIcon className="size-4" />
                    )}

                    <span className="text-[11px]   font-medium">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[11px] mt-2 opacity-70 bg-gray-200 rounded-full px-2 w-fit py-1">
                    Table: {order.seatId}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
