import { EditIcon, Trash2Icon } from "lucide-react";
import { PlusIcon, MinusIcon } from "lucide-react";
const OrderItem = () => {
  return (
    <div className="bg-[#f8fbf8] shadow rounded p-3 flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold">Pizza hải sản (L)</h3>
          <span className="text-[13px] text-gray-500">+ Cheese x1</span>
          <span className="text-[13px] text-gray-500">+ Cheese x1</span>
          <p className="text-sm text-gray-500">Notes: Ít cay</p>
          <div className="flex items-center ">
            <button className="border border-gray-200 p-1 bg-white  bg-[#f9f9f9]">
              <MinusIcon className="size-4" />
            </button>
            <span className="border font-semibold border-gray-200 px-4 py-[2px] bg-white text-sm ">
              1
            </span>
            <button className="border border-gray-200 p-1 bg-white  bg-[#f9f9f9]">
              <PlusIcon className="size-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <button className="text-gray-500">
              <EditIcon className="size-4" />
            </button>
            <button className="text-gray-500">
              <Trash2Icon className="size-4" />
            </button>
          </div>
          <span className="font-semibold text-sm">120.000d</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
