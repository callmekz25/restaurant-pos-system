import { ShoppingCartIcon, PlusIcon, MinusIcon } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import Food from '@/interfaces/food/food.interface';
const ProductCard = ({ food }: ProductCardProps) => {
  return (
    <div className=" rounded-md overflow-hidden border border-gray-200 shadow flex flex-col flex-1">
      <img
        src={food.foodImage}
        alt=""
        className=" object-cover aspect-[5.5/5]"
      />
      <div className="bg-white p-3">
        <h3 className="text-md font-medium line-clamp-1">{food.foodName}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className=" font-medium text-sm">
            {food.price.toLocaleString()} vnd
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex text-[13px] font-medium items-center gap-2 rounded border border-gray-300 py-1.5 px-2">
                <ShoppingCartIcon className="size-4" />
                <span>Add</span>
              </button>
            </DialogTrigger>
            <DialogTitle className="hidden"></DialogTitle>
            <DialogContent className=" outline-none rounded px-5 py-5 flex  max-w-full min-w-[800px] max-h-[450px]">
              <DialogDescription className="hidden"></DialogDescription>
              <div className="flex-[0_0_50%]">
                <img
                  src={food.foodImage}
                  className=" w-full max-w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="flex-[0_0_50%] ml-3 max-w-[50%] pr-5">
                <h3 className="text-2xl font-semibold">{food.foodName}</h3>
                <p className="mt-3 font-normal text-lg">
                  Price:{' '}
                  <span className="font-semibold">
                    {food.price.toLocaleString()} vnd
                  </span>
                </p>
                <div className="flex flex-col mt-6 gap-4">
                  {/* Variants */}
                  <div className="flex items-center gap-6">
                    <p className=" text-sm">Size:</p>
                    <div className="flex items-center text-sm gap-3">
                      <button className="px-3.5 py-1.5 border border-gray-300 rounded text-black font-medium">
                        S
                      </button>
                      <button className="px-3.5 py-1.5 border border-gray-300 rounded text-black font-medium">
                        M
                      </button>
                      <button className="px-3.5 py-1.5 border border-gray-300 rounded text-black font-medium">
                        L
                      </button>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-5">
                    <p className=" text-sm">Toppings:</p>
                    <div className="flex items-center gap-3 text-sm">
                      <label
                        htmlFor="fish"
                        className="px-3.5 py-1.5 border border-gray-300 rounded text-black font-medium"
                      >
                        Fish
                        <input type="checkbox" id="fish" className="hidden" />
                      </label>
                      <label
                        htmlFor="cheese"
                        className="px-3.5 py-1.5 border border-gray-300 rounded text-black font-medium"
                      >
                        Cheese
                        <input type="checkbox" id="cheese" className="hidden" />
                      </label>
                    </div>
                  </div> */}
                  <div className="flex text-sm items-center gap-5">
                    <span>Số lượng:</span>
                    <div className="flex items-center ">
                      <button className="border border-gray-200 p-2  bg-[#f9f9f9]">
                        <MinusIcon className="size-4" />
                      </button>
                      <span className="border font-semibold border-gray-200 px-4 py-1.5 text-sm ">
                        1
                      </span>
                      <button className="border border-gray-200 p-2  bg-[#f9f9f9]">
                        <PlusIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex text-sm items-start gap-5">
                    <label htmlFor="note">Ghi chú:</label>
                    <textarea
                      name="note"
                      placeholder="Thêm ghi chú cho món này"
                      className=" text-[13px] outline-none rounded placeholder:text-[13px] border border-gray-200 py-2 px-2  flex-1 resize-none min-h-[100px]"
                      id="note"
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center text-[13px] justify-end font-medium  gap-5 mt-5">
                  <button className="border border-gray-300 px-4 py-1.5 rounded">
                    Huỷ
                  </button>
                  <button className="bg-[#ebc01c] px-3 py-2 rounded">
                    Thêm vào đơn
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

type ProductCardProps = {
  food: Food;
};

export default ProductCard;
