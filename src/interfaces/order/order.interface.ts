import OrderStatus from "@/enum/orderStatus";
import PaymentMethod from "@/enum/paymentMethod";

interface Order {
  orderId: string;
  seatId: string;
  cashierId: string;
  timeIn: Date;
  timeOut: Date;
  status: OrderStatus;
  discount: number;
  surcharge: number;
  paymentMethod: PaymentMethod;
  total: number;
  createdAt: Date;
}
export default Order;
