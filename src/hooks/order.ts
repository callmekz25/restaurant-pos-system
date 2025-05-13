import CreateOrderRequest from '@/interfaces/order/createOrderRequest.interface';
import OnTableOrder from '@/interfaces/order/onTableOrder.interface';
import {
  addFoodIntoOrder,
  createOrder,
  getOrderByTableId,
  getOrders,
  payOrder,
} from '@/services/orderService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
};

export const useGetOrderByTableId = (tableId: string) => {
  return useQuery({
    queryKey: ['orders', tableId],
    queryFn: () => getOrderByTableId(tableId),    
    enabled: !!tableId
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (createOrderRequest: CreateOrderRequest) => createOrder(createOrderRequest),
  });
};

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
