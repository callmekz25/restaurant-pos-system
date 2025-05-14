import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetReservedTables } from "@/hooks/reservedTable";
import IReservedTable from "@/interfaces/table/reservedTable.interface";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";

const ReservedTable = () => {
  const {
    data: reservedTables,
    isLoading: isRTLoading,
    isError: isRTError,
  } = useGetReservedTables();

  if (isRTLoading) {
    return <Loading></Loading>;
  }

  console.log(reservedTables);

  return (
    <>
      <div className="px-2 mt-5  ">
        <div className="bg-white rounded-md p-4 h-full border">
          <h3 className="text-lg font-semibold">Create A Reservation</h3>
          <form className="flex flex-col mt-4 gap-5">
            <div className="flex justify-between items-center gap-5">
              <input
                type="text"
                className="p-2 flex-4 border-b-2"
                placeholder="Customer Name"
                name="customerFullName"
              ></input>
              <input
                type="text"
                className="p-2 flex-3 border-b-2"
                placeholder="Customer Phone"
                name="customerPhone"
              ></input>
              <input
                type="number"
                className="p-2 flex-1 border-b-2"
                placeholder="Customer Slots"
                name="customerPhone"
              ></input>
            </div>
            <div className="flex justify-baseline items-center gap-5">
              <input
                type="datetime-local"
                className="p-2 border-b-2"
                placeholder="Reserved Time"
                name="customerFullName"
              ></input>
              <input
                type="text"
                className="p-2"
                placeholder=""
                name="customerPhone"
                hidden={true}
              ></input>
              <Select defaultValue="">
                <SelectTrigger className="border border-gray-300 rounded outline-none shadow-none font-medium text-black min-w-[100px]">
                  <SelectValue placeholder="Choose table" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"1"}>{"1"}</SelectItem>
                  <hr></hr>
                  <SelectItem value={"test"}>See more details ...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end items-center mt-5">
              <button className="mr-10 py-2 px-4 bg-gray-300 rounded-2xl cursor-pointer hover:opacity-80">
                Clear
              </button>
              <button className="py-2 px-4 bg-green-600 rounded-2xl cursor-pointer hover:opacity-80">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="px-2 mt-10">
        <div className="bg-white rounded-md p-4 h-full border">
          <h3 className="text-lg font-semibold">Table Reservation Histories</h3>
          <div className="flex flex-col mt-4 gap-4">
            <div className="flex justify-between">
              <div className="flex-1 font-bold">Time</div>
              <div className="flex-1 font-bold">Date</div>
              <div className="flex-1 font-bold">Name</div>
              <div className="flex-1 font-bold">Phone Number</div>
              <div className="flex-1 font-bold">Slots</div>
              <div className="flex-1 font-bold">Table</div>
              <div className="flex-1"></div>
            </div>
            <hr className="mb-5"></hr>
            {reservedTables.map((reservedTable: IReservedTable) => (
              <div className="flex justify-between">
                <div className="flex-1">
                  <span className="py-2 px-4 outline-1 outline-red-400 text-red-400">
                    {formatTime(new Date(reservedTable.bookedTime))}
                  </span>
                </div>
                <div className="flex-1">
                  {new Date(reservedTable.bookedTime) == new Date() ? (
                    <span className="py-2 px-4 bg-red-400 rounded-4xl">
                      Today
                    </span>
                  ) : (
                    <span className="py-2 px-4 bg-gray-400 rounded-4xl">
                      {formatDate(new Date(reservedTable.bookedTime))}
                    </span>
                  )}
                </div>
                <div className="flex-1">{reservedTable.customerFullName}</div>
                <div className="flex-1">{reservedTable.customerPhone}</div>
                <div className="flex-1">{reservedTable.slots}</div>
                <div className="flex-1">
                  {reservedTable.seatId ?? "No picked table"}
                </div>
                <div className="flex-1">
                  <button className="cursor-pointer bg-blue-500 px-3 py-1 rounded-2xl hover:opacity-80">
                    View detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservedTable;
