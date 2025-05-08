import { BarChartComponent } from "@/components/charts/barChartComponent";
import { PieChartComponent } from "@/components/charts/pieChartComponent";
import RecentOrders from "@/components/order/RecentOrders";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { BoxIcon, PiggyBank, RotateCcwIcon } from "lucide-react";
const Home = () => {
  const bestSellingFoods = [
    {
      image:
        "https://ilmio.vn/uploads/fnb-menu/appetizers/misti-bruschette.png",
      price: 10000,
      name: "Misti Bruschette",
    },
    {
      image:
        "https://ilmio.vn/uploads/fnb-menu/appetizers/insalata-siciliana.jpg",
      price: 10000,
      name: "Insalata Siciliana",
    },
    {
      image: "https://ilmio.vn/uploads/fnb-menu/pizza/pizza-tonno-cipolla.png",
      price: 10000,
      name: "Tonno Cipolla",
    },
    {
      image: "https://ilmio.vn/uploads/fnb-menu/pizza/pizza-tonno-cipolla.png",
      price: 10000,
      name: "Tonno Cipolla",
    },
  ];
  return (
    <>
      <div className="flex ">
        <div className="flex-[0_0_70%] max-w-[70%] px-2">
          <div className="flex items-center justify-between flex-wrap">
            <div className="px-2 flex-1">
              <div className="bg-white rounded-md p-4 border ">
                <div className="flex items-center justify-between mb-2">
                  <h3>Total orders</h3>
                  <BoxIcon />
                </div>
                <span className="font-semibold">1</span>
              </div>
            </div>
            <div className="px-2 flex-1">
              <div className="bg-white rounded-md p-4  border">
                <div className="flex items-center justify-between mb-2">
                  <h3>Total amount</h3>
                  <PiggyBank />
                </div>
                <span className="font-semibold">1</span>
              </div>
            </div>
            <div className="px-2 flex-1">
              <div className="bg-white rounded-md p-4  border">
                <div className="flex items-center justify-between mb-2">
                  <h3>Total return</h3>
                  <RotateCcwIcon />
                </div>
                <span className="font-semibold">1</span>
              </div>
            </div>
          </div>
          <div className="px-2 mt-5  ">
            <div className="bg-white rounded-md p-4 h-full border">
              <h3 className="text-lg font-semibold">Best Selling Foods</h3>
              <div className="flex flex-col mt-4 gap-5">
                {bestSellingFoods.map((food, index) => {
                  return (
                    <div key={index} className="flex justify-between ">
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center rounded-md p-2 bg-gray-100">
                          <img
                            src={food.image}
                            alt=""
                            className="size-[55px] object-cover"
                          />
                        </div>
                        <span className="font-medium text-[15px]">
                          {food.name}
                        </span>
                      </div>
                      <span className="font-semibold text-[15px]">
                        {formatPriceToVND(food.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <RecentOrders />
      </div>
      <div className="flex mt-5">
        <div className="flex-[0_0_70%] max-w-[70%] px-4">
          <BarChartComponent />
        </div>
        <div className="flex-[0_0_30%] max-w-[30%] px-2">
          <PieChartComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
