import httpRequest from '@/config/axios/axios.config';

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
