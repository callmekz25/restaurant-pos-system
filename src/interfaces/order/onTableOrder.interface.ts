import PaymentMethod from "@/enum/paymentMethod";
import OnTableOrderDetail from "./onTableOrderDetail.interface";

interface OnTableOrder {
  orderId: string;
  seatId: string;
  serverId: string;
  timeIn: Date;
  foods: OnTableOrderDetail[];
  note: string,
  discount: number;
  surcharge: number;
  paymentMethod: PaymentMethod;
  total: number;
}
export default OnTableOrder;
