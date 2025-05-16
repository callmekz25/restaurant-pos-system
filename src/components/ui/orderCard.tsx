import OrderStatus from "@/enum/orderStatus";
import Order from "@/pages/order/Order";
import formatDate from "@/utils/formatDate";
import formatPriceToVND from "@/utils/formatPriceToVND";
import formatTime from "@/utils/formatTime";
import { BoxIcon, ClockIcon, EditIcon, EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const OrderCard = ({
  orderId,
  total_items,
  total,
  dateTime,
  statusOrder,
}: {
  orderId: string;
  total_items: number;
  total: number;
  dateTime: Date;
  statusOrder: OrderStatus;
}) => {
  return (
    <div className="bg-white shadow rounded-md border border-gray-300 p-3">
      <div className="flex items-center justify-between pb-2 ">
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm">Guest</h3>
          <span className="text-sm opacity-80">#{orderId}</span>
        </div>
        <div
          className={`flex ${
            statusOrder == OrderStatus.FINISHED
              ? "bg-[#daebfb]  text-blue-600"
              : "bg-gray-300"
          } items-center gap-2 rounded-full py-1 px-2`}
        >
          <ClockIcon className="size-4" />
          <span className="text-[12px]  font-medium">{statusOrder}</span>
        </div>
      </div>
      <div className="py-4  border-y border-gray-300 flex items-center justify-between">
        <div className="flex text-sm items-center gap-3">
          <BoxIcon className="size-6" />
          <span>{total_items} items</span>
        </div>
        <div className="flex gap-2 items-center">
          <ClockIcon className="size-5" />
          <div className="flex flex-col gap-1 text-sm opacity-80">
            <span>Time</span>
            <span className="font-medium text-black text-[15px]">
              {formatTime(new Date(dateTime))}
            </span>
            <span>{formatDate(new Date(dateTime))}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-2 font-medium opacity-70 ">
        <span>Total amount:</span>
        <span className=" text-orange-600 font-semibold">
          {formatPriceToVND(total)}
        </span>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Link
          to={orderId}
          className="flex border font-medium text-[13px] border-gray-300 rounded-md w-full px-4 py-2 items-center gap-2 hover:opacity-80"
        >
          <EyeIcon className="size-4" />
          <span>Detail</span>
        </Link>
        <Link
          to={""}
          className="flex border font-medium text-[13px] border-gray-300 rounded-md w-full px-4 py-2 items-center gap-2 hover:opacity-80"
        >
          <EditIcon className="size-4" />
          <span>Edit Order</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
