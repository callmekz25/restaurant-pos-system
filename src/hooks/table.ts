import TableStatus from "@/enum/tableStatus";
import IReservedTable from "@/interfaces/table/reservedTable.interface";
import { createReservedTable } from "@/services/reservedTableService";
import { getTables } from "@/services/tableService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTables = (
  statusList: { status: TableStatus; color: string; isChecked: boolean }[]
) => {
  return useQuery({
    queryKey: ["tables", status.length],
    queryFn: () => getTables(statusList.map((status) => status.status)),
  });
};

export const useCreateReservedTable = () => {
  return useMutation({
    mutationFn: (requestData: IReservedTable) =>
      createReservedTable(requestData),
  });
};
