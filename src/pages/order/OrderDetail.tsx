import { useGetOrderByOrderId, useGetOrderByTableId } from "@/hooks/order";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { ArrowLeft, Clock, Clock1 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const OrderDetail = () => {
  // Params
  const { orderId } = useParams();

  // useQuery
  const {} = useGetOrderByOrderId(orderId!);

  return (
    <>
      <div className="px-2 mt-5">
        <div className="bg-white rounded-md p-4 h-full border">
          <div className="flex gap-5 items-center">
            <Link
              to={"/serving/orders"}
              className="rounded-full p-2 hover:bg-gray-300 hover:cursor-pointer"
            >
              <ArrowLeft className=""></ArrowLeft>
            </Link>
            <h3 className="text-lg font-semibold">Order #{orderId}</h3>
            <span className="bg-green-600 rounded-full px-4 py-2">
              Finished
            </span>
          </div>
          <div className="flex flex-col mt-4 gap-5 p-4">
            <div className="flex items-center gap-5">
              <div className="flex-col flex-1">
                <b>Seat</b>
                <div className="">T01</div>
              </div>
              <div className="flex-col flex-1">
                <b>Date</b>
                <div className="">15/05/2025</div>
              </div>
              <div className="flex-col flex-1">
                <b>Cashier</b>
                <div className="">Trần Anh Khoa</div>
              </div>
              <div className="flex-col flex-1">
                <b>Server</b>
                <div className="">Trần Anh Khoa</div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex flex-1 gap-5">
                <div className="flex">
                  <Clock1 color="green"></Clock1>
                  <span className="ml-2">18:30</span>
                </div>
                <div className="flex">
                  <Clock color="red"></Clock>
                  <span className="ml-2">20:30</span>
                </div>
              </div>
              <div className="flex-col flex-1">
                <b>Payment Method</b>
                <div className="">CASH</div>
              </div>
              <div className="flex-col flex-1">
                <b>Note</b>
                <div className="">Toàn bộ Pizza hãy làm viền dày</div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex-col flex-1">
                <b>Discount</b>
                <div className="">2%</div>
              </div>
              <div className="flex-col flex-1">
                <b>Surcharge</b>
                <div className="">{formatPriceToVND(20000)}</div>
              </div>
              <div className="flex-col flex-1">
                <b>Total</b>
                <div className="">{formatPriceToVND(200000)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 mt-10">
        <div className="bg-white rounded-md p-4 h-full border">
          <h3 className="text-lg font-semibold">Food list</h3>
          <div className="flex flex-col mt-4 gap-5 p-4"></div>
        </div>
      </div>

      <div className="px-2 mt-10">
        <div className="bg-white rounded-md p-4 h-full border">
          <h3 className="text-lg font-semibold">Reserve Table Info</h3>
          <div className="flex flex-col mt-4 gap-5 p-4"></div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
