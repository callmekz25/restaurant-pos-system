interface IReservedTable {
  bookedSeatId: string;
  seatId: string;
  orderId: string;
  customerFullName: string;
  customerPhone: string;
  slots: number;
  bookedTime: Date;
  createdAt: Date;
}

export default IReservedTable
