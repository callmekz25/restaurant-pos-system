import Carousel from '@/components/ui/carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '@/components/ui/productCard';
import { PenBoxIcon } from 'lucide-react';
import ITable from '@/interfaces/table/table.interface';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import Table from '@/components/table/Table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import OrderItem from '@/components/order/OrderItem';
import { useEffect, useState } from 'react';
import STATUS_TABLE from '@/constants/status.table';
import { useGetTables } from '@/hooks/table';
import Loading from '@/components/ui/loading';
import { useParams } from 'react-router-dom';
import { useCreateOrder, useGetOrderByTableId } from '@/hooks/order';
import OnTableOrder from '@/interfaces/order/onTableOrder.interface';
import { useGetFoods } from '@/hooks/food';
import Food from '@/interfaces/food/food.interface';
import FoodType from '@/interfaces/food/foodType.interface';
import { useGetFoodTypes } from '@/hooks/foodType';
import OnTableOrderDetail from '@/interfaces/order/onTableOrderDetail.interface';
import PaymentMethod from '@/enum/paymentMethod';

const Order = () => {
  const { tableId } = useParams();
  const [noteWriting, setNoteWriting] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [order, setOrder] = useState<OnTableOrder>({
    orderId: '',
    seatId: tableId ?? '',
    serverId: 'EMP001',
    timeIn: new Date(),
    foods: [] as OnTableOrderDetail[],
    discount: 0,
    surcharge: 0,
    paymentMethod: PaymentMethod.CASH,
    total: 0,
  });

  const { mutate: createOrder, isPending } = useCreateOrder();

  const {
    data: foodsData,
    isLoading: isFoodLoading,
    error: foodError,
  } = useGetFoods();

  const {
    data: foodTypesData,
    isLoading: isFoodTypeLoading,
    error: foodTypeError,
  } = useGetFoodTypes();

  const foods = foodsData as Food[];
  const foodTypes = foodTypesData as FoodType[];

  const {
    data: orderData,
    isLoading: isODLoading,
    error: orderDetailError,
  } = useGetOrderByTableId(tableId ?? '');

  useEffect(() => {
    if (orderData != undefined) {
      setOrder(orderData);
    }
  }, [orderData]);

  // if(isODLoading)
  //   return <Loading />;

  if (isFoodLoading || isFoodTypeLoading) {
    return <Loading />;
  }

  // Ham them/chon food vao order
  const addFood = (od: OnTableOrderDetail) => {
    let isNew = true;

    order.foods.forEach((food) => {
      if (
        food.foodId == od.foodId &&
        food.variantId == od.variantId &&
        food.note == od.note
      ) {
        setOrder(() => ({
          ...order,
          foods: order.foods.map((myFood) =>
            myFood.foodId == food.foodId
              ? { ...myFood, amount: myFood.amount + od.amount }
              : myFood
          ),
        }));
        isNew = false;
      }
    });

    if (isNew)
      setOrder(() => ({
        ...order,
        foods: [...order?.foods, od],
      }));
  };

  // Ham xu ly dat mon
  const processOrder = (order: OnTableOrder) => {
    createOrder(order, {
      onSuccess: () => console.log(order),
    });
  };

  return (
    <div className="flex flex-col ">
      <div className="flex gap-5">
        <div className="flex-[0_0_70%] max-w-[70%] ">
          {/* CATEGORIES  */}
          <Carousel foodTypes={foodTypes} />
          <div className="mt-4">
            <div className="flex items-center  justify-between">
              <h3 className="text-lg font-medium">Food List</h3>
              <span>{foods.length} items</span>
            </div>
            {/* FOODs PICKER */}
            <div className="grid grid-cols-4 gap-4  mt-4 overflow-y-auto max-h-[90vh] pr-1">
              {foods.map((food) => (
                <ProductCard
                  key={food.foodId}
                  food={food}
                  onAddToCart={addFood}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Order */}
        <div className="flex-[0_0_30%] max-w-[30%] ">
          <div className="bg-white rounded-lg p-4  ">
            <h3 className="text-xl font-medium">Table {tableId}</h3>
            <div className=" border-b border-gray-300 py-4 flex flex-col gap-3 ">
              <div className="max-h-[400px] overflow-y-auto flex flex-col gap-3 pr-1">
                {order?.foods.map((food) => (
                  <OrderItem orderDetail={food} />
                ))}
              </div>
              {/* <div className="border-b border-gray-300 py-4">
                <p className="text-center">Chưa chọn món</p>
              </div> */}
              <div className="bg-[#f8fbf8] shadow rounded p-3 mt-2 flex flex-col">
                {/* ORDER NOTE  */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                  <span className="text-md font-medium">Order notes</span>
                  <button
                    onClick={() => setNoteWriting(!noteWriting)}
                    className="cursor-pointer hover:opacity-60"
                  >
                    <PenBoxIcon className="size-5" />
                  </button>
                </div>
                {!noteWriting ? (
                  <p className="text-[13px] mt-2 text-gray-500">
                    {note == '' ? 'Chưa có ghi chú nào' : note}
                  </p>
                ) : (
                  <textarea
                    name=""
                    className="outline-none border border-gray-300 rounded p-2 resize-none mt-2 text-[13px] placeholder:text-[13px] min-h-[80px] transition-all duration-300 focus:border-blue-600"
                    placeholder="Thêm ghi chú cho đơn hàng..."
                    id="note"
                    defaultValue={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                )}
              </div>
              <div className="bg-[#f8fbf8] shadow rounded p-3 mt-2 flex flex-col">
                {/* <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                  <span className="text-md font-medium">Order method</span>
                  <Select defaultValue="dinein">
                    <SelectTrigger className="border border-gray-300 rounded outline-none shadow-none font-medium text-black min-w-[100px]">
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dinein">Dine in</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="takeaway">Take away</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                {/* <div className="flex items-center justify-between mt-2 px-2 text-sm">
                  <p className="font-medium">
                    Số bàn: <span className=" font-normal">Chưa chọn</span>
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button>
                        <PenBoxIcon className="size-4" />
                      </button>
                    </DialogTrigger>
                    <DialogTitle className="hidden"></DialogTitle>
                    <DialogContent className=" outline-none rounded px-5 py-5 flex flex-col  max-w-full min-w-[65%] max-h-[650px]">
                      <DialogDescription className="hidden"></DialogDescription>
                      <h3 className="text-xl font-semibold">Chọn bàn</h3>
                      <div className="flex items-center gap-10">
                        {STATUS_TABLE.map((st) => {
                          return (
                            <div
                              key={st.status}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="size-3 rounded-full"
                                style={{ backgroundColor: `${st.color}` }}
                              ></div>
                              <span className="text-sm opacity-70">
                                {st.status}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-wrap gap-8">
                        {tables &&
                          tables.map((table: ITable) => {
                            return (
                              <Table
                                key={table.seatId}
                                tableId={table.seatId}
                                numberOfSeats={table.numberOfSeat}
                                numberOfTable={table.seatId}
                                status={table.seatStatus}
                              />
                            );
                          })}
                      </div>
                      <div className="flex items-center text-sm justify-end gap-5">
                        <button className="px-4 py-1.5 border border-gray-300 rounded">
                          Huỷ
                        </button>
                        <button className="px-4 py-2 bg-red-800 text-white rounded">
                          Chọn
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-md">
              <div className="flex items-center justify-between">
                <span>SURCHARGE: </span>
                <span>{order!.surcharge.toLocaleString()} vnd</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount: </span>
                <span>{order!.discount * 100}%</span>
              </div>
              <div className="flex font-medium text-lg items-center justify-between">
                <span>Total: </span>
                <span>{order!.total.toLocaleString()} vnd</span>
              </div>
            </div>
            <button
              className="bg-[#ebc01c] py-2 text-black font-medium w-full rounded mt-4 cursor-pointer hover:opacity-60"
              onClick={() => processOrder(order)}
            >
              Process Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
