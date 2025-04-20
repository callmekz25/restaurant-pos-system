import Table from "@/components/table/Table";
import STATUS_TABLE from "@/constants/status.table";
import TABLES from "@/constants/table";
const TableList = () => {
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
        {TABLES.map((table) => {
          return (
            <Table
              key={table.id}
              numberOfSeats={table.quantity}
              numberOfTable={table.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default TableList;
