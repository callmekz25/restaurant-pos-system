import OrderStatus from "@/enum/orderStatus";
import PaymentMethod from "@/enum/paymentMethod";

interface Order {
  orderId: string;
  seatId: string;
  cashierId: string;
  serverId: string;
  timeIn: Date;
  timeOut: Date;
  status: OrderStatus;
  note: string;
  discount: number;
  surcharge: number;
  paymentMethod: PaymentMethod;
  total: number;
  createdAt: Date;
}
export default Order;
