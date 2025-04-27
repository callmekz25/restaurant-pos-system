import { ClockIcon, SearchIcon } from "lucide-react";
import CarouselStatus from "../ui/carouselStatus";
const RecentOrders = () => {
  const orders = [
    {
      order_code: "3148",
      employee: "Kz",
      foods: [
        {
          name: "Pizza",
          quantity: 2,
        },
      ],
      table: 4,
      status_order: "processing",
    },
    {
      order_code: "3148",
      employee: "Kz",
      foods: [
        {
          name: "Pizza",
          quantity: 2,
        },
        {
          name: "Grilled Rib-Eye Steak",
          quantity: 3,
        },
        {
          name: "Pizza",
          quantity: 2,
        },
      ],
      table: 4,
      status_order: "processing",
    },
    {
      order_code: "3148",
      employee: "Kz",
      foods: [
        {
          name: "Pizza",
          quantity: 2,
        },
        {
          name: "Grilled Italian Sausages",
          quantity: 1,
        },
      ],
      table: 4,
      status_order: "processing",
    },
    {
      order_code: "3148",
      employee: "Kz",
      foods: [
        {
          name: "Pizza",
          quantity: 2,
        },
        {
          name: "Seafood Soup",
          quantity: 1,
        },
        {
          name: "Spaghetti Bolognese",
          quantity: 1,
        },
        {
          name: "Gnocchi Al Pomodoro",
          quantity: 2,
        },
      ],
      table: 4,
      status_order: "processing",
    },
    {
      order_code: "3148",
      employee: "Kz",
      foods: [
        {
          name: "Pizza",
          quantity: 2,
        },
        {
          name: "Seafood Soup",
          quantity: 1,
        },
        {
          name: "Spaghetti Bolognese",
          quantity: 1,
        },
        {
          name: "Gnocchi Al Pomodoro",
          quantity: 2,
        },
      ],
      table: 4,
      status_order: "processing",
    },
    {
      order_code: "3148",
      employee: "Kz",
      foods: [
        {
          name: "Pizza",
          quantity: 2,
        },
        {
          name: "Seafood Soup",
          quantity: 1,
        },
        {
          name: "Spaghetti Bolognese",
          quantity: 1,
        },
        {
          name: "Gnocchi Al Pomodoro",
          quantity: 2,
        },
      ],
      table: 4,
      status_order: "processing",
    },
    {
      order_code: "3148",
      employee: "Kz",
      foods: [
        {
          name: "Pizza",
          quantity: 2,
        },
        {
          name: "Seafood Soup",
          quantity: 1,
        },
        {
          name: "Spaghetti Bolognese",
          quantity: 1,
        },
        {
          name: "Gnocchi Al Pomodoro",
          quantity: 2,
        },
      ],
      table: 4,
      status_order: "processing",
    },
  ];
  return (
    <div className="flex-[0_0_30%] max-w-[30%] px-2 ">
      <div className=" bg-white rounded-md p-4 ">
        <h3 className=" font-semibold text-lg mb-4">Recent Orders</h3>
        <CarouselStatus />
        <div className="flex items-center relative bg-[#f7f7f7] rounded-md mt-4 ">
          <button className=" absolute left-2 top-[50%] -translate-y-[50%]">
            <SearchIcon className="size-4" />
          </button>
          <input
            type="text"
            placeholder="Search for recent orders..."
            name=""
            id=""
            className="w-full pr-2 pl-8 py-2 text-[12px] font-medium placeholder:text-[12px] outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 mt-5 overflow-y-auto max-h-[53vh] pr-1">
          {orders.map((order, index) => {
            return (
              <div key={index} className="flex justify-between ">
                <div className="flex gap-3">
                  <div className="bg-yellow-400 h-fit text-sm font-semibold flex items-center justify-center p-3 rounded text-black">
                    {order.employee}
                  </div>
                  <div className="flex flex-col  ">
                    <div className="max-h-[60px]  overflow-hidden">
                      <span className="text-md font-medium">
                        {order.employee}
                      </span>
                      <div className="flex flex-col  ">
                        {order.foods.map((product, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-1 text-[12px] opacity-70 font-medium line-clamp-2"
                            >
                              <span>x{product.quantity}</span>
                              <span>{product.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {order.foods && order.foods.length > 2 && (
                      <span className=" text-[11px] opacity-55 font-medium">
                        +{order.foods.length - 2} items
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex   bg-[#daebfb] text-blue-600 items-center gap-1 rounded-full h-fit py-1 px-2">
                    <ClockIcon className="size-3" />
                    <span className="text-[11px]  font-medium">
                      {order.status_order}
                    </span>
                  </div>
                  <p className="text-[11px] mt-2 opacity-60 bg-gray-200 rounded-full px-2 w-fit py-[3px]">
                    Table: {order.table}
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
