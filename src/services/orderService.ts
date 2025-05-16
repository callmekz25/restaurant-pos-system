import httpRequest from "@/config/axios/axios.config";
import CreateOrderRequest from "@/interfaces/order/createOrderRequest.interface";

// GET
export const getOrders = async () => {
  try {
    const { data } = await httpRequest.get("/orders/get-orders");
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

export const getOrderByOrderId = async (orderId: string) => {
  try {
    const { data } = await httpRequest.get(
      `/orders/get-by-order-id/${orderId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
// POST
export const createOrder = async (createOrderRequest: CreateOrderRequest) => {
  try {
    const { data } = await httpRequest.post("/orders", createOrderRequest);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// PUT/PATCH
export const addFoodIntoOrder = async (addFoodObject: any) => {
  try {
    const { data } = await httpRequest.post(
      `/orders/add-food/${addFoodObject.tableId}`,
      addFoodObject.food
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const payOrder = async (paymentObject: any) => {
  try {
    const { data } = await httpRequest.put(
      `/orders/pay-order/${paymentObject.tableId}`,
      paymentObject
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const moveFoods = async (MoveFoodsObject: any) => {
  try {
    const { data } = await httpRequest.put(
      `/orders/move-foods/${MoveFoodsObject.tableId}`,
      MoveFoodsObject.requestData
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
