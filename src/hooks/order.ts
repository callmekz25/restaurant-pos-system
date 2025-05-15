import CreateOrderRequest from "@/interfaces/order/createOrderRequest.interface";
import {
  addFoodIntoOrder,
  createOrder,
  getOrderByOrderId,
  getOrderByTableId,
  getOrders,
  moveFoods,
  payOrder,
} from "@/services/orderService";
import { useMutation, useQuery } from "@tanstack/react-query";


// GET
export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

export const useGetOrderByTableId = (tableId: string) => {
  return useQuery({
    queryKey: ["order", tableId],
    queryFn: () => getOrderByTableId(tableId),
  });
};

export const useGetOrderByOrderId = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderByOrderId(orderId),
  });
};

// POST
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (createOrderRequest: CreateOrderRequest) =>
      createOrder(createOrderRequest),
  });
};

// PUT/PATCH
export const usePayOrder = () => {
  return useMutation({
    mutationFn: (paymentObject: any) => payOrder(paymentObject),
  });
};

export const useAddFood = () => {
  return useMutation({
    mutationFn: (addFoodObject: any) => addFoodIntoOrder(addFoodObject),
  });
};

export const useMoveFoods = () => {
  return useMutation({
    mutationFn: (MoveFoodsObject: any) => moveFoods(MoveFoodsObject),
  });
};
