import httpRequest from '@/config/axios/axios.config';
import OnTableOrder from '@/interfaces/order/onTableOrder.interface';

export const getOrders = async () => {
  try {
    const { data } = await httpRequest.get('/orders/get-orders');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByTableId = async (tableId: string) => {
  try {
    const { data } = await httpRequest.get(`/orders/get-by-seat-id/${tableId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (order: OnTableOrder) => {
  try {
    const { data } = await httpRequest.post('/orders', order);
    return data;
  } catch (error) {
    console.log(error);
  }
};
