import Table from "@/components/table/Table";
import Loading from "@/components/ui/loading";
import STATUS_TABLE from "@/constants/status.table";
import { useGetTables } from "@/hooks/table";
import ITable from "@/interfaces/table/table.interface";
const TableList = () => {
  const { data: tables, isLoading, error } = useGetTables();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl  font-semibold">Tables</h3>
        <div className="flex items-center gap-10">
          {STATUS_TABLE.map((st) => {
            return (
              <div key={st.status} className="flex items-center gap-2">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: `${st.color}` }}
                ></div>
                <span className="text-sm opacity-70">{st.status}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex  items-center flex-wrap gap-5 mt-10">
        {tables &&
          tables.map((table: ITable) => {
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
