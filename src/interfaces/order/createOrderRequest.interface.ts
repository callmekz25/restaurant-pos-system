import OnTableOrderDetail from "./onTableOrderDetail.interface";

interface CreateOrderRequest {
  seatId: string;
  serverId: string;
  note: string;
  foods: OnTableOrderDetail[];
}
export default CreateOrderRequest;