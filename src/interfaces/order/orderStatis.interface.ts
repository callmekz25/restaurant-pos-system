import OrderStatus from "@/enum/orderStatus";
import PaymentMethod from "@/enum/paymentMethod";
import OnTableOrderDetail from "./onTableOrderDetail.interface";

interface OrderStatis {
  orderId: string;
  seatId: string;
  status: OrderStatus;
  serverName: string;
  cashierName: string;
  timeIn: Date;
  timeOut: Date;
  discount: number;
  foods: OnTableOrderDetail[];
  surcharge: number;
  paymentMethod: PaymentMethod;
  total: number;
}
export default OrderStatis;
