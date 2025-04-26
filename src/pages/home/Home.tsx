import { BarChartComponent } from "@/components/charts/barChartComponent";
import { BoxIcon, PiggyBank, RotateCcwIcon } from "lucide-react";
const Home = () => {
  return (
    <div className="flex mt-4">
      <div className="flex-[0_0_65%] max-w-[65%] px-2">
        <div className="flex items-center justify-between flex-wrap">
          <div className="px-2 flex-1">
            <div className="bg-white rounded-md p-4 ">
              <div className="flex items-center justify-between mb-2">
                <h3>Total orders</h3>
                <BoxIcon />
              </div>
              <span className="font-semibold">1</span>
            </div>
          </div>
          <div className="px-2 flex-1">
            <div className="bg-white rounded-md p-4 ">
              <div className="flex items-center justify-between mb-2">
                <h3>Total amount</h3>
                <PiggyBank />
              </div>
              <span className="font-semibold">1</span>
            </div>
          </div>
          <div className="px-2 flex-1">
            <div className="bg-white rounded-md p-4 ">
              <div className="flex items-center justify-between mb-2">
                <h3>Total return</h3>
                <RotateCcwIcon />
              </div>
              <span className="font-semibold">1</span>
            </div>
          </div>
        </div>
        <BarChartComponent />
      </div>
      <div className="flex-[0_0_35%] max-w-[35%] px-2">
        <div className=" bg-white rounded-md p-4">
          <h3 className=" font-semibold text-lg">Recent Orders</h3>
          <div className="flex flex-col gap-3">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
