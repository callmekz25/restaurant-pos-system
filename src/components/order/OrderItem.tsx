import OnTableOrderDetail from "@/interfaces/order/onTableOrderDetail.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { EditIcon, Trash2Icon } from "lucide-react";
import { PlusIcon, MinusIcon } from "lucide-react";

const OrderItem = ({ orderDetail }: OrderItemProps) => {
  return (
    <div className="bg-[#f8fbf8] shadow rounded p-3 flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold">{orderDetail.foodName} (L)</h3>
          {/* <span className="text-[13px] text-gray-500">+ Cheese x1</span>
          <span className="text-[13px] text-gray-500">+ Cheese x1</span> */}
          <p className="text-sm text-gray-500">Notes: {orderDetail.note}</p>
          <div className="flex items-center ">
            <button className="border border-gray-200 p-1 bg-[#f9f9f9] cursor-pointer hover:opacity-60">
              <MinusIcon className="size-4" />
            </button>
            <span className="border font-semibold border-gray-200 px-4 py-[2px] bg-white text-sm ">
              {orderDetail.amount}
            </span>
            <button className="border border-gray-200 p-1 bg-[#f9f9f9] cursor-pointer hover:opacity-60">
              <PlusIcon className="size-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <button className="text-gray-500 cursor-pointer hover:opacity-60">
              <EditIcon className="size-4" />
            </button>
            <button className="text-gray-500 cursor-pointer hover:opacity-60">
              <Trash2Icon className="size-4" />
            </button>
          </div>
          <span className="font-semibold text-sm">
            {formatPriceToVND(orderDetail.actualPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

type OrderItemProps = {
  orderDetail: OnTableOrderDetail;
};

export default OrderItem;
