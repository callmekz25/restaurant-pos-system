import CategoryCarousel from "@/components/ui/categoryCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "@/components/ui/productCard";
import { PenBoxIcon } from "lucide-react";
import ITable from "@/interfaces/table/table.interface";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import Table from "@/components/table/Table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderItem from "@/components/order/OrderItem";
import { useEffect, useState } from "react";
import STATUS_TABLE from "@/constants/status.table";
import { useGetTables } from "@/hooks/table";
import Loading from "@/components/ui/loading";
import { useParams } from "react-router-dom";
import {
  useAddFood,
  useCreateOrder,
  useGetOrderByTableId,
  useMoveFoods,
  usePayOrder,
} from "@/hooks/order";
import OnTableOrder from "@/interfaces/order/onTableOrder.interface";
import { useGetFoods } from "@/hooks/food";
import Food from "@/interfaces/food/food.interface";
import FoodType from "@/interfaces/food/foodType.interface";
import { useGetFoodTypes } from "@/hooks/foodType";
import OnTableOrderDetail from "@/interfaces/order/onTableOrderDetail.interface";
import PaymentMethod from "@/enum/paymentMethod";
import CreateOrderRequest from "@/interfaces/order/createOrderRequest.interface";
import formatPriceToVND from "@/utils/formatPriceToVND";
import { ToastContainer, toast } from "react-toastify";
import TableStatus from "@/enum/tableStatus";
import { useQueryClient } from "@tanstack/react-query";
import OrderStatus from "@/enum/orderStatus";

const Order = () => {
  // useParam
  const { tableId } = useParams();

  // useMutate
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { mutate: payOrder, isPending: isPayPending } = usePayOrder();
  const { mutate: addFoodIntoOrder, isPending: isAddFoodPending } =
    useAddFood();
  const { mutate: moveFoods, isPending: isMoveFoodsPending } = useMoveFoods();

  // useQuery
  const {
    data: foods,
    isLoading: isFoodLoading,
    error: foodError,
  } = useGetFoods();

  const {
    data: foodTypes,
    isLoading: isFoodTypeLoading,
    error: foodTypeError,
  } = useGetFoodTypes();

  const {
    data: tables,
    isLoading: isTablesLoading,
    error: tableError,
  } = useGetTables([TableStatus.AVAILABLE]);

  const {
    data: orderData,
    isLoading: isODLoading,
    error: orderDetailError,
  } = useGetOrderByTableId(tableId!);

  // Params
  const emptyOrder = {
    orderId: "",
    seatId: tableId ?? "",
    serverId: "EMP001",
    timeIn: new Date(),
    foods: [] as OnTableOrderDetail[],
    note: "",
    discount: 0,
    surcharge: 0,
    paymentMethod: PaymentMethod.CASH,
    total: 0,
  } as OnTableOrder;

  const queryClient = useQueryClient();

  // States
  const [noteWriting, setNoteWriting] = useState<boolean>(false);
  const [order, setOrder] = useState<OnTableOrder>(emptyOrder);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  // useEffect

  useEffect(() => {
    if (orderData != undefined) {
      setOrder(orderData);

      if (Object.keys(checkedItems).length == 0) {
        let myFoods = orderData.foods as Food[];
        let myCheckedItems: { [key: string]: boolean } = {};

        myFoods.forEach((food) => (myCheckedItems[food.foodId] = false));
        setCheckedItems(myCheckedItems);
      }
    }
  }, [orderData]);

  // useEffect(() => {
  //   queryClient.invalidateQueries({
  //     queryKey: ["tables", "ALL"],
  //   });

  //   queryClient.invalidateQueries({
  //     queryKey: ["tables", "AVAILABLE"],
  //   });

  //   console.log(order);
  // }, [order]);

  // Init code
  if (isFoodLoading || isFoodTypeLoading || isTablesLoading) {
    return <Loading />;
  }

  // Handler Functions

  // Ham them/chon food vao order
  const processAddFood = (od: OnTableOrderDetail) => {
    let isNew = true;

    // Kiem tra xem da ton tai mon y chang chua (bao gom note + variant)
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

    // Neu san pham do chua ton tai
    if (isNew) {
      setOrder(() => ({
        ...order,
        foods: [...order?.foods, od],
      }));

      setCheckedItems({
        ...checkedItems,
        [od.foodId]: false,
      });
    }

    // Neu don order da ton tai
    if (order.orderId != "") {
      addFoodIntoOrder(
        {
          tableId: tableId,
          food: od,
        },
        {
          onSuccess: () => {
            toast.success("Add food successfully !!");
          },
        }
      );
    }
  };

  // Ham di chuyen foods sang 1 ban khac
  const processMoveFoods = (changeTableId: string) => {
    let foods: [{ foodId: string }?] = [];

    Object.keys(checkedItems).forEach((foodId) => {
      if (checkedItems[foodId]) {
        const currentFood = order.foods.find((food) => food.foodId == foodId);
        foods.push(currentFood);

        setOrder(() => ({
          ...order,
          foods: order.foods.filter((food) => food.foodId != foodId),
        }));
      }
    });

    moveFoods(
      {
        tableId: tableId,
        requestData: {
          foods: foods,
          changedSeatId: changeTableId,
          serverId: "EMP001",
        },
      },
      {
        onSuccess: () => {
          toast.success("Move foods successfully !!!");
        },
        onError: () => toast.error("Move foods fail !!!"),
      }
    );
  };

  // Ham xu ly dat mon
  const processOrder = (order: OnTableOrder) => {
    if (order.foods.length == 0) {
      toast.error("You must choose at least one food");
      return;
    }

    const requestData = {
      seatId: tableId,
      serverId: order.serverId,
      note: order.note,
      foods: order.foods,
    } as CreateOrderRequest;

    createOrder(requestData, {
      onSuccess: (data) => {
        setOrder(data);
        toast.success("Order has been created!");

        // fetch lai so ban dang ko co khach
        queryClient.invalidateQueries({
          queryKey: ["tables", [TableStatus.AVAILABLE]],
        });

        // fetch lai toan bo ban
        queryClient.invalidateQueries({
          queryKey: ["tables", ...STATUS_TABLE.map((table) => table.status)],
        });
      },
      onError: (error) => {
        console.log(error);
        toast.error("This table is occupied");
      },
    });
  };

  // Ham xu ly thanh toan
  const processPayment = (tableId: string) => {
    payOrder(
      {
        tableId: tableId,
        cashierId: "EMP001",
        discount: 0.2,
        surcharge: 20000,
        paymentMethod: 0,
      },
      {
        onSuccess: () => {
          setOrder(emptyOrder);
          setCheckedItems({});
          toast.success("Payment successfull");
          queryClient.invalidateQueries({
            queryKey: ["tables", STATUS_TABLE.map((table) => table.status)],
          });

          queryClient.invalidateQueries({
            queryKey: ["order", tableId],
          });
        },
        onError: () => toast.error("Payment fail"),
      }
    );
  };

  const processSelectAll = (isChecked: boolean) => {
    let newCheckedItems: { [key: string]: boolean } = {};

    Object.keys(checkedItems).forEach(
      (foodId) => (newCheckedItems[foodId] = isChecked)
    );

    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex gap-5">
        <div className="flex-[0_0_70%] max-w-[70%] ">
          {/* CATEGORIES  */}
          <CategoryCarousel foodTypes={foodTypes} />
          <div className="mt-4">
            <div className="flex items-center  justify-between">
              <h3 className="text-lg font-medium">Food List</h3>
              <span>{foods.length} items</span>
            </div>
            {/* FOODs PICKER */}
            <div className="grid grid-cols-4 gap-4  mt-4 overflow-y-auto max-h-[90vh] pr-1">
              {foods.map((food: Food) => (
                <ProductCard
                  key={food.foodId}
                  food={food}
                  onAddToCart={processAddFood}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Order */}
        <div className="flex-[0_0_30%] max-w-[30%] ">
          <div className="bg-white rounded-lg p-4  ">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Table {tableId}</h3>
            </div>
            <div className="border-b border-gray-300 py-4 flex flex-col gap-3 ">
              <div className="flex justify-between items-center">
                <div>
                  <input
                    type="checkbox"
                    name="selectAllFood"
                    id="select_all_food"
                    onChange={(e) => processSelectAll(e.target.checked)}
                    checked={
                      !Object.values(checkedItems).includes(false) &&
                      Object.keys(checkedItems).length != 0
                    }
                  />
                  <label htmlFor="select_all_food" className="ml-4">
                    Select all
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <Select
                    defaultValue=""
                    disabled={!Object.values(checkedItems).includes(true)}
                    onValueChange={(value) => processMoveFoods(value)}
                  >
                    <SelectTrigger className="border border-gray-300 rounded outline-none shadow-none font-medium text-black min-w-[100px]">
                      <SelectValue placeholder="Move to ..." />
                    </SelectTrigger>
                    <SelectContent>
                      {tables.map((table: ITable) => (
                        <SelectItem value={table.seatId}>
                          {table.seatId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="max-h-[400px] overflow-y-auto flex flex-col gap-3 pr-1">
                {order?.foods.map((food) => (
                  <OrderItem
                    orderDetail={food}
                    checkedItems={checkedItems}
                    setCheckedItems={setCheckedItems}
                  />
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
                    {order.note == "" ? "Chưa có ghi chú nào" : order.note}
                  </p>
                ) : (
                  <textarea
                    name=""
                    className="outline-none border border-gray-300 rounded p-2 resize-none mt-2 text-[13px] placeholder:text-[13px] min-h-[80px] transition-all duration-300 focus:border-blue-600"
                    placeholder="Thêm ghi chú cho đơn hàng..."
                    id="note"
                    defaultValue={order.note}
                    value={order.note}
                    onChange={(e) =>
                      setOrder({ ...order, note: e.target.value })
                    }
                  ></textarea>
                )}
              </div>
              <div className="bg-[#f8fbf8] shadow rounded p-3 mt-2 flex flex-col">
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
                <span>{formatPriceToVND(order!.total)}</span>
              </div>
            </div>
            {order.orderId == "" ? (
              <button
                className="bg-[#ebc01c] py-2 text-black font-medium w-full rounded mt-4 cursor-pointer hover:opacity-60"
                onClick={() => processOrder(order)}
              >
                Process Order
              </button>
            ) : (
              <button
                className="bg-[#ebc01c] py-2 text-black font-medium w-full rounded mt-4 cursor-pointer hover:opacity-60"
                onClick={() => processPayment(tableId!)}
              >
                Pay Order
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Order;
