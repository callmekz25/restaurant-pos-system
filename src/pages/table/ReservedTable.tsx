import Loading from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetReservedTables } from "@/hooks/reservedTable";
import { useCreateReservedTable, useGetReservableTables } from "@/hooks/table";
import IReservedTable from "@/interfaces/table/reservedTable.interface";
import toDatetimeLocalString from "@/utils/toDatetimeLocalString";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import { useQueryClient } from "@tanstack/react-query";
import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ITable from "@/interfaces/table/table.interface";
import { Link } from "react-router-dom";
import { Check, MoreHorizontal, X } from "lucide-react";

const ReservedTable = () => {
  // Params
  const initReservedTable = {
    bookedSeatId: "",
    customerFullName: "",
    orderId: "",
    customerPhone: "",
    seatId: "",
    bookedTime: toDatetimeLocalString(new Date()),
    createdAt: undefined,
    slots: 0,
  };

  const queryClient = useQueryClient();

  // States
  const [reservedTable, setReservedTable] =
    useState<IReservedTable>(initReservedTable);

  // useQuery
  const {
    data: reservedTables,
    isLoading: isRTLoading,
    isError: isRTError,
  } = useGetReservedTables();

  const {
    data: reservableTables,
    isLoading: isRableTLoading,
    isError: isRableTError,
  } = useGetReservableTables({
    resersedDate: reservedTable.bookedTime,
    slots: reservedTable.slots,
  });

  // useMutation
  const { mutate: createReservedTable } = useCreateReservedTable();

  // useEffect
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["reservable-tables"],
    });
  }, [reservedTable]);

  if (isRTLoading) {
    return <Loading></Loading>;
  }

  const processCreateRT = (requestData: IReservedTable) => {
    createReservedTable(requestData, {
      onSuccess: () => {
        toast.success("Create reserved table successfully !!!");
        queryClient.invalidateQueries({
          queryKey: ["reserved-tables"],
        });
        setReservedTable(initReservedTable);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Create reserved table fail !!!");
      },
    });
  };

  return (
    <>
      <div className="px-2 mt-5  ">
        <div className="bg-white rounded-md p-4 h-full border">
          <h3 className="text-lg font-semibold">Create A Reservation</h3>
          <div className="flex flex-col mt-4 gap-5">
            <div className="flex justify-between items-center gap-5">
              <input
                type="text"
                className="p-2 flex-4 border-b-2"
                placeholder="Customer Name"
                value={reservedTable.customerFullName}
                onChange={(e) =>
                  setReservedTable({
                    ...reservedTable,
                    customerFullName: e.target.value,
                  })
                }
              ></input>
              <input
                type="text"
                className="p-2 flex-3 border-b-2"
                placeholder="Customer Phone"
                value={reservedTable.customerPhone}
                onChange={(e) =>
                  setReservedTable({
                    ...reservedTable,
                    customerPhone: e.target.value,
                  })
                }
              ></input>
              <input
                type="number"
                className="p-2 flex-1 border-b-2"
                placeholder="Customer Slots"
                value={reservedTable.slots}
                onChange={(e) =>
                  setReservedTable({
                    ...reservedTable,
                    slots: Number(e.target.value),
                  })
                }
              ></input>
            </div>
            <div className="flex justify-baseline items-center gap-5">
              <input
                type="datetime-local"
                className="p-2 border-b-2"
                placeholder="Reserved Time"
                value={toDatetimeLocalString(
                  new Date(reservedTable.bookedTime!)
                )}
                onChange={(e) => {
                  setReservedTable({
                    ...reservedTable,
                    bookedTime: e.target.value,
                  });
                }}
              ></input>
              <Select
                defaultValue=""
                onValueChange={(value) =>
                  setReservedTable({ ...reservedTable, seatId: value })
                }
              >
                <SelectTrigger className="border border-gray-300 rounded outline-none shadow-none font-medium text-black min-w-[100px]">
                  <SelectValue placeholder="Choose table ..." />
                </SelectTrigger>
                <SelectContent>
                  {reservableTables != undefined
                    ? reservableTables.map((rT: ITable) => (
                        <SelectItem value={rT.seatId}>{rT.seatId}</SelectItem>
                      ))
                    : ""}
                  <hr></hr>
                  <SelectItem value={"test"}>See more details ...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end items-center mt-5">
              <button
                className="mr-10 py-2 px-4 bg-gray-300 rounded-2xl cursor-pointer hover:opacity-80"
                onClick={() => setReservedTable(initReservedTable)}
              >
                Clear
              </button>
              <button
                className="py-2 px-4 bg-green-600 rounded-2xl cursor-pointer hover:opacity-80"
                onClick={() => processCreateRT(reservedTable)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RESERVED TABLE HISTORIES  */}
      <div className="px-2 mt-10">
        <div className="bg-white rounded-md p-4 h-full border">
          <h3 className="text-lg font-semibold">Table Reservation Histories</h3>
          <div className="flex flex-col mt-4 gap-5">
            {/* TITLE ROW  */}
            <div className="flex justify-between items-center border-b-2 py-2 px-4">
              <div className="flex-2 font-bold">Time</div>
              <div className="flex-2 font-bold">Date</div>
              <div className="flex-2 font-bold">Name</div>
              <div className="flex-2 font-bold">Phone Number</div>
              <div className="flex-1 font-bold">Slots</div>
              <div className="flex-2 font-bold">Table</div>
              <div className="flex-2 font-bold">Is Visited</div>
              <div className="flex-1"></div>
            </div>
            {reservedTables.map((rt: IReservedTable) => (
              <div className="flex justify-between items-center px-2 py-4 hover:opacity-90 hover:bg-gray-200">
                <div className="flex-2">
                  <span className="py-2 px-4 outline-1 outline-red-400 text-red-400">
                    {formatTime(new Date(rt.bookedTime!))}
                  </span>
                </div>
                <div className="flex-2">
                  {new Date(rt.bookedTime!).getDate() ==
                  new Date().getDate() ? (
                    <span className="py-2 px-4 bg-red-400 rounded-4xl">
                      Today
                    </span>
                  ) : (
                    <span
                      className={`py-2 px-4 rounded-4xl ${
                        new Date(rt.bookedTime).getDate() ==
                        new Date().getDate() + 1
                          ? "bg-yellow-300"
                          : "bg-gray-400"
                      }`}
                    >
                      {formatDate(new Date(rt.bookedTime!))}
                    </span>
                  )}
                </div>
                <div className="flex-2">{rt.customerFullName}</div>
                <div className="flex-2">{rt.customerPhone}</div>
                <div className="flex-1">{rt.slots}</div>
                <div className="flex-2">
                  {rt.seatId.length != 0 ? rt.seatId : "No picked table"}
                </div>
                <div className="flex-2">
                  {rt.orderId == undefined || rt.orderId.length == 0 ? (
                    <div className="flex gap-2">
                      <span>Not yet</span>
                      <X className="" color="red"></X>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <span>Yes</span>
                      <Check className="" color="green"></Check>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <button className="cursor-pointer px-3 py-1 rounded-2xl hover:opacity-80 hover:bg-gray-400">
                    <MoreHorizontal></MoreHorizontal>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ReservedTable;
