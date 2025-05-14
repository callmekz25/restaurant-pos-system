interface ReservedTable {
  bookedSeatId: string;
  seatId: string;
  orderId: string;
  customerFullName: string;
  customerPhone: string;
  bookedTime: Date;
  createdAt: Date;
}

export default ReservedTable
