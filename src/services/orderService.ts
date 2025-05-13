import httpRequest from '@/config/axios/axios.config';
import CreateOrderRequest from '@/interfaces/order/createOrderRequest.interface';
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

export const createOrder = async (createOrderRequest: CreateOrderRequest) => {
  try {
    const { data } = await httpRequest.post('/orders', createOrderRequest);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const payOrder = async (paymentObject: any) => {
  try {
    const { data } = await httpRequest.put(`/orders/pay-order/${paymentObject.tableId}`, paymentObject);
    return data;
  } catch (error) {
    console.log(error);
  }
};


