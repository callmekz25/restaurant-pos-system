import OnTableOrderDetail from "@/interfaces/order/onTableOrderDetail.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { EditIcon, Trash2Icon } from "lucide-react";
import { PlusIcon, MinusIcon } from "lucide-react";

const OrderItem = ({
  orderDetail,
  checkedItems,
  setCheckedItems,
}: OrderItemProps) => {
  return (
    <div className="bg-[#f8fbf8] shadow rounded p-3 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <input
            type="checkbox"
            name="food-list"
            id={orderDetail.foodId}
            checked={checkedItems[orderDetail.foodId]}
            onChange={(e) => {
              setCheckedItems({
                ...checkedItems,
                [orderDetail.foodId]: e.target.checked,
              });
            }}
          />
        </div>
        <div className="flex-5 flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold">{orderDetail.foodName}</h3>
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
        <div className="flex-2 flex flex-col gap-3 items-end">
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
  checkedItems: any;
  setCheckedItems: Function;
};

export default OrderItem;
