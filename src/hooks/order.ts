import { getOrderByTableId, getOrders } from '@/services/orderService';
import { useQuery } from '@tanstack/react-query';

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
  });
};
