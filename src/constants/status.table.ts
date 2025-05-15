import TableStatus from "@/enum/tableStatus";

const STATUS_TABLE = [
  {
    status: TableStatus.AVAILABLE,
    color: "#10b58b",
    isChecked: true,
  },
  {
    status: TableStatus.RESERVED,
    color: "#d94f51",
    isChecked: true,
  },
  {
    status: TableStatus.OCCUPIED,
    color: "#14a5df",
    isChecked: true,
  },
  {
    status: TableStatus.UNAVAILABLE,
    color: "#717075",
    isChecked: true,
  },
] as { status: TableStatus; color: string; isChecked: boolean }[];
export default STATUS_TABLE;
