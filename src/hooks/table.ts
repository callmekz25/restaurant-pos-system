import TableStatus from "@/enum/tableStatus";
import IReservedTable from "@/interfaces/table/reservedTable.interface";
import { createReservedTable } from "@/services/reservedTableService";
import { getReservableTables, getTables } from "@/services/tableService";
import { useMutation, useQuery } from "@tanstack/react-query";

// GET
export const useGetTables = (statusList: TableStatus[]) => {
  return useQuery({
    queryKey: ["tables", ...statusList],
    queryFn: () => getTables(statusList),
    refetchOnMount: "always",
  });
};

export const useGetReservableTables = (requestData: {
  resersedDate: string;
  slots: number;
}) => {
  return useQuery({
    queryKey: ["reservable-tables"],
    queryFn: () => getReservableTables(requestData),
    enabled: !!requestData.resersedDate && !!requestData.slots,
    // refetchOnMount: "always",
  });
};

// POST
export const useCreateReservedTable = () => {
  return useMutation({
    mutationFn: (requestData: IReservedTable) =>
      createReservedTable(requestData),
  });
};
