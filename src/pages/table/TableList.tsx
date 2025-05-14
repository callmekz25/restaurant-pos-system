import Table from "@/components/table/Table";
import Loading from "@/components/ui/loading";
import STATUS_TABLE from "@/constants/status.table";
import OrderStatus from "@/enum/orderStatus";
import TableStatus from "@/enum/tableStatus";
import { useGetTables } from "@/hooks/table";
import ITable from "@/interfaces/table/table.interface";
import { useEffect, useState } from "react";
const TableList = () => {
  // States
  const [tables, setTables] =
    useState<{ status: TableStatus; color: string; isChecked: boolean }[]>(
      STATUS_TABLE
    );

  // useQuery
  const {
    data: tablesData,
    isLoading,
    error,
  } = useGetTables(tables.filter((table) => table.isChecked));

  // useEffect

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl  font-semibold">Tables</h3>
        <div>
          <button className="bg-red-500 py-2 px-4 rounded-2xl hover:opacity-80 cursor-pointer">
            Đặt bàn
          </button>
        </div>
        <div className="flex items-center gap-10">
          {tables.map((st) => {
            return (
              <button
                key={st.status}
                className={`flex items-center gap-2 py-2 px-4 rounded-2xl cursor-pointer hover:opacity-80 ${
                  st.isChecked ? "bg-gray-200" : " hover:bg-gray-200"
                }`}
                onClick={() => {
                  setTables(() =>
                    tables.map((table) =>
                      table.status == st.status
                        ? { ...table, isChecked: !st.isChecked }
                        : table
                    )
                  );
                }}
              >
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: `${st.color}` }}
                ></div>
                <span className="text-sm opacity-70">{st.status}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex  items-center flex-wrap gap-5 mt-10">
        {tablesData &&
          tablesData.map((table: ITable) => {
            return (
              <Table
                key={table.seatId}
                tableId={table.seatId}
                numberOfSeats={table.numberOfSeat}
                numberOfTable={table.seatId}
                status={table.seatStatus}
              />
            );
          })}
      </div>
    </>
  );
};

export default TableList;
